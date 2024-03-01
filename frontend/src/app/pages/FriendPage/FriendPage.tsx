import { Link, useParams } from 'react-router-dom';
import FriendIndex from 'app/components/compounds/FriendIndex';
import { Box, Typography } from '@mui/material';
import useUsersFriends from './useUserFriends';

export default function FriendPage() {
    const { userId } = useParams();
    const { friends } = useUsersFriends(userId);

    if (friends.length === 0) {
        return <p>No friends found. Please make some.</p>;
    }

    return (
        <Box>
            <FriendIndex friends={friends} />
        </Box>
    );
}
