import { useGetUserFriendsQuery } from 'generated/graphql';

interface Friend {
    id: any;
    name: string;
}

interface Response {
    friends?: Friend[];
}

export default function useUsersFriends(userId: string = ''): Response {
    const { data } = useGetUserFriendsQuery({ variables: { userId } });

    let res: Response = { friends: [] };

    if (data?.getUserFriends) {
        res.friends = data.getUserFriends.map((friend) => ({
            id: friend.id,
            name: friend.name,
        }));
    }

    return res;
}