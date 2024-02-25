import React from 'react';
import { useQuery, gql } from '@apollo/client';
import { useParams } from 'react-router-dom';
import FriendIndex from 'app/components/compounds/FriendIndex';

const GET_FRIENDS_OF_USER = gql`
    query GetFriendsOfUser($userId: String!) {
        user(id: $userId) {
            friends {
                id
                name
            }
        }
    }
`;

export default function FriendPage() {
    const { userId } = useParams<{ userId: string }>();
    const { data, loading, error } = useQuery(GET_FRIENDS_OF_USER, {
        variables: { userId },
    });

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    // Extract the friends from the query data
    const friends = data?.user?.friends || [];

    return (
        <div>
            <h1>Friend Page</h1>
            <FriendIndex
                friends={friends.map((friend) => ({
                id: friend.id, // Ensure you have an 'id' field for each friend
                    name: friend.name,
                    onClick: () => console.log('Friend clicked', friend.id),
                }))}
            />
        </div>
    );
}