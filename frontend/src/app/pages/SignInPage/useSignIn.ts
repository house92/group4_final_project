import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSignInUserMutation } from 'generated/graphql';

interface User {
    id: string;
    token: string;
}

export default function useSignIn() {
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const [signInUserMutation] = useSignInUserMutation();

    console.log('useSignIn() - starting..');

    const signIn = async (email: string, password: string) => {
        console.log('signIn() - starting..');
        try {
            const { data } = await signInUserMutation({ variables: { email, password } });

            console.log({ data });

            if (data?.signInUser) {
                navigate('/');
            } else {
                const errorMessage = 'Invalid email or password.';
                setError(errorMessage);
            }
        } catch (error) {
            console.error('Error signing in:', error);
            setError('An unexpected error occurred.');
        }
    };

    return { signIn, error };
}
