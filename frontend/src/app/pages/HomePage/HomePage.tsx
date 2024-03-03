import React from 'react';
import BookReviewIndex from 'app/components/compounds/BookReviewIndex';
import { Container, Typography } from '@mui/material';
import { useUserSession } from 'app/core/Session';
import useHomePageData from './useHomePageData';
import { BookReview } from 'generated/graphql';

export default function HomePage() {
    const userSession = useUserSession();
    const userId = userSession ? userSession.id: '';
    const isAuthenticated = !!userSession;

    const { reviews } = useHomePageData(userId, isAuthenticated);

    return (
        <Container>
            <Typography variant="h4">Home Page</Typography>
            {reviews.length > 0 ? (
                <>
                    <Typography variant="h5">
                        {userSession && userSession.token ? "Friend's Reviews:" : 'All Reviews:'}
                    </Typography>
                    <BookReviewIndex bookReviews={reviews} />
                </>
            ) : (
                <Typography variant="h5">No reviews found.</Typography>
            )}
        </Container>
    );
}
