import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRegisterUserMutation } from 'generated/graphql';

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

    console.log('useRegister() - starting..');

    const register = async (
        firstName: string,
        lastName: string,
        dateOfBirth: string,
        email: string,
        password: string
    ) => {
        console.log('register() - starting..');
        try {
            const { data } = await registerUserMutation({
                variables: {
                    input: { firstName, lastName, dateOfBirth, email, password },
                },
            });

            console.log({ data });

            if (data?.registerUser) {
                navigate('/');
            } else {
                const errorMessage = 'Registration failed. Please check your inputs.';
                setError(errorMessage);
            }
        } catch (error) {
            console.error('Error during registration:', error);
            setError('An unexpected error occurred during registration.');
        }
    };

    return{ register, error };
}