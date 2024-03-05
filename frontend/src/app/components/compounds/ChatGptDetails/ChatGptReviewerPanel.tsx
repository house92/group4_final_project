import React from 'react';
import { Box } from '@mui/material';
import { Tab } from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import ChatGptReviewer from './ChatGptReviewer'

export enum Reviewer {
    MARY_POPPINS,
    BASEBALL_JOE,
    CAVEMAN,
    POPEYE,
  }
  const clicked: boolean[] = [false,false,false,false];
  const bodies: string[] = ['','','','']

  function doContext(tab: Reviewer) {

  }

export default function ChatGptReviewerPanel({ clicked, title }) {
    const [reviewerTab, setReviewerTab] = React.useState('0');

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setReviewerTab(newValue);
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
                <TabPanel value={'0'} >
                    <ChatGptReviewer clicked={clicked} reviewer={Reviewer.MARY_POPPINS} title={title}></ChatGptReviewer>
                </TabPanel>
                <TabPanel value="1">
                    <ChatGptReviewer clicked={clicked} reviewer={Reviewer.BASEBALL_JOE} title={title}></ChatGptReviewer>
                </TabPanel>
                <TabPanel value="2">
                    <ChatGptReviewer clicked={clicked} reviewer={Reviewer.CAVEMAN} title={title}></ChatGptReviewer>
                </TabPanel>
                <TabPanel value="3">
                    <ChatGptReviewer clicked={clicked} reviewer={Reviewer.POPEYE} title={title}></ChatGptReviewer>
                </TabPanel>
            </TabContext>
        </Box>
    );
}
