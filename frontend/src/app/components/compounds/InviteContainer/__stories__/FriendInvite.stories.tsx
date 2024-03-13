import InviteContainer, { InviteContainerProps } from '../InviteContainer';
import { inviteProps } from '../InviteItem';

export default {
    title: 'Compounds/InviteContainer',
};

async function tester(id: string): Promise<string> {
    return 'Button Clicked';
}

const testProps: inviteProps[] = [
    { accept: tester, name: 'Robert', id: '123456' },
    { accept: tester, name: 'Robert', id: '123456' },
    { accept: tester, name: 'Robert', id: '123456' },
    { accept: tester, name: 'Robert', id: '123456' },
    { accept: tester, name: 'Robert', id: '123456' },
    { accept: tester, name: 'Robert', id: '123456' },
    { accept: tester, name: 'Robert', id: '123456' },
    { accept: tester, name: 'Robert', id: '123456' },
    { accept: tester, name: 'Robert', id: '123456' },
    { accept: tester, name: 'Robert', id: '123456' },
    { accept: tester, name: 'Robert', id: '123456' },
    { accept: tester, name: 'Robert', id: '123456' },
    { accept: tester, name: 'Robert', id: '123456' },
    { accept: tester, name: 'Robert', id: '123456' },
    { accept: tester, name: 'Robert', id: '123456' },
    { accept: tester, name: 'Robert', id: '123456' },
    { accept: tester, name: 'Robert', id: '123456' },
    { accept: tester, name: 'Robert', id: '123456' },
];

const passMe: InviteContainerProps = {
    props: testProps,
};

export const Default = () => <InviteContainer {...passMe} />;
