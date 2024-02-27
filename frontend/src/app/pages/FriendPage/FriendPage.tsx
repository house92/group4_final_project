import { Link, useParams } from 'react-router-dom';
import FriendIndex from 'app/components/compounds/FriendIndex';
import { List, Stack, Typography } from '@mui/material';
import useUsersFriends from './useUserFriends';

export default function FriendPage() {
    const { userId } = useParams();
    const { friends } = useUsersFriends(userId);

    if (friends.length === 0) {
        return <p>No friends found. Please make some.</p>;
    }

    return (
        <Typography>
            <Typography>Friend Page</Typography>
            <Link to={`/users/${userId}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                <FriendIndex
                    friends={friends.map((friend) => ({
                        id: friend.id,
                        name: friend.name,
                    }))}
                />
            </Link>
        </Typography>
    );
}
