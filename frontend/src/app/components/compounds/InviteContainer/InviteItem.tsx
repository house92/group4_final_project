import { Box, Button, Typography } from '@mui/material';
import { useEffect, useState } from 'react';

export interface inviteProps {
    accept;
    name: string;
    id: string;
}



export default function InviteItem({ accept, name, id }: inviteProps) {
    const [pressed, setPressed] = useState(false);
    
    async function handleAccept(userId) {
        setPressed(true);
        await accept({ variables: { userId } });
    }

    return (
        <Box display="flex" justifyContent="left" sx={{ m: 4 }}>
            <Button variant="contained" onClick={async () => handleAccept(id)} disabled={pressed}>
                Accept
            </Button>
            <Typography variant="h5" component="p" sx={{ m: 4 }}>
                {name}
            </Typography>
        </Box>
    );
}
