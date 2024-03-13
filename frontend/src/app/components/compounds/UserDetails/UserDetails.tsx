import { Paper, Typography } from '@mui/material';

interface UserDetailsProps {
    name?: string;
    bio: string | null | undefined;
    age: number;
}

export default function UserDetails({ name, bio, age }: UserDetailsProps) {
    return (
        <Paper variant="outlined" style={{ padding: 20 }}>
            {name && <Typography variant="body1">Name: {name}</Typography>}

            <Typography variant="body1">Age: {age}</Typography>

            <Typography variant="body1">Bio: {bio}</Typography>
        </Paper>
    );
}
