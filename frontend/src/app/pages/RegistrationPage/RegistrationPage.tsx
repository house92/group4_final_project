import { Typography, Stack } from '@mui/material';
import RegistrationForm from 'app/components/compounds/RegistrationForm';
import useRegister from './useRegister'; // Path adjusted to where your useRegister hook is located

export default function RegisterPage() {
    const { register, error } = useRegister();

    const handleSubmit = async ({ email, password, firstName, lastName, dateOfBirth }) => {
        await register(email, password, firstName, lastName, dateOfBirth);
    };

    return (
        <Stack gap={2}>
            {error && <Typography color="error">{error}</Typography>}

            <RegistrationForm onSubmit={handleSubmit} />
        </Stack>
    );
}