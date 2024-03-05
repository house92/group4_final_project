import { GetHomePageDataQuery, useGetHomePageDataQuery } from 'generated/graphql';

interface Review {
    id: string;
    title: string;
    bookHref: string;
    body: string;
    rating: number;
    reviewerName: string;
    reviewerHref?: string;
}

function transformGqlBookReview(review: GetHomePageDataQuery['allReviews'][number]): Review {
    return {
        id: review.id,
        title: review.book.title,
        bookHref: `/books/${review.book.id}`,
        body: review.body,
        rating: review.rating,
        reviewerName: `${review.user.firstName}`,
    };
}

export default function useHomePageData(userId: string, authenticated: boolean) {
    const { data } = useGetHomePageDataQuery({
        variables: { userId, authenticated },
    });

    let reviews: Review[] = [];
    if (data?.friendReviews?.friends) {
        reviews = data.friendReviews.friends.flatMap((friend) =>
            (friend.bookReviews || []).map((review) => ({
                ...transformGqlBookReview(review),
                reviewerHref: `/users/${review.user.id}`,
            })),
        );
    } else if (data?.allReviews) {
        reviews = data.allReviews.map(transformGqlBookReview);
    }
    return { reviews };
}
