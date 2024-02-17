import FriendsDetails from '../FriendsDetails';

export default {
    title: 'Compounds/FriendsDetails',
};

export const Default = () => (
    <FriendsDetails
        name="Friend Name"
        profilePic="Prolfile Picture URL"
        bio="This is the friends bio..."
    />
);