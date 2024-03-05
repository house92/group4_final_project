import React from 'react';
import { Paper, Typography } from '@mui/material';
import ChatGptReviewerPanel, { Reviewer } from '../ChatGptReviewerPanel';

export default {
    title: 'Compounds/ChatGptReviewerPanel',
};

async function tester(title: string, reviewer: Reviewer): Promise<string> {

    return 'Button clicked for reviewer ' + reviewer + ' for title ' + title + '.';
}

export const Default = () => <ChatGptReviewerPanel clicked={tester} title="Moby Dick" />;
