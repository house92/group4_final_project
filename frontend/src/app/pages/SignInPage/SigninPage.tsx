import { Typography, Box } from '@mui/material';
import SignInForm from "app/components/compounds/SignInForm";

import useSignIn from "./useSignIn";

export default function SignInPage() {


    const { user } = useSignIn();

    return (
        <Box>
            <Typography variant="h1">Sign-in Page</Typography>
            <Box marginBottom="20px" />
            <SignInForm email={user?.email} password={user?.password} onSubmit={({ email, password }) => useSignIn()} />
        </Box>
    )
}