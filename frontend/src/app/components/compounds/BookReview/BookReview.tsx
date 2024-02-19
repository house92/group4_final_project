import * as React from 'react';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import { Button, Paper, Stack, TextField, Typography } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';

interface BookDetailsProps {
    title: string;
}

export default function BookReview({ title }: BookDetailsProps) {
    const [value, setValue] = React.useState(2);
    const [hover, setHover] = React.useState(-1);
    const labels = {
        1: 'Terrible',
        2: 'Below Average',
        3: 'Okay',
        4: 'Good',
        5: 'Excellent',
    };

    function getLabelText(value) {
        return `${value} Star${value !== 1 ? 's' : ''}, ${labels[value]}`;
    }
    return (
        <Paper
            variant="outlined"
            style={{ padding: 20 }}
            sx={{
                width: 400,
                display: 'flex',
                alignItems: 'center',
            }}
        >
            <Stack spacing={2}>
                <Typography variant="h5">{title}</Typography>

                <Box
                    component="form"
                    sx={{
                        '& > :not(style)': { m: 2, width: '25ch' },
                    }}
                    noValidate
                    autoComplete="off"
                >
                    <TextField id="outlined-basic" variant="outlined" />
                </Box>
                <Box
                    sx={{
                        '& > legend': { mt: 2 },
                    }}
                >
                    {/* User will be able to set a rating */}
                    <Typography component="legend"></Typography>
                    <Rating
                        name="simple-controlled"
                        value={value}
                        onChange={(event, newValue) => {
                            setValue(newValue);
                        }}
                        name="hover-feedback"
                        value={value}
                        precision={1.0}
                        getLabelText={getLabelText}
                        onChange={(event, newValue) => {
                            setValue(newValue);
                        }}
                        onChangeActive={(event, newHover) => {
                            setHover(newHover);
                        }}
                        emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
                    />
                    {value !== null && <Box sx={{ ml: 0.5 }}>{labels[hover !== -1 ? hover : value]}</Box>}
                </Box>
            </Stack>
            {/* <Button type="save" variant="contained" color="primary">
            </Button> */}
        </Paper>
    );
}
