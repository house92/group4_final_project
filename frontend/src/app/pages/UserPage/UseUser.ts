import { useQuery } from '@apollo/client';

import { useGetUserByIdQuery } from 'generated/graphql';

interface User {
    id: string;
    name: string;
    dateOfBirth: string | undefined;
    bio: string | null | undefined;
}
export default function useUser(userId: string = '') {
    const { data } = useGetUserByIdQuery({ variables: { userId } });

    let user: User | undefined;
    if (data?.getUser) {
        user = {
            id: data?.getUser.id,
            name: `${data?.getUser.firstName} ${data?.getUser.lastName}`,
            dateOfBirth: data?.getUser.dateOfBirth,
            bio: data?.getUser.bio,
        };
    }

    return { user };
}
