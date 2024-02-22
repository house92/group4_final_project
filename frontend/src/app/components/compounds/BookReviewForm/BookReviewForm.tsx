import * as React from 'react';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import { Button, Paper, Stack, TextField, Typography } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import { useState } from 'react';
import { useFormik } from 'formik';

interface BookReviewProps {
    title: string;
    onSubmit: (values: { review: string }) => void;
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

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            review: '',
        },
        validateOnChange: false,
        validateOnBlur: false,
        validateOnMount: false,
        onSubmit: (values) => {
            console.log(values);
        },
    });

    function getLabelText(value) {
        return `${value} Star${value !== 1 ? 's' : ''}, ${labels[value]}`;
    }

    return (
        <Paper
            variant="outlined"
            style={{ padding: 20 }}
            sx={{
                width: 400,
                display: 'flex',
                alignItems: 'center',
            }}
        >
            <Stack spacing={1}>
                <Typography variant="h5">{title}</Typography>
                <Box
                    sx={{
                        '& > legend': { mt: 2 },
                    }}
                >
                    <Typography component="legend"></Typography>
                    <Rating
                        name="simple-controlled"
                        value={value}
                        onChange={(event, newValue) => {
                            setValue(newValue);
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

                <Box
                    component="form"
                    onSubmit={formik.handleSubmit}
                    sx={{
                        '& > :not(style)': { m: 2, width: '35ch' },
                    }}
                    noValidate
                    autoComplete="off"
                >
                    <TextField
                        id="outlined-basic"
                        name="review"
                        variant="outlined"
                        multiline
                        maxRows={5}
                        minRows={10}
                        value={formik.values.review}
                        onChange={formik.handleChange}
                    />
                </Box>
                <Box
                    sx={{
                        '& > legend': { mt: 2 },
                    }}
                >
                    <Button type="submit" variant="contained">
                        Save
                    </Button>
                </Box>
            </Stack>
        </Paper>
    );
}
