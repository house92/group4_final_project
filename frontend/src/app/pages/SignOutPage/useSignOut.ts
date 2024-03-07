import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSignInUserMutation, useSignOutUserMutation } from 'generated/graphql';

export default function useSignIn() {
    const navigate = useNavigate();
    const [signOutUserMutation] = useSignOutUserMutation();
    const data = signOutUserMutation();
    navigate('/authors');
}
