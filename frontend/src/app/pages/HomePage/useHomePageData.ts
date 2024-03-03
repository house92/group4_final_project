import { DateTime } from 'luxon';
import { useGetHomePageDataQuery, GetHomePageDataQueryVariables } from 'generated/graphql';

interface Review {
    id: string;
    title: string;
    body: string;
    rating: number;
    reviewerName: string;
}

export default function useHomePageData(userId: string, authenticated: boolean) {
    const { data } = useGetHomePageDataQuery({
        variables: { userId, authenticated },
    });

    let reviews: Review[] = [];
    if (data?.friendReviews?.friends) {
        reviews = data.friendReviews.friends.flatMap((friend) =>
            (friend.bookReviews || []).map((review) => ({
                id: review.id,
                title: review.book.title,
                body: review.body,
                rating: review.rating,
                reviewerName: `${review.user.firstName} ${review.user.lastName}`,
            })),
        );
    } else if (data?.allReviews) {
        reviews = data.allReviews.map((review) => ({
            id: review.id,
            title: review.book.title,
            body: review.body,
            rating: review.rating,
            reviewerName: `${review.user.firstName}`,
        }));
    }
    return { reviews };
}
