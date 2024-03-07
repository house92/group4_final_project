import { Button, Stack } from '@mui/material';
import { useParams } from 'react-router-dom';
import useUser, {
    useGetSession,
    useIsFriends,
    useIsInviteSentAlready,
    useIsInviteReceivedAlready,
    useSendInvite,
} from './UseUser';
import { BookReviewIndex, UserDetails } from 'app/components';

export default function UserPage() {
    const { userId } = useParams();
    const { user } = useUser(userId);

    const myId: string = useGetSession(); // returns empty string if user is unauth
    const isFriends: boolean = useIsFriends(userId, myId);
    const isSent: boolean = useIsInviteSentAlready(userId, myId);
    const isReceived: boolean = useIsInviteReceivedAlready(userId, myId);

    if (!user) {
        return null;
    }

    return (
        <Stack p={2} gap={4}>
            <UserDetails name={user?.name} age={user?.age} bio={user?.bio} />
            {!isFriends && !isSent && !isReceived && myId.length != 0 && (
                <Button
                    type="submit"
                    variant="contained"
                    onClick={() => {
                        useSendInvite({ variables: { userId } });
                    }}
                >
                    Send Friend Request
                </Button>
            )}
            <BookReviewIndex bookReviews={user.bookReviews} />
        </Stack>
    );
}
