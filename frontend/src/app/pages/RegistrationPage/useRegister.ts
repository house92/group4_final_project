import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRegisterUserMutation } from 'generated/graphql';

interface NewUser {
    id: string;
    token: string;
}

export default function useRegister() {
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const [registerUserMutation] = useRegisterUserMutation();

    const register = async (
        email: string,
        password: string,
        firstName: string,
        lastName: string,
        dateOfBirth: string,
    ) => {
        try {
            const { data } = await registerUserMutation({
                variables: {
                    input: { email, password, firstName, lastName, dateOfBirth },
                },
            });

            if (data?.registerUser) {
                navigate('/homePage');
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