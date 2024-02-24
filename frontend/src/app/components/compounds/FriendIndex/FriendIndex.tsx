import { Box } from '@mui/material';
import FriendIndexItem from './FriendIndexItem';

interface Friend {
    name: string;
}

interface FriendsIndexItemProps {
    friends: Friend[];
}

export default function FriendIndex({ friends }: FriendsIndexItemProps) {
    return (
        <Box>
            {friends.map((friend, index) => (
                <FriendIndexItem key={index} name={friend.name} />
            ))}
        </Box>
    );
}
