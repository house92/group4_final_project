import { useGetBookByIdQuery } from 'generated/graphql';
import { DateTime } from 'luxon';

interface Book {
    id: string;
    title: string;
    coverImage: string;
    authors: { id: string; name: string }[];
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
    const { data, refetch } = useGetBookByIdQuery({ variables: { bookId } });

    let book: Book | undefined;
    if (data?.getBook) {
        const baseBook = data.getBook;
        const title = baseBook.title;

        book = {
            id: baseBook.id,
            title,
            coverImage: baseBook.coverImage,
            authors: baseBook.authors.map((author) => ({
                id: author.id,
                name: `${author.firstName} ${author.lastName}`,
            })),
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

    return { book, refetch };
}
