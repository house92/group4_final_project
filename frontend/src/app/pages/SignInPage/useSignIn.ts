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

    const signIn = async (email: string, password: string) => {
        try {
            const {data } = await signInUserMutation({ variables: { email, password }});

            if (data?.signInUser) {
                navigate('/homePage');
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