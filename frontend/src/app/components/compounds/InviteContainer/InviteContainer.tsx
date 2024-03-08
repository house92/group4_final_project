import { useState } from 'react';
import { Box, Typography } from '@mui/material';
import { Tab } from '@mui/material';
import { TabContext, TabList } from '@mui/lab';
import InviteItem, { inviteProps } from './InviteItem';

export interface InviteContainerProps {
    props: inviteProps[];
}

export default function InviteContainer(inputProps: InviteContainerProps) {
    let e: inviteProps[] = [];
    // const props = inputProps.props;

    // for (let i = 0; i < props.length; i++) {
    //     e.push(props[i]);
    // }

    return (
        <Box sx={{ width: 400, height: 300 }}>
            <Typography variant="h5" component="p" textAlign="center" m={2}>
                Friend Requests
            </Typography>
            <Box sx={{ width: 400, height: 200, overflowY: 'auto' }}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    {inputProps.props.map(({ accept, name, id }) => (
                        <InviteItem name={name} id={id} accept={accept} />
                    ))}
                </Box>
            </Box>
        </Box>
    );
}
