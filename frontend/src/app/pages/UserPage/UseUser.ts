import { useQuery } from '@apollo/client';

import { useGetUserByIdQuery } from 'generated/graphql';
import { DateTime } from 'luxon';

interface User {
    id: string;
    name: string;
    age: number;
    bio: string | null | undefined;
}
export default function useUser(userId: string = '') {
    const { data } = useGetUserByIdQuery({ variables: { userId } });

    let user: User = {
        id: '',
        name: '',
        age: 0,
        bio: null,
    };

    if (data?.getUser) {
        user = {
            id: data?.getUser.id,
            name: `${data?.getUser.firstName} ${data?.getUser.lastName}`,
            age:
                DateTime.fromISO(data?.getUser.dateOfBirth).month <= DateTime.now().month &&
                DateTime.fromISO(data?.getUser.dateOfBirth).day <= DateTime.now().day
                    ? DateTime.now().year - DateTime.fromISO(data?.getUser.dateOfBirth).year
                    : DateTime.now().year - DateTime.fromISO(data?.getUser.dateOfBirth).year - 1,
            bio: data?.getUser.bio,
        };
    }

    return { user };
}
