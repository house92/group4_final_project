import React from 'react';
import { Box, Button, Paper, Typography } from '@mui/material';
import { DateTime } from 'luxon';
import { Tab } from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Image } from 'mui-image';

export default function ChatGptDetails() {
    const [value, setValue] = React.useState('1');

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
    };
    return (
        <Box sx={{ width: '100%', typography: 'body1' }}>
            <Typography variant="h5">Reviews</Typography>
            <TabContext value={value}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <TabList onChange={handleChange} aria-label="Reviewer Changed">
                        <Tab label="Mary Poppins" value="0" />
                        <Tab label="Baseball Joe" value="1" />
                        <Tab label="Caveman" value="2" />
                    </TabList>
                </Box>
                <TabPanel value="0">
                    <Box display="flex" alignItems="center">
                        <Typography variant="h5">
                            Mary Poppins
                        </Typography>
                        <Button variant="contained" color="primary" style={{ marginLeft: '16px' }}>
                            See Review
                        </Button>
                    </Box>
                    <Typography variant="body1" style={{ marginTop: '16px' }}>
                        Body goes here.
                    </Typography>
                </TabPanel>
                <TabPanel value="1">
                    <Box display="flex" alignItems="center">
                        <Typography variant="h5">Baseball Joe</Typography>
                        <Button variant="contained" style={{ marginLeft: '16px' }}>
                            See Review
                        </Button>
                    </Box>
                    <Typography variant="body1" style={{ marginTop: '16px' }}>
                        Body goes here.
                    </Typography>
                </TabPanel>
                <TabPanel value="2">
                    <Box display="flex" alignItems="center">
                        <Typography variant="h5">Caveman</Typography>
                        <Button variant="contained" style={{ marginLeft: '16px' }}>
                            See Review
                        </Button>
                    </Box>
                    <Typography variant="body1" style={{ marginTop: '16px' }}>
                        Body goes here.
                    </Typography>
                </TabPanel>
            </TabContext>
        </Box>
    );
}
