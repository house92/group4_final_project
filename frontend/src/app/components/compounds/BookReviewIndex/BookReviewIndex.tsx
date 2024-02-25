import { ComponentProps } from 'react';
import BookReview from '../BookReview';
import { Stack } from '@mui/material';

interface BookReviewIndexProps {
    bookReviews: ComponentProps<typeof BookReview>[];
}

export default function BookReviewIndex({ bookReviews }: BookReviewIndexProps) {
    return (
        <Stack gap={2}>
            {bookReviews.map((review) => (
                <BookReview {...review} />
            ))}
        </Stack>
    );
}
