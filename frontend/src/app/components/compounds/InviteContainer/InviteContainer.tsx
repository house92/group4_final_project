import { Box, Typography } from '@mui/material';
import InviteItem, { inviteProps } from './InviteItem';

export interface InviteContainerProps {
    props: inviteProps[];
}

export default function InviteContainer(inputProps: InviteContainerProps) {
    return (
        <Box sx={{ width: 400, height: 400 }}>
            <Typography variant="h5" component="p" textAlign="center" m={2}>
                Friend Requests
            </Typography>
            <Box sx={{ width: 400, height: 300, overflowY: 'auto' }}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    {inputProps.props.map(({ accept, name, id }) => (
                        <InviteItem name={name} id={id} accept={accept} />
                    ))}
                </Box>
            </Box>
        </Box>
    );
}
