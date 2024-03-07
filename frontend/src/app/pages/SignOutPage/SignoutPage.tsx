import { Typography, Stack } from '@mui/material';
import SignInForm from 'app/components/compounds/SignInForm';
import useSignIn from './useSignOut';

export default function SignOutPage() {
    useSignIn();
    return (
        <Stack gap={2}>
        </Stack>
    );
}
