import { useQuery } from '@apollo/client';
import { useGetBookByIdQuery } from 'generated/graphql';
import { DateTime } from 'luxon';

interface Book {
    id: string;
    title: string;
    coverImage: string;
    authorNames?: string[];
    publicationDate?: DateTime | undefined;
    synopsis: string | null | undefined;
}

export default function useBook(bookId: string = '') {
    const { data } = useGetBookByIdQuery({ variables: { bookId } });

    let book: Book | undefined;
    if (data?.getBook) {
        book = {
            id: data?.getBook.id,
            title: data?.getBook.title,
            coverImage: data?.getBook.coverImage,
            authorNames: data?.getBook.authors.map((authorNames) => `${authorNames.firstName} ${authorNames.lastName}`),
            publicationDate: data?.getBook.publicationDate
                ? DateTime.fromISO(data?.getBook.publicationDate)
                : undefined,
            synopsis: data?.getBook.synopsis ?? null,
        };
    }

    return { book };
}
