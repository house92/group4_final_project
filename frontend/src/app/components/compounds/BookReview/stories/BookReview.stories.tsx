import Paper from '@mui/material/Paper';
import { Grid } from '@mui/material';
import BookReview from '../BookReview';
import { useFormik } from 'formik';

export default {
    title: 'Compounds/BookReview',
    component: BookReview,
};

const handleSubmit = (BookReviewProps) => {
    console.log('Form submitted with data:', BookReviewProps);
};

export const Basic = (args) => {
    return (
        <Grid container>
            <Grid item xs={12} sm={9} lg={6}>
                <Paper variant="outlined" sx={{ p: 4, background: '#ffffee' }}>
                    <BookReview onSubmit={handleSubmit} title={'Leave a Review'} />
                </Paper>
            </Grid>
        </Grid>
    );
};
