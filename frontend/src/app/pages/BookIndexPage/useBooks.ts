import { useGetBooksListQuery } from 'generated/graphql';
import { DateTime } from 'luxon';

interface Book {
    id: string;
    coverImage: string;
    title: string;
    authorNames: string[];
    publicationDate: DateTime | undefined;
}

export default function useBooks(pageLimit: number, page: number) {
    const { data } = useGetBooksListQuery({
        variables: { first: pageLimit, page }
    });

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

    const pageInfo = {
        totalPages: Math.ceil((data?.listBooks.pageInfo.totalEdges || 0) / pageLimit),
        hasNextPage: data?.listBooks.pageInfo.hasNextPage || false,
        hasPreviousPage: data?.listBooks.pageInfo.hasPreviousPage || false,
    };

    return { books, pageInfo };
}
