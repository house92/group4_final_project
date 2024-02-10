import { useFormik } from 'formik';
import { Container, Button, TextField, Typography, Box, Stack } from '@mui/material';

interface LoginCreds {
    email: string;
    password: string;
}

interface LoginFormProps {
    onSubmit: (values: LoginCreds) => void;
}

export default function LoginForm({ onSubmit }: LoginFormProps) {
    const formik = useFormik<LoginCreds>({
        initialValues: {
            email: '',
            password: '',
        },
        onSubmit,
    });

    return (
        <Container maxWidth="sm">
            <Box display="flex" flexDirection="column" alignItems="center">
                <Typography variant="h4" gutterBottom>
                    Login
                </Typography>
                <Stack component="form" onSubmit={formik.handleSubmit}>
                    <TextField
                        fullWidth
                        label="Email"
                        variant="outlined"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        type="email"
                        placeholder="youremail@mail.com"
                        name="email"
                        margin="normal"
                    />
                    <TextField
                        fullWidth
                        label="Password"
                        variant="outlined"
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        type="password"
                        placeholder="**********"
                        name="password"
                        margin="normal"
                    />
                    <Button type="submit" variant="contained" color="primary">
                        Log In
                    </Button>
                </Stack>
            </Box>
        </Container>
    );
}