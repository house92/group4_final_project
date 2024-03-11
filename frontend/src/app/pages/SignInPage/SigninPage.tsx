import { Typography, Stack } from '@mui/material';
import SignInForm from 'app/components/compounds/SignInForm';
import useSignIn from './useSignIn';

export default function SignInPage() {
    const { signIn, error } = useSignIn();

    const handleSubmit = async ({ email, password }) => {
        await signIn(email, password);
    };

    return (
        <Stack gap={2}>
            {error && <Typography color="error">{error}</Typography>}

            <SignInForm onSubmit={handleSubmit} />
        </Stack>
    );
}
