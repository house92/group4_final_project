import { useGetUserFriendsQuery } from 'generated/graphql';

interface Friend {
    id: any;
    name: string;
}

interface Response {
    friends: Friend[];
}

export default function useUsersFriends(userId: string = ''): Response {
    const { data } = useGetUserFriendsQuery({ variables: { userId } });

    let res: Response = { friends: [] };

    if (data?.getUser?.friends) {
        res.friends = data.getUser.friends.map((friend) => ({
            id: friend.id,
            name: `${friend.firstName} ${friend.lastName}`,
        }));
    }

    return res;
}
