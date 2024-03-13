import { Paper, Typography } from '@mui/material';

interface Friend {
    name: string;
}

export default function FriendIndexItem({ name }: Friend) {
    return (
        <Paper variant="outlined" style={{ padding: 20 }}>
            <Typography variant="h5">{name}</Typography>
        </Paper>
    );
}
