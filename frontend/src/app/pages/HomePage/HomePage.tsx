import React, { useEffect, useState } from 'react';
import BookReviewIndex from 'app/components/compounds/BookReviewIndex';
import FriendIndex from 'app/components/compounds/FriendIndex';
import UseUser from '../UserPage/UseUser';
import { Container, Typography } from '@mui/material';
import { DateTime } from 'luxon';

export default function HomePage() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState<any>(null);
    const [friendReview, setFriendReview] = useState<any[]>([]);
    const fetchFriendReview = async (friendIds: string[]) => {
        const reviews = await Promise.all(
            friendIds.map(async (friendId) => {
                //fetching friends
                const friendReviewResponse = await fetch('http://localhost:5173/api/friends/${friendId}/reviews');
                const friendReview = await friendReviewResponse.json();
                return { friendId, reviews: friendReview };
            }),
        );

        const sortedReviews = reviews.map(({ friendId, reviews }) => ({
            friendId,
            reviews: reviews.sort(
                (a: any, b: any) => DateTime.fromISO(b.timestamp).valueOf() - DateTime.fromISO(a.timestamp).valueOf(),
            ),
        }));

        return sortedReviews;
    };

    useEffect(() => {
        const authCheck = async () => {
            const isAuthenticated = true;
            setIsAuthenticated(isAuthenticated);

            if (isAuthenticated) {
                const user = { id: '123', friends: ['friend1', 'friend2'] };
                setUser(user);

                const reviews = await fetchFriendReview(user.friends);
                setFriendReview(reviews);
            }
        };
        authCheck();
    }, []);

    return (
        <Container>
            <Typography variant="h4">Home Page</Typography>
            {isAuthenticated ? (
                friendReview.length > 0 ? (
                    <>
                        <Typography variant="h4">Friends' Reviews:</Typography>
                        <BookReviewIndex bookReviews={friendReview} />
                    </>
                ) : (
                    <Typography variant="body1">No friends' reviews found.</Typography>
                )
            ) : (
                <Typography variant="body1">Please sign in to view the home page.</Typography>
            )}
        </Container>
    );
}
