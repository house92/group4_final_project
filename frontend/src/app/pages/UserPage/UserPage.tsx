import { Button, Stack } from '@mui/material';
import { useParams } from 'react-router-dom';
import useUser, { useIsFriends, useIsInviteSentAlready, useIsInviteReceivedAlready } from './UseUser';
import { BookReviewIndex, UserDetails } from 'app/components';
import { useSendFriendInviteMutation } from 'generated/graphql';
import { useUserSession } from 'app/core/Session';
import { useAcceptFriendInviteMutation } from 'generated/graphql';

let disabled: boolean = false;
let buttonFlag: boolean;

function handleButton(sendInvite, acceptInvite, userId) {
    if (!buttonFlag) {
        disabled = true;
        sendInvite({ variables: { userId } });
    } else {
        disabled = true;
        acceptInvite({ variables: { userId } });
    }
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
    // ^^ true if the auth user has already sent friend request to the user whose page it is

    const isReceived: boolean = useIsInviteReceivedAlready(userId, myId);
    // ^^ true if the user whose page it is has already sent friend request to the auth user

    const [sendInvite] = useSendFriendInviteMutation();
    const [acceptInvite] = useAcceptFriendInviteMutation();

    if (!user) {
        return null;
    }

    let buttonText: string = 'Send Friend Request';

    let putButton: boolean = true;

    // True if button is to accept, false if button is to send

    if (!!userId && userId !== myId && myId.length > 0) {
        if (isSent) {
            buttonText = 'Friend Request Already Sent';
            disabled = true;
        } else if (isReceived) {
            buttonText = 'Accept Friend Request';
            buttonFlag = true;
        } else if (isFriends) {
            putButton = false;
        } else {
            buttonText = 'Send Friend Request';
            buttonFlag = false;
        }
    } else {
        putButton = false;
    }

    return (
        <Stack p={2} gap={4}>
            <UserDetails name={user?.name} age={user?.age} bio={user?.bio} />
            {putButton && (
                <Button
                    type="submit"
                    variant="contained"
                    onClick={() => {
                        handleButton(sendInvite, acceptInvite, userId);
                    }}
                    disabled={disabled}
                >
                    {buttonText}
                </Button>
            )}
            <BookReviewIndex bookReviews={user.bookReviews} />
        </Stack>
    );
}
