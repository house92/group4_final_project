import { useGetAuthorsListQuery } from 'generated/graphql';
import { DateTime } from 'luxon';

interface Author {
    id: string;
    name: string;
    dateOfBirth?: DateTime;
    dateOfDeath?: DateTime;
    hometown: string | undefined;
    bio: string | undefined;
}

export default function useAuthors() {
    const { data } = useGetAuthorsListQuery();

    let authors: Author[] = [];

    if (data?.listAuthors) {
        authors = data.listAuthors.map((author) => ({
            id: author.id,
            name: `${author.firstName} ${author.lastName}`,
            dateOfBirth: author.dateOfBirth ? DateTime.fromISO(author.dateOfBirth) : undefined,
            dateOfDeath: author.dateOfDeath ? DateTime.fromISO(author.dateOfDeath) : undefined,
            hometown: author.hometown ?? undefined,
            bio: author.bio ?? undefined,
        }));
    }

    return { authors };
}
