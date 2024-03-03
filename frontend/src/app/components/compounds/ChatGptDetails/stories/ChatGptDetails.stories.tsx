import React from 'react';
import { Paper, Typography } from '@mui/material';
import ChatGptDetails from '../ChatGptDetails';
import { DateTime } from 'luxon';

export default {
    title: 'Compounds/ChatGptDetails',
};

function tester() {
    console.log("clicked.");
}

export const Default = () => <ChatGptDetails clicked={tester} />;
