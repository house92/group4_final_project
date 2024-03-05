import React from 'react';
import { Box } from '@mui/material';
import { Tab } from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import ChatGptReviewer from './ChatGptReviewer';

export enum Reviewer {
    MARY_POPPINS,
    BASEBALL_JOE,
    CAVEMAN,
    POPEYE,
}

const arePressed: boolean[] = [false, false, false, false];
const possibleReviews: string[] = ['', '', '', ''];

function saveVals(tab: Reviewer, body: string) {
    arePressed[tab] = true;
    possibleReviews[tab] = body;
}

export default function ChatGptReviewerPanel({ clicked, title }) {
    const [reviewerTab, setReviewerTab] = React.useState('0');

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setReviewerTab(newValue);
    };

    const handleClicked = async (reviewer: Reviewer) => {
        const review: string = await clicked(title, reviewer);
        saveVals(reviewer, review);
        return review;
    };

    return (
        <Box sx={{ width: 600, typography: 'body1' }}>
            <TabContext value={reviewerTab}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <TabList onChange={handleChange} aria-label="Reviewer Changed">
                        <Tab label="Mary Poppins" value={'0'} />
                        <Tab label="Baseball Joe" value={'1'} />
                        <Tab label="Caveman" value={'2'} />
                        <Tab label="Popeye the Sailor" value={'3'} />
                    </TabList>
                </Box>
                <TabPanel value={'0'}>
                    <ChatGptReviewer
                        clicked={handleClicked}
                        reviewer={Reviewer.MARY_POPPINS}
                        buttonPressed={arePressed[Reviewer.MARY_POPPINS]}
                        body={possibleReviews[Reviewer.MARY_POPPINS]}
                    ></ChatGptReviewer>
                </TabPanel>
                <TabPanel value="1">
                    <ChatGptReviewer
                        clicked={handleClicked}
                        reviewer={Reviewer.BASEBALL_JOE}
                        buttonPressed={arePressed[Reviewer.BASEBALL_JOE]}
                        body={possibleReviews[Reviewer.BASEBALL_JOE]}
                    ></ChatGptReviewer>
                </TabPanel>
                <TabPanel value="2">
                    <ChatGptReviewer
                        clicked={handleClicked}
                        reviewer={Reviewer.CAVEMAN}
                        buttonPressed={arePressed[Reviewer.CAVEMAN]}
                        body={possibleReviews[Reviewer.CAVEMAN]}
                    ></ChatGptReviewer>
                </TabPanel>
                <TabPanel value="3">
                    <ChatGptReviewer
                        clicked={handleClicked}
                        reviewer={Reviewer.POPEYE}
                        buttonPressed={arePressed[Reviewer.POPEYE]}
                        body={possibleReviews[Reviewer.POPEYE]}
                    ></ChatGptReviewer>
                </TabPanel>
            </TabContext>
        </Box>
    );
}
