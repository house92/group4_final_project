import React, { useState } from 'react';
import { Box, Button, Paper, Typography } from '@mui/material';
import { Tab } from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Image } from 'mui-image';

export default function ChatGptDetails({ clicked, title }) {
    const [value, setValue] = React.useState('0');

    const bookTitle = title;

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
    };

    const [button1Clicked, setButton1Clicked] = useState(false);
    const [button2Clicked, setButton2Clicked] = useState(false);
    const [button3Clicked, setButton3Clicked] = useState(false);

    const [textContent1, setTextContent1] = useState('');
    const [textContent2, setTextContent2] = useState('');
    const [textContent3, setTextContent3] = useState('');

    const handleButtonClick1 = async () => {
        try {
            setTextContent1('Mary Poppins is writing her review...');
            const result = await clicked(bookTitle, 0);
            setTextContent1(result);
        } catch (error) {
            console.log('Error:', error);
        }
        setButton1Clicked(true);
    };

    const handleButtonClick2 = async () => {
        try {
            setTextContent2('Baseball Joe is writing his review...');
            const result = await clicked(bookTitle, 1);
            setTextContent2(result);
        } catch (error) {
            console.log('Error:', error);
        }
        setButton2Clicked(true);
    };
    const handleButtonClick3 = async () => {
        try {
            setTextContent3('Caveman is writing his review...');
            const result = await clicked(bookTitle, 2);
            setTextContent3(result);
        } catch (error) {
            console.log('Error:', error);
        }
        setButton3Clicked(true);
    };

    return (
        <Box sx={{ width: 600, typography: 'body1' }}>
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
                        <Typography variant="h5">Mary Poppins' Spoonful of Sugar:</Typography>
                        <Button
                            variant="contained"
                            color="primary"
                            style={{ marginLeft: '16px' }}
                            onClick={handleButtonClick1}
                            disabled={button1Clicked}
                        >
                            See Review
                        </Button>
                    </Box>
                    <Typography variant="body1" style={{ marginTop: '16px' }}>
                        {textContent1}
                    </Typography>
                </TabPanel>
                <TabPanel value="1">
                    <Box display="flex" alignItems="center">
                        <Typography variant="h5">Baseball Joe's Grand Slam:</Typography>
                        <Button
                            variant="contained"
                            style={{ marginLeft: '16px' }}
                            onClick={handleButtonClick2}
                            disabled={button2Clicked}
                        >
                            See Review
                        </Button>
                    </Box>
                    <Typography variant="body1" style={{ marginTop: '16px' }}>
                        {textContent2}
                    </Typography>
                </TabPanel>
                <TabPanel value="2">
                    <Box display="flex" alignItems="center">
                        <Typography variant="h5">Caveman's Chronicle:</Typography>
                        <Button
                            variant="contained"
                            style={{ marginLeft: '16px' }}
                            onClick={handleButtonClick3}
                            disabled={button3Clicked}
                        >
                            See Review
                        </Button>
                    </Box>
                    <Typography variant="body1" style={{ marginTop: '16px' }}>
                        {textContent3}
                    </Typography>
                </TabPanel>
            </TabContext>
        </Box>
    );
}
