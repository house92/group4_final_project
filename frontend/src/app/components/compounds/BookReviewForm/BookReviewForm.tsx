import * as React from 'react';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import { Button, Paper, Stack, TextField, Typography } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import { useState } from 'react';
import { useFormik } from 'formik';
import { string, object, number } from 'yup';

interface BookReviewInput {
    body: string;
    rating: number;
}
interface BookReviewProps {
    title: string;
    onSubmit: (values: BookReviewInput) => void;
}

export default function BookReviewForm({ title, onSubmit }: BookReviewProps) {
    const [value, setValue] = useState<number | null>(null);
    const [hover, setHover] = useState(-1);
    const labels = {
        1: 'Terrible',
        2: 'Below Average',
        3: 'Okay',
        4: 'Good',
        5: 'Excellent',
    };

    const formik = useFormik<BookReviewInput>({
        enableReinitialize: true,
        initialValues: {
            body: '',
            rating: 0,
        },
        validateOnChange: false,
        validateOnBlur: false,
        validateOnMount: false,
        validationSchema: object().shape({
            body: string().required('a review is required'),
            rating: number().typeError('a rating must be a valid number 1-5').required('a rating is required'),
        }),
        onSubmit,
    });

    function getLabelText(value) {
        return `${value} Star${value !== 1 ? 's' : ''}, ${labels[value]}`;
    }

    return (
        <Paper
            component="form"
            onSubmit={formik.handleSubmit}
            variant="outlined"
            sx={{
                display: 'flex',
                alignItems: 'center',
                width: '100%',
            }}
            autoComplete="off"
        >
            <Stack gap={2} width="100%" p={2}>
                <Typography variant="h5">{title}</Typography>
                <Box>
                    <Rating
                        name="simple-controlled"
                        value={value}
                        onChange={(event, newValue) => {
                            setValue(newValue);
                            formik.setFieldValue('rating', newValue);
                        }}
                        precision={1.0}
                        getLabelText={getLabelText}
                        onChangeActive={(event, newHover) => {
                            setHover(newHover);
                        }}
                        emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
                    />
                    {value !== null && <Box sx={{ ml: 0.5 }}>{labels[hover !== -1 ? hover : value]}</Box>}
                </Box>

                <TextField
                    id="outlined-basic"
                    name="body"
                    variant="outlined"
                    multiline
                    maxRows={5}
                    minRows={10}
                    value={formik.values.body}
                    onChange={formik.handleChange}
                    error={formik.touched.body && Boolean(formik.errors.body)}
                    helperText={formik.touched.body && formik.errors.body}
                />

                <Box>
                    <Button type="submit" variant="contained">
                        Save
                    </Button>
                </Box>
            </Stack>
        </Paper>
    );
}
