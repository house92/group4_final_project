import { useParams } from 'react-router-dom';
import FriendIndex from 'app/components/compounds/FriendIndex';
import { List } from '@mui/material';
import useUsersFriends from './useUserFriends';

export default function FriendsPage() {
    const { userId } = useParams();
    const { friends } = useUsersFriends(userId);

    if (!friends || friends.length === 0) {
        return <h1>No friends found.</h1>;
    }

    return (
        <List>
            <h1>Friend Page</h1>
            <FriendIndex
                friends={friends.map((friend) => ({
                    id: friend.id,
                    name: friend.name,
                    onClick: () => console.log('Friend clicked', friend.id),
                }))}
            />
        </List>
    );
}
