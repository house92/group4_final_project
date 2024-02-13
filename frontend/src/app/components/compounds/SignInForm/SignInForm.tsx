import { useFormik } from 'formik';
import { Container, Button, TextField, Typography, Box, Stack } from '@mui/material';
import { string, object } from 'yup';

interface SigninCreds {
    email: string;
    password: string;
}

interface SigninFormProps {
    onSubmit: (values: SigninCreds) => void;
}

export default function SigninForm({ onSubmit }: SigninFormProps) {

    const formik = useFormik<SigninCreds>({
        enableReinitialize: true,

        initialValues: {
            email: '',
            password: '',
        },

        validateOnChange: false,
        validateOnBlur: false,
        validateOnMount: false,
        validationSchema: object().shape({
            email: string()
                .email('some error message about being invalid')
                .required('some error message about being required'),
            password: string().required('some error message about being required'),
        }),

        onSubmit,
    });

    return (
        <Container maxWidth="sm">
            <Box display="flex" flexDirection="column" alignItems="center">
                <Typography variant="h4" gutterBottom>
                    Sign in
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
                        Sign In
                    </Button>
                </Stack>
            </Box>
        </Container>
    );
}