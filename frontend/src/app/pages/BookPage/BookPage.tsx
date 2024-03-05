import React from 'react';
import { Stack, Typography, Box } from '@mui/material';
import BookDetails from 'app/components/compounds/BookDetails/BookDetails';
import { useParams } from 'react-router-dom';
import useBook from './useBook';
import { BookReviewForm, BookReviewIndex } from 'app/components';
import { useCreateBookReviewMutation } from 'generated/graphql';
import { useUserSession } from 'app/core/Session';
import ChatGptDetails from 'app/components/compounds/ChatGptDetails/ChatGptDetails';
import { useRunChatGptQueryLazyQuery } from 'generated/graphql';

let bookTitle: string;

// async function CallChatGptHook(reviewer: number): Promise<string> {

//     const s: string = await useChatGpt(reviewer, bookTitle);

//     return s;
// }

export default function BookPage() {
    const { bookId } = useParams();
    const { book, refetch } = useBook(bookId);
    const userSession = useUserSession();

    const [createBookReview] = useCreateBookReviewMutation();

    if (!bookId) return null;
    if (!book) return null;

    bookTitle = book.title;

    const canReview = userSession && book.bookReviews.every((review) => review.reviewerId !== userSession.id);

    return (
        <Stack gap={4}>
            <Typography variant="h3" component="h1">
                {book.title}
            </Typography>

            <BookDetails {...book} />

            <Box display="flex" alignItems="flex-start">
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
                    <ChatGptDetails clicked={runGpt} title={bookTitle} />
                </Box>
            </Box>
        </Stack>
    );
}
