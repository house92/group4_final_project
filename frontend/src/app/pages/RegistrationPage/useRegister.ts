import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRegisterUserMutation, useSignInUserMutation } from 'generated/graphql';

interface NewUser {
    firstName: string;
    lastName: string;
    dateOfBirht: string;
    email: string;
    password: string;
}

export default function useRegister() {
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const [registerUserMutation] = useRegisterUserMutation();
    const [signInUserMutation] = useSignInUserMutation();

    const register = async (
        firstName: string,
        lastName: string,
        dateOfBirth: string,
        email: string,
        password: string,
    ) => {
        try {
            const { data } = await registerUserMutation({
                variables: {
                    input: { firstName, lastName, dateOfBirth, email, password },
                },
            });

            if (data?.registerUser) {
                const { data: signInData } = await signInUserMutation({
                    variables: { email, password },
                });

                if (signInData?.signInUser) {
                    navigate('/');
                }
            } else {
                const errorMessage = 'Registration failed. Please check your inputs.';
                setError(errorMessage);
            }
        } catch (error) {
            console.error('Error during registration:', error);
            setError('An unexpected error occurred during registration.');
        }
    };

    return { register, error };
}
