import Paper from '@mui/material/Paper';
import { Grid } from '@mui/material';
import BookReviewIndex from '../BookReviewIndex';
import { ComponentProps } from 'react';

export default {
    title: 'Compounds/BookReviewIndex',
    component: BookReviewIndex,
};

const BOOK_REVIEWS: ComponentProps<typeof BookReviewIndex>['bookReviews'] = [
    { title: 'Happy Feet', body: 'This book has lots of penguins', rating: 5, reviewerName: 'The Penguin' },
    { title: 'Happy Feet', body: "This book doesn't have enough penguins", rating: 3, reviewerName: 'The Pelican' },
];

export const Basic = (args) => {
    return (
        <Grid container>
            <Grid item xs={12} sm={9} lg={6}>
                <Paper variant="outlined" sx={{ p: 4, background: '#ffffee' }}>
                    <BookReviewIndex bookReviews={BOOK_REVIEWS} />
                </Paper>
            </Grid>
        </Grid>
    );
};
