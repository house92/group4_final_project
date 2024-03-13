import { Button, Stack, Typography } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
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
    const navigate = useNavigate();

    const mySession = useUserSession();

    let myId;
    if (mySession) {
        myId = mySession.id;
    }
    const isFriends: boolean = useIsFriends(userId, myId);

    const isSent: boolean = useIsInviteSentAlready(userId, myId);
    // ^^ true if the auth user has already sent friend request to the user whose page it is

    const isReceived: boolean = useIsInviteReceivedAlready(userId, myId);
    // ^^ true if the user whose page it is has already sent friend request to the auth user

    const [sendInvite] = useSendFriendInviteMutation();
    const [acceptInvite] = useAcceptFriendInviteMutation();

    if (!mySession) {
        // unauthenticated users may not view user pages
        navigate(-1);
        return null;
    }

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
        <Stack gap={4}>
            <Typography variant="h3" component="h1">
                {user.name}
            </Typography>

            <UserDetails age={user.age} bio={user.bio} />

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
