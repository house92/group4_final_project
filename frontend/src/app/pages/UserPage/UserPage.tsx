import { Button, Stack } from '@mui/material';
import { useParams } from 'react-router-dom';
import useUser, { useIsFriends, useIsInviteSentAlready, useIsInviteReceivedAlready, useSendInvite } from './UseUser';
import { BookReviewIndex, UserDetails } from 'app/components';
import { useSendFriendInviteMutation } from 'generated/graphql';
import { useUserSession } from 'app/core/Session';

let sent: boolean = false;

function handleSend(func, userId) {
    sent = true;
    func({ variables: { userId } });
}

export default function UserPage() {
    const { userId } = useParams();
    const { user } = useUser(userId);

    const mySession = useUserSession();
    let myId;
    if (mySession) {
        myId = mySession.id;
    } else {
        myId = '';
    }
    const isFriends: boolean = useIsFriends(userId, myId);
    const isSent: boolean = useIsInviteSentAlready(userId, myId);
    const isReceived: boolean = useIsInviteReceivedAlready(userId, myId);

    const [sendInvite] = useSendFriendInviteMutation();

    if (!user) {
        return null;
    }

    const doWeWantToPutAButtonToSendAFriendRequest: boolean =
        !!userId && userId !== myId && !isFriends && !isSent && !isReceived;

    return (
        <Stack p={2} gap={4}>
            <UserDetails name={user?.name} age={user?.age} bio={user?.bio} />
            {doWeWantToPutAButtonToSendAFriendRequest && (
                <Button
                    type="submit"
                    variant="contained"
                    onClick={() => {
                        handleSend(sendInvite, userId);
                    }}
                    disabled={sent}
                >
                    Send Friend Request
                </Button>
            )}
            <BookReviewIndex bookReviews={user.bookReviews} />
        </Stack>
    );
}
