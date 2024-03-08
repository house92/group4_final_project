import {
    useGetUserFriendsQuery,
    useGetUserSessionQuery,
    useAcceptFriendInviteMutation,
    useGetMyReceivedFriendInvitesQuery,
    useListUsersQuery,
} from 'generated/graphql';
import { inviteProps } from 'app/components/compounds/InviteContainer/InviteItem';

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

export function useGetSession(): string {
    const { data } = useGetUserSessionQuery();

    if (data?.getUserSession.id) {
        return data.getUserSession.id;
    }
    return '';
}

export function useGetReceivedInvites(accept, userId: string): inviteProps[] {
    const { data } = useGetMyReceivedFriendInvitesQuery({ variables: { userId } });

    let returnMe: inviteProps[] = [];

    if (data?.pendingFriendInvitations) {
        for (let i = 0; i < data.pendingFriendInvitations.length; i++) {
            returnMe.push({
                accept,
                id: data.pendingFriendInvitations[i].id,
                name: data.pendingFriendInvitations[i].firstName + ' ' + data.pendingFriendInvitations[i].lastName,
            });
        }
        return returnMe;
    }
    return [];
}

export function useListUsers(myId: string) {
    const { data } = useListUsersQuery();

    if (data?.listUsers) {
        let returnMe: Friend[] = [];

        for (let i = 0; i < data.listUsers.length; i++) {
            if (data.listUsers[i].id === myId) {
                continue;
            }
            returnMe.push({
                id: data.listUsers[i].id,
                name: data.listUsers[i].firstName + ' ' + data.listUsers[i].lastName,
            });
        }
        return returnMe;
    }
    return [];
}
