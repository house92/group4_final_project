import React from 'react';
import { Stack, Typography, Box } from '@mui/material';
import BookDetails from 'app/components/compounds/BookDetails/BookDetails';
import { useParams } from 'react-router-dom';
import useBook from './useBook';
import { BookReviewForm, BookReviewIndex } from 'app/components';
import { useCreateBookReviewMutation, useGenerateReviewLazyQuery } from 'generated/graphql';
import { useUserSession } from 'app/core/Session';
import ReviewContainer, { Reviewer } from 'app/components/compounds/ChatGptDetails/ReviewContainer';

export default function BookPage() {
    const { bookId } = useParams();
    const { book, refetch } = useBook(bookId);
    const userSession = useUserSession();

    const [createBookReview] = useCreateBookReviewMutation();
    const [generateReview, { loading: isGeneratedReviewLoading }] = useGenerateReviewLazyQuery();

    if (!bookId) return null;
    if (!book) return null;

    async function onReviewRequest(reviewer: Reviewer): Promise<string> {
        if (!bookId) {
            throw new Error('trying to generate a review without a book ID');
        }

        const { data } = await generateReview({ variables: { reviewer, bookId } });

        if (!data) {
            throw new Error('could not generate review');
        }

        return data.generateReview;
    }

    const canReview = userSession && book.bookReviews.every((review) => review.reviewerId !== userSession.id);

    return (
        <Stack gap={4}>
            <Typography variant="h3" component="h1">
                {book.title}
            </Typography>

            <BookDetails {...book} />

            <Stack display="flex" alignItems="flex-start" gap={4}>
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

                <Box marginLeft={4} marginBottom={4}>
                    <ReviewContainer onReviewRequest={onReviewRequest} isLoading={isGeneratedReviewLoading} />
                </Box>
            </Stack>
        </Stack>
    );
}
