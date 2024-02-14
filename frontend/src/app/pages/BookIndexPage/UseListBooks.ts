import { useGetBooksListQuery } from 'generated/graphql';

interface Book {
    coverImage: string;
    title: string;
    author: string;
    publicationYear: string;
}

export default function useBooks() {
    const { data } = useGetBooksListQuery();

    let books: Book[] = [];
    if (data?.listBooks) {
        books = data.listBooks.map((book) => ({
            coverImage: book.coverImage,
            title: book.title,
            author: book.author,
            publicationYear: book.publicationYear,
        }));
    }

    return { books };
}
