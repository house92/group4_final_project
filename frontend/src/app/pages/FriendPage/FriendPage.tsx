import { Link, useParams } from 'react-router-dom';
import FriendIndex from 'app/components/compounds/FriendIndex';
import { List } from '@mui/material';
import useUsersFriends from './useUserFriends';

export default function FriendPage() {
    const { userId } = useParams();
    const { friends } = useUsersFriends(userId);

    if (!friends || friends.length === 0) {
        return <h1>No friends found. Please make some.</h1>;
    }

    return (
        <List>
            <h1>Friend Page</h1>
            <Link to={`/users/${friends.find}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                <FriendIndex
                    friends={friends.map((friend) => ({
                        id: friend.id,
                        name: friend.firstName,
                    }))}
                />
            </Link>
        </List>
    );
}
