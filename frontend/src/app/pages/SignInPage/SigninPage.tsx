import { Typography, Box } from '@mui/material';
import SignInForm from "app/components/compounds/SignInForm";
import useSignIn from "./useSignIn";

export default function SignInPage() {

    const { signIn, error } = useSignIn();

    const handleSubmit = async ({ email, password }) => {
        await signIn(email, password);
    };

    return (
        <Box>
            <Typography variant="h1">Sign-in Page</Typography>
            {error && (
                <Typography color="error">{error}</Typography>
            )}
            <Box marginBottom="20px" />
            <SignInForm onSubmit={handleSubmit} />
        </Box>
    );
}