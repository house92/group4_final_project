import { Link, useParams } from 'react-router-dom';
import FriendIndex from 'app/components/compounds/FriendIndex';
import { Autocomplete, Box, TextField, Typography } from '@mui/material';
import useUsersFriends, { useGetSession, useGetReceivedInvites, useListUsers } from './useUserFriends';
import { useAcceptFriendInviteMutation } from 'generated/graphql';
import InviteContainer from 'app/components/compounds/InviteContainer/InviteContainer';
import InviteItem, { inviteProps } from 'app/components/compounds/InviteContainer/InviteItem';

export default function FriendPage() {
    const { userId } = useParams();
    const { friends } = useUsersFriends(userId);
    const myId = useGetSession(); // returns empty string if user is unauth
    const [acceptInvite] = useAcceptFriendInviteMutation();
    const pending = useGetReceivedInvites(acceptInvite, myId);
    const users = useListUsers();

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
            <Box>
                <InviteContainer {...{ props: pending }}></InviteContainer>
                <Autocomplete
                    disablePortal
                    options={users}
                    sx={{ width: 300, m: 4}}
                    renderInput={(params) => <TextField {...params} label="Users" />}
                />
            </Box>
            <FriendIndex friends={friends} />
        </Box>
    );
}
