import BookReviewIndex from 'app/components/compounds/BookReviewIndex';
import { Stack, Typography } from '@mui/material';
import { useUserSession } from 'app/core/Session';
import useHomePageData from './useHomePageData';

export default function HomePage() {
    const userSession = useUserSession();
    const userId = userSession ? userSession.id : '';
    const isAuthenticated = !!userSession;

    const { reviews } = useHomePageData(userId, isAuthenticated);

    return (
        <Stack gap={2}>
            <Typography variant="h3" component="h1">
                Home Page
            </Typography>

            {reviews.length > 0 ? (
                <>
                    <Typography variant="h5" component="h2">
                        {userSession && userSession.id ? "Friends' Reviews:" : 'All Reviews:'}
                    </Typography>

                    <BookReviewIndex bookReviews={reviews} />
                </>
            ) : (
                <Typography variant="h5" component="p">
                    No reviews found.
                </Typography>
            )}
        </Stack>
    );
}
