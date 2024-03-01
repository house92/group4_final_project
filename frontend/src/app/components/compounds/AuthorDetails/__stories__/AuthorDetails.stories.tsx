import AuthorDetails from '../AuthorDetails';

export default {
    title: 'Compounds/AuthorDetails',
};

export const Default = () => (
    <AuthorDetails name="John Doe" birthYear={2002} hometown="Chicago" bio="This is the bio..." />
);
