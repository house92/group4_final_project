import { useGetAuthorsListQuery } from 'generated/graphql';
import { DateTime } from 'luxon';

interface Author {
    id: string;
    name: string;
    dateOfBirth?: DateTime;
    dateOfDeath?: DateTime;
}

export default function useAuthors(pageLimit: number, page: number) {
    const { data } = useGetAuthorsListQuery({
        variables: { first: pageLimit, page },
    });

    let authors: Author[] = [];

    if (data?.listAuthors) {
        authors = data.listAuthors.edges.map(({ node: author }) => ({
            id: author.id,
            name: `${author.firstName} ${author.lastName}`,
            dateOfBirth: author.dateOfBirth ? DateTime.fromISO(author.dateOfBirth) : undefined,
            dateOfDeath: author.dateOfDeath ? DateTime.fromISO(author.dateOfDeath) : undefined,
        }));
    }

    return { authors, totalPages: Math.ceil((data?.listAuthors.pageInfo.totalEdges || pageLimit * page) / pageLimit) };
}
