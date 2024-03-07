import { useState } from 'react';
import { Box } from '@mui/material';
import { Tab } from '@mui/material';
import { TabContext, TabList } from '@mui/lab';
import InviteItem, { inviteProps } from './InviteItem';

export default function InviteContainer(props) {

    return (
        <Box sx={{ width: 600, height: 500, overflowY: 'auto' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                {props.map(({ accept, name, id }) => (
                    <InviteItem name={name} id={id} accept={accept} />
                ))}
            </Box>
        </Box>
    );
}
