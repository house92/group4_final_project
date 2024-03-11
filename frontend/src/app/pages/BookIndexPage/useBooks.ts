import { useGetBooksListQuery } from 'generated/graphql';
import { DateTime } from 'luxon';

interface Book {
    id: string;
    coverImage: string;
    title: string;
    authorNames: string[];
    publicationDate: DateTime | undefined;
}

export default function useBooks(pageLimit: number, offset: number) {
    //issue here "cannot assign type number to type never"
    const { data } = useGetBooksListQuery({
        variables: { pageLimit: pageLimit, startOffset: offset }
    });

    let books: Book[] = [];
    if (data?.listBooks) {
        books = data.listBooks.edges.map(edge => ({
            id: edge.node.id,
            coverImage: edge.node.coverImage,
            title: edge.node.title,
            authorNames: edge.node.authors.map((author) => `${author.firstName} ${author.lastName}`),
            publicationDate: edge.node.publicationDate ? DateTime.fromISO(edge.node.publicationDate) : undefined,
        }));
    }

    return { books };
}
