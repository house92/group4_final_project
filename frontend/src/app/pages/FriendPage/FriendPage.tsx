import { Link, useParams } from 'react-router-dom';
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
    const pageTitle: string = name + "'s Friends";
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

    if (userId !== myId) {
        if (friends.length === 0) {
            return <p>No friends found. Please make some.</p>;
        }
        return (
            <Box>
                <Typography
                    variant="h3"
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                    m={4}
                >
                    {pageTitle}
                </Typography>
                <FriendIndex friends={friends} />
            </Box>
        );
    }

    return (
        <Stack display="flex">
            <Typography
                variant="h3"
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
                m={4}
            >
                {pageTitle}
            </Typography>

            <Box display="flex" flexDirection="row">
                <Box>
                    <InviteContainer {...{ props: pending }}></InviteContainer>
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
                </Box>
                <FriendIndex friends={friends} />
            </Box>
        </Stack>
    );
}
