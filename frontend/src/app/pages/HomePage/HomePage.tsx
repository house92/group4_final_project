import React, { useEffect, useState } from 'react';
import BookReviewIndex from 'app/components/compounds/BookReviewIndex';
import { Container, Typography } from '@mui/material';
import { useUserSession } from 'app/core/Session';
import useHomePageData from './useHomePageData';

export default function HomePage() {
    const userSession = useUserSession();
    const [reviews, setReviews] = useState<any[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            let data;
            if (userSession && userSession.token) {
                data = await useHomePageData();
            } else {
                data = await useHomePageData();
            }
            setReviews(data);
        };
        fetchData();
    }, [userSession]);

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
