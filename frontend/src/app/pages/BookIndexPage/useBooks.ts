import { useGetBooksListQuery } from 'generated/graphql';
import { DateTime } from 'luxon';

interface Book {
    coverImage: string;
    title: string;
    authorNames: string[];
    publicationDate: DateTime | undefined;
}

export default function useBooks() {
    const { data } = useGetBooksListQuery();

    let books: Book[] = [];
    if (data?.listBooks) {
        books = data.listBooks.map((book) => ({
            coverImage: book.coverImage,
            title: book.title,
            authorNames: book.authors.map((author) => `${author.firstName} ${author.lastName}`),
            publicationDate: book.publicationDate ? DateTime.fromISO(book.publicationDate) : undefined,
        }));
    }

    return { books };
}
