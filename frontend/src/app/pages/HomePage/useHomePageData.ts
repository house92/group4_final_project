import { DateTime } from 'luxon';
import { useGetHomePageDataQuery } from 'generated/graphql';

interface Review {
    id: string;
    title: string;
    body: string;
    rating: number;
    reviewerName: string;
    //timestamp: DateTime;
}

export default function useHomePageData(userId: string) {
    const { data } = useGetHomePageDataQuery({
        variables: { userId },
    });

    let reviews: Review[] = [];
    if (data) {
        if (data.friendReviews?.friends) {
            reviews = data.friendReviews.friends.flatMap((friend) =>
                (friend.bookReviews || []).map((review) => ({
                    id: review.id,
                    title: review.book.title,
                    body: review.body,
                    rating: review.rating,
                    reviewerName: `${review.user.firstName} ${review.user.lastName}`,
                    //timestamp: review.timestamp,
                })),
            );
        } else if (data.allReviews) {
            reviews = data.allReviews.map((review) => ({
                id: review.id,
                title: review.book.title,
                body: review.body,
                rating: review.rating,
                reviewerName: `${review.user.firstName} ${review.user.lastName}`,
                //timestamp: review.timestamp,
            }));
        }
    }

    //const sortedReviews = reviews.sort((a, b) => b.timestamp.toMillis() - a.timestamp.toMillis());

    //return sortedReviews;
    return reviews;
}
