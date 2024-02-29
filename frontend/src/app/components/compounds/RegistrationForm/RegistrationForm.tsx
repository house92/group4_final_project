import { Box, Button, Container, Stack, TextField, Typography } from "@mui/material";
import { useFormik } from "formik";
import { object, string } from "yup";

interface RegistrationCreds {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}

interface RegistrationFormProps {
    onSubmit: (values: RegistrationCreds) => void;
}

export default function RegistrationForm({ onSubmit }: RegistrationFormProps) {
    const formik = useFormik<RegistrationCreds>({
        enableReinitialize: true,

        initialValues: {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
        },

        validateOnChange: false,
        validateOnBlur: false,
        validateOnMount: false,
        validationSchema: object().shape({
            firstName: string().required('Please enter a first name'),
            lastName: string().required('Please enter a last name'),
            email: string()
                .email('some error message about being invalid')
                .required('some error message about being required'),
            password: string().required('some error message about being required'),
        }),

        onSubmit,
    })

    return (
        <Container maxWidth="sm">
            <Box display="flex" flexDirection="column" alignItems="center">
                <Typography variant="h4" gutterBottom>
                    Sign in
                </Typography>
                <Stack component="form" onSubmit={formik.handleSubmit}>
                    <TextField
                        fullWidth
                        label="First Name"
                        variant="outlined"
                        value={formik.values.firstName}
                        onChange={formik.handleChange}
                        type="firstName"
                        placeholder="First Name"
                        name="firstName"
                        margin="normal"
                    />
                    <TextField
                        fullWidth
                        label="Last Name"
                        variant="outlined"
                        value={formik.values.lastName}
                        onChange={formik.handleChange}
                        type="lastName"
                        placeholder="Last Name"
                        name="lastName"
                        margin="normal"
                    />
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
                        Register
                    </Button>
                </Stack>
            </Box>
        </Container>
    );
}