import { useGetAuthorsListQuery } from 'generated/graphql';
import { DateTime } from 'luxon';

interface Author {
    id: string;
    name: string;
    dateOfBirth?: DateTime;
    dateOfDeath?: DateTime;
}

interface Response {
    authors: Author[];
}

export default function useAuthors(): Response {
    const { data } = useGetAuthorsListQuery();

    let authors: Author[] = [];

    if (data?.listAuthors) {
        authors = data.listAuthors.edges.map(({ node: author }) => ({
            id: author.id,
            name: `${author.firstName} ${author.lastName}`,
            dateOfBirth: author.dateOfBirth ? DateTime.fromISO(author.dateOfBirth) : undefined,
            dateOfDeath: author.dateOfDeath ? DateTime.fromISO(author.dateOfDeath) : undefined,
        }));
    }

    return { authors };
}
