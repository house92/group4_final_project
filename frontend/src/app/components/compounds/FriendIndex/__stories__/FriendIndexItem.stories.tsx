import FriendIndex from '../FriendIndex';

export default {
    title: 'Compounds/FriendIndex',
};

export const Default = () => (
    <FriendIndex
        friends={[
            { id: '123', name: 'Duncan' },
            { id: '234', name: 'Sam' },
            { id: '345', name: 'Uyanga' },
        ]}
    />
);
