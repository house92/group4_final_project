import { useQuery } from '@apollo/client';
import { useGetAuthorByIdQuery } from 'generated/graphql';

interface Author {
    id: string;
    name: string;
    dateOfBirth: string;
    dateOfDeath?: string | null | undefined;
    hometown: string | null | undefined;
    bio: string | null | undefined;
}

export default function useAuthor(authorId: string = '') {
    const { data } = useGetAuthorByIdQuery({ variables: { authorId } });

    let author: Author | undefined;
    if (data?.getAuthor) {
        author = {
            id: data?.getAuthor.id,
            name: `${data?.getAuthor.firstName} ${data?.getAuthor.lastName}`,
            dateOfBirth: data?.getAuthor.dateOfBirth,
            dateOfDeath: data?.getAuthor.dateOfDeath,
            hometown: data?.getAuthor.hometown,
            bio: data?.getAuthor.bio,
        };
    }

    return { author };
}
