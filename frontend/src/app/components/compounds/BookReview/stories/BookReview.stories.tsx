import Paper from '@mui/material/Paper';
import { Grid } from '@mui/material';
import BookReview from '../BookReview';

export default {
    title: 'Compounds/BookReview',
    component: BookReview,
};

export const Basic = (args) => {
    return (
        <Grid container>
            <Grid item xs={12} sm={9} lg={6}>
                <Paper variant="outlined" sx={{ p: 4, background: '#ffffee' }}>
                <BookReview title={'Leave a Review'} />
                </Paper>
            </Grid>
        </Grid>
    );
};
