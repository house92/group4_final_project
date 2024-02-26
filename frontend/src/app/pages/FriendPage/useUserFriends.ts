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

    if (data?.getUser) {
        res.friends = data.getUser.map((friend) => ({
            id: friend.id,
            name: friend.name,
        }));
    }

    return res;
}
