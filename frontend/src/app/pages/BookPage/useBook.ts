import { useGetBookByIdQuery } from 'generated/graphql';
import { DateTime } from 'luxon';

interface Book {
    id: string;
    title: string;
    coverImage: string;
    authorNames: string[];
    publicationDate?: DateTime;
    synopsis?: string;

    bookReviews: {
        id: string;
        title: string;
        body: string;
        rating: number;
        reviewerName: string;
    }[];
}

export default function useBook(bookId: string = '') {
    const { data } = useGetBookByIdQuery({ variables: { bookId } });

    let book: Book | undefined;
    if (data?.getBook) {
        const baseBook = data.getBook;
        const title = baseBook.title;

        book = {
            id: baseBook.id,
            title,
            coverImage: baseBook.coverImage,
            authorNames: baseBook.authors.map((authorNames) => `${authorNames.firstName} ${authorNames.lastName}`),
            publicationDate: baseBook.publicationDate ? DateTime.fromISO(baseBook.publicationDate) : undefined,
            synopsis: baseBook.synopsis ?? undefined,

            bookReviews: baseBook.bookReviews.map((review) => ({
                id: review.id,
                title,
                body: review.body,
                rating: review.rating,
                reviewerName: `${review.user.firstName} ${review.user.lastName}`,
            })),
        };
    }

    return { book };
}
