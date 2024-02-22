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
        age: 12,
        bio: undefined
    };
    if (data?.getUser) {
        user = {
            id: data?.getUser.id,
            name: `${data?.getUser.firstName} ${data?.getUser.lastName}`,
            age:DateTime.fromISO(data?.getUser.dateOfBirth).year,
            bio: data?.getUser.bio,
        };
    }

    console.log(DateTime.fromISO(data?.getUser.dateOfBirth || ''));
    console.log(DateTime.fromISO(data?.getUser.dateOfBirth || '').day);
    console.log(DateTime.fromISO(data?.getUser.dateOfBirth || '').month);
    console.log(DateTime.fromISO(data?.getUser.dateOfBirth || '').year);

    

    return { user };
}
