import {
    useGetUserByIdQuery,
    useGetUserSessionQuery,
    useGetUserFriendsQuery,
    useGetMyReceivedFriendInvitesQuery,
    useGetMySentFriendInvitesQuery,
    useSendFriendInviteMutation,
} from 'generated/graphql';
import { DateTime } from 'luxon';

interface User {
    id: string;
    name: string;
    age: number;
    bio?: string;

    bookReviews: {
        id: string;
        title: string;
        body: string;
        rating: number;
    }[];
}

interface Response {
    user?: User;
}

export interface inviteProps {
    friendAlready: boolean;
    pendingAlready: boolean;
}
export default function useUser(userId: string = ''): Response {
    const { data } = useGetUserByIdQuery({ variables: { userId } });

    let res: Response = {};

    if (data?.getUser) {
        const baseUser = data.getUser;
        const name = `${baseUser.firstName} ${baseUser.lastName}`;

        res.user = {
            id: baseUser.id,
            name,
            age:
                DateTime.fromISO(baseUser.dateOfBirth).month <= DateTime.now().month &&
                DateTime.fromISO(baseUser.dateOfBirth).day <= DateTime.now().day
                    ? DateTime.now().year - DateTime.fromISO(baseUser.dateOfBirth).year
                    : DateTime.now().year - DateTime.fromISO(baseUser.dateOfBirth).year - 1,
            bio: baseUser.bio ?? undefined,

            bookReviews: (baseUser.bookReviews ?? []).map((review) => ({
                id: review.id,
                title: review.book.title,
                body: review.body,
                rating: review.rating,
            })),
        };
    }

    return res;
}

export function useIsFriends(userId: string = '', myId: string): boolean {
    const { data } = useGetUserFriendsQuery({ variables: { userId } });

    if (data?.getUser.friends) {
        for (let i = 0; i < data.getUser.friends.length; i++) {
            if (data.getUser.friends[i].id === myId) {
                return true;
            }
        }
    }
    return false;
}

export function useIsInviteSentAlready(userId: string = '', myId: string): boolean {
    const { data } = useGetMyReceivedFriendInvitesQuery({ variables: { userId } });

    if (data?.pendingFriendInvitations) {
        for (let i = 0; i < data.pendingFriendInvitations.length; i++) {
            if (data.pendingFriendInvitations[i].id === myId) {
                return true;
            }
        }
    }
    return false;
}

export function useIsInviteReceivedAlready(userId: string = '', myId: string): boolean {
    const { data } = useGetMySentFriendInvitesQuery({ variables: { userId } });

    if (data?.sentFriendInvitations) {
        for (let i = 0; i < data.sentFriendInvitations.length; i++) {
            if (data.sentFriendInvitations[i].id === myId) {
                return true;
            }
        }
    }
    return false;
}

export function useSendInvite(userId: string) {
    useSendFriendInviteMutation({ variables: { userId } });
}
