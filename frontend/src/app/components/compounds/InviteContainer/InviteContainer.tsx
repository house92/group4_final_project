import { useState } from 'react';
import { Box } from '@mui/material';
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
        <Box sx={{ width: 600, height: 300, overflowY: 'auto' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                {inputProps.props.map(({ accept, name, id }) => (
                    <InviteItem name={name} id={id} accept={accept} />
                ))}
            </Box>
        </Box>
    );
}
