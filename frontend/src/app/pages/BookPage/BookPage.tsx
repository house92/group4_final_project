import React from 'react';
import { Stack, Typography } from '@mui/material';
import BookDetails from 'app/components/compounds/BookDetails/BookDetails';
import { useParams } from 'react-router-dom';
import useBook from './useBook';
import { BookReviewForm, BookReviewIndex } from 'app/components';
import { useCreateBookReviewMutation } from 'generated/graphql';
import { useUserSession } from 'app/core/Session';

export default function BookPage() {
    const { bookId } = useParams();
    const { book, refetch } = useBook(bookId);
    const userSession = useUserSession();

    const [createBookReview] = useCreateBookReviewMutation();

    if (!bookId) return null;
    if (!book) return null;

    const canReview = userSession && book.bookReviews.every((review) => review.reviewerId !== userSession.id);

    return (
        <Stack gap={4}>
            <Typography variant="h3" component="h1">
                {book.title}
            </Typography>

            <BookDetails {...book} />

            {canReview && (
                <BookReviewForm
                    title={book.title}
                    onSubmit={async ({ body, rating }) => {
                        await createBookReview({
                            variables: { input: { userId: userSession.id, bookId, body, rating } },
                        });
                        refetch();
                    }}
                />
            )}

            <BookReviewIndex bookReviews={book.bookReviews} />
        </Stack>
    );
}
