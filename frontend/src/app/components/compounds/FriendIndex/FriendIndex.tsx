import { Stack } from '@mui/material';
import FriendIndexItem from './FriendIndexItem';
import { Link } from 'react-router-dom';

interface Friend {
    id: string;
    name: string;
}

interface FriendsIndexItemProps {
    friends: Friend[];
}

export default function FriendIndex({ friends }: FriendsIndexItemProps) {
    return (
        <Stack gap={2} m={4}>
            {friends.map((friend, index) => (
                <Link key={friend.id} to={`/users/${friend.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                    <FriendIndexItem key={index} name={friend.name} />
                </Link>
            ))}
        </Stack>
    );
}
