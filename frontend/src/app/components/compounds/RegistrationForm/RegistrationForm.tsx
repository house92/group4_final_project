import { Box, Button, Container, Stack, TextField, Typography } from "@mui/material";
import { useFormik } from 'formik';
import { date, object, string } from 'yup';
import { DateTime } from 'luxon';

interface RegistrationCreds {
    firstName: string;
    lastName: string;
    dateOfBirth: DateTime;
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
            birthDate: DateTime.utc(2000, 1, 1),
            email: '',
            password: '',
        },

        validateOnChange: false,
        validateOnBlur: false,
        validateOnMount: false,
        validationSchema: object().shape({
            firstName: string().required('Please enter your first name'),
            lastName: string().required('Please enter your last name'),
            birthDate: date()
                .max(new Date(), 'Date of birth cannot be in the future')
                .required('Please enter a date of birth'),
            email: string().email('Invalid Email').required('Email Required'),
            password: string().required('Password Required'),
        }),

        onSubmit,
    });

    return (
        <Container maxWidth="sm">
            <Box display="flex" flexDirection="column" alignItems="center">
                <Typography variant="h4" component="p" gutterBottom>
                    Register
                </Typography>
                <Stack gap="2" component="form" onSubmit={formik.handleSubmit}>
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
                        label="Date of Birth"
                        variant="outlined"
                        value={formik.values.birthDate}
                        onChange={formik.handleChange}
                        type="date"
                        placeholder="mm/dd/yyyy"
                        name="birthDate"
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
