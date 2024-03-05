import { useGetAuthorByIdQuery } from 'generated/graphql';
import { DateTime } from 'luxon';

interface Author {
    id: string;
    name: string;
    dateOfBirth?: DateTime;
    dateOfDeath?: DateTime;
    hometown?: string;
    bio?: string;
}

export default function useAuthor(authorId: string = '') {
    const { data } = useGetAuthorByIdQuery({ variables: { authorId } });

    let author: Author | undefined;
    if (data?.getAuthor) {
        const baseAuthor = data.getAuthor;

        author = {
            id: baseAuthor.id,
            name: `${baseAuthor.firstName} ${baseAuthor.lastName}`,
            dateOfBirth: baseAuthor.dateOfBirth ? DateTime.fromISO(baseAuthor.dateOfBirth) : undefined,
            dateOfDeath: baseAuthor.dateOfDeath ? DateTime.fromISO(baseAuthor.dateOfDeath) : undefined,
            hometown: baseAuthor.hometown ?? undefined,
            bio: baseAuthor.bio ?? undefined,
        };

        console.log('Base DoB: ' + baseAuthor.dateOfBirth);
        console.log('Base DoD: ' + baseAuthor.dateOfDeath);

    }

    return { author };
}
