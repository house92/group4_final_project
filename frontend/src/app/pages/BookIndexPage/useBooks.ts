import { useGetBooksListQuery } from 'generated/graphql';
import { DateTime } from 'luxon';

interface Book {
    id: string;
    coverImage: string;
    title: string;
    authorNames: string[];
    publicationDate: DateTime | undefined;
}

interface UseBooksArgs {
    titleSearchTerm?: string;
    pageLimit: number;
    page: number;
}

interface Response {
    books: Book[];
    totalPages: number;
}

export default function useBooks({ titleSearchTerm, pageLimit, page }: UseBooksArgs): Response {
    const { data } = useGetBooksListQuery({ variables: { titleSearchTerm, first: pageLimit, page } });

    let books: Book[] = [];
    if (data?.listBooks) {
        books = data.listBooks.edges.map(({ node: book }) => ({
            id: book.id,
            coverImage: book.coverImage,
            title: book.title,
            authorNames: book.authors.map((author) => `${author.firstName} ${author.lastName}`),
            publicationDate: book.publicationDate ? DateTime.fromISO(book.publicationDate) : undefined,
        }));
    }

    return { books, totalPages: Math.ceil((data?.listBooks.pageInfo.totalEdges || pageLimit * page) / pageLimit) };
}
