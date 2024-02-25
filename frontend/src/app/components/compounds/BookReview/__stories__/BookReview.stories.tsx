import BookReview from '../BookReview';

export default {
    title: 'Compounds/BookReview',
};

export const Default = () => (
    <BookReview title="Happy Feet" body="This book has lots of penguins" rating={5} reviewerName={'The Penguin'} />
);
