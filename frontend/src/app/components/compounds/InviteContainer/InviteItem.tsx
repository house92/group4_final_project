import { Box, Button, Typography } from '@mui/material';
import { useEffect, useState } from 'react';

export interface inviteProps {
    accept;
    name: string;
    id: string;
}

let pressed: boolean = false;

async function handleAccept(accept, userId) {
    console.log('button clicked for id ' + userId);
    pressed = true;
    await accept({ variables: { userId } });
}

export default function InviteItem({ accept, name, id }: inviteProps) {
    return (
        <Box display="flex" justifyContent="left" sx={{ m: 4 }}>
            <Button variant="contained" onClick={async () => handleAccept(accept, id)} disabled={pressed}>
                Accept
            </Button>
            <Typography variant="h5" component="p" sx={{ m: 4 }}>
                {name}
            </Typography>
        </Box>
    );
}
