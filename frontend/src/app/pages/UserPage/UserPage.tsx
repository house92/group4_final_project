import { Button, Stack } from '@mui/material';
import { useParams } from 'react-router-dom';
import useUser from './UseUser';
import { BookReviewIndex, UserDetails } from 'app/components';

export default function UserPage() {
    const { userId } = useParams();
    const { user } = useUser(userId);

    if (!user) {
        return null;
    }

    return (
        <Stack p={2} gap={4}>
            <UserDetails name={user?.name} age={user?.age} bio={user?.bio} />
            <Button type="submit" variant="contained">
                Save
            </Button>
            <BookReviewIndex bookReviews={user.bookReviews} />
        </Stack>
    );
}
