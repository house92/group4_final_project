import { Box } from '@mui/material';
import FriendsIndexItem from './FriendsIndexItem';

interface Friend {
    name: string;
}

interface FriendsIndexItemProps {
    friends: Friend[];
}

const FriendsIndex = ({ friends }: FriendsIndexItemProps) => {
    return (
        <Box>
            {friends.map((friend, index) => (
                <FriendsIndexItem key={index} name={friend.name} />
            ))}
        </Box>
    );
};