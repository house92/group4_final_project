import { useQuery } from '@apollo/client';
import { useSignInUserMutation } from 'generated/graphql';

interface User {
    userName: string;
    password: string;
}

export default function useSignIn() {
    const { data } = useSignInUserMutation({ variables: { email, password }});

    let user: User | undefined;
    if (data?.signInUser) {
        user = {
            id: data?.signInUser.id,
            firstName: data?.signInUser.firstName,
            lastName: data?.signInUser.lastName,
            token: data?.signInUser.token,
        };
    }
    return { user };
}