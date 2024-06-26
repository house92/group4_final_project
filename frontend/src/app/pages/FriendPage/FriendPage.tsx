import { useParams } from 'react-router-dom';
import FriendIndex from 'app/components/compounds/FriendIndex';
import { Autocomplete, Box, Stack, TextField, Typography } from '@mui/material';
import useUsersFriends, { useGetReceivedInvites, useListUsers } from './useUserFriends';
import { useAcceptFriendInviteMutation } from 'generated/graphql';
import InviteContainer from 'app/components/compounds/InviteContainer/InviteContainer';
import { useNavigate } from 'react-router-dom';
import { useUserSession } from 'app/core/Session';

export default function FriendPage() {
    const { userId } = useParams();
    const navigate = useNavigate();
    const { friends, name } = useUsersFriends(userId);
    const pageTitle: string = `${name}'s Friends`;
    const mySession = useUserSession();
    let myId;
    if (mySession) {
        myId = mySession.id;
    } else {
        myId = '';
    }
    const [acceptInvite] = useAcceptFriendInviteMutation();
    const pending = useGetReceivedInvites(acceptInvite, myId);
    const users = useListUsers(myId);

    if (!mySession) {
        navigate(-1);
        return null;
    }

    if (userId !== myId) {
        if (friends.length === 0) {
            return <p>No friends found. Please make some.</p>;
        }
        return (
            <Box>
                <Typography variant="h3" component="h1">
                    {pageTitle}
                </Typography>
                <FriendIndex friends={friends} />
            </Box>
        );
    }

    return (
        <Stack display="flex" gap={4}>
            <Typography variant="h3" component="h1">
                {pageTitle}
            </Typography>

            <Stack gap={2} maxWidth={400}>
                <Autocomplete
                    disablePortal
                    options={users.map((user) => user.id)}
                    getOptionLabel={(option) => users.find((user) => user.id === option)?.name ?? ''}
                    sx={{ width: 300, ml: 6 }} // margin set past 4 to match 'Friend Requests' vertically
                    renderInput={(params) => <TextField {...params} label="Users" />}
                    onChange={(event: any, userId: string | null) => {
                        const user = users.find((user) => user.id === userId);
                        if (user) {
                            navigate(`/users/${user.id}`);
                        }
                    }}
                />

                <InviteContainer {...{ props: pending }}></InviteContainer>

                <Box>
                    <Typography variant="h5" component="p" textAlign="center">
                        Friends
                    </Typography>

                    <FriendIndex friends={friends} />
                </Box>
            </Stack>
        </Stack>
    );
}
