import { Typography, Stack } from '@mui/material';
import RegistrationForm from 'app/components/compounds/RegistrationForm';
import useRegister from './useRegister';

interface NewUser {
    firstName: string;
    lastName: string;
    dateOfBirht: string;
    email: string;
    password: string;
}

export default function RegisterPage() {
    const { register, error } = useRegister();

    const handleSubmit = async ({ firstName, lastName, dateOfBirth, email, password }) => {
        await register(firstName, lastName, dateOfBirth, email, password);
    };

    return (
        <Stack gap={2}>
            {error && <Typography color="error">{error}</Typography>}

            <RegistrationForm onSubmit={handleSubmit} />
        </Stack>
    );
}