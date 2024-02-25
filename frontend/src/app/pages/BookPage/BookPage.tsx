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
    const { book } = useBook(bookId);
    const userSession = useUserSession();

    const [createBookReview] = useCreateBookReviewMutation();

    if (!bookId) return null;
    if (!book) return null;

    return (
        <Stack p={2} gap={4}>
            <Typography variant="h4" component="h1">
                {book.title}
            </Typography>

            <BookDetails
                id={book.id}
                title={book.title}
                coverImage={book.coverImage}
                authorNames={book.authorNames}
                publicationDate={book.publicationDate}
                synopsis={book.synopsis ?? ''}
            />

            {userSession && (
                <BookReviewForm
                    title={book.title}
                    onSubmit={({ body, rating }) =>
                        createBookReview({ variables: { input: { userId: userSession.id, bookId, body, rating } } })
                    }
                />
            )}

            <BookReviewIndex bookReviews={book.bookReviews} />
        </Stack>
    );
}
