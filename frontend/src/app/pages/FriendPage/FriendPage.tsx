import { Link, useParams } from 'react-router-dom';
import FriendIndex from 'app/components/compounds/FriendIndex';
import { Box, Typography } from '@mui/material';
import useUsersFriends, { useGetSession, useGetReceivedInvites } from './useUserFriends';
import { useAcceptFriendInviteMutation } from 'generated/graphql';
import InviteContainer from 'app/components/compounds/FriendInvites/InviteContainer';
import InviteItem, { inviteProps } from 'app/components/compounds/FriendInvites/InviteItem';

export default function FriendPage() {
    const { userId } = useParams();
    const { friends } = useUsersFriends(userId);
    const myId = useGetSession(); // returns empty string if user is unauth
    const [acceptInvite] = useAcceptFriendInviteMutation();
    const pending = useGetReceivedInvites(acceptInvite, myId);

    if (userId != myId) {
        if (friends.length === 0) {
            return <p>No friends found. Please make some.</p>;
        }
        return (
            <Box>
                <FriendIndex friends={friends} />
            </Box>
        );
    }

    return (
        <Box>
            <InviteContainer props={pending}></InviteContainer>
        </Box>
    );
}
