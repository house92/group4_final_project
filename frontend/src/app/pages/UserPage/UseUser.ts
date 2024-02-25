import { useGetUserByIdQuery } from 'generated/graphql';
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
