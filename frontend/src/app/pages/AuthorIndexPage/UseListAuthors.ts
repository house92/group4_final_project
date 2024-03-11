import { useGetAuthorsListQuery } from 'generated/graphql';

interface Author {
    id: string;
    name: string;
    dateOfBirth: string;
    dateOfDeath: string | null | undefined;
    hometown: string | null | undefined;
    bio: string | null | undefined;
}

export default function useAuthors(pageLimit: number, offset: number) {
    //issue here "cannot assign type number to type never"
    const { data } = useGetAuthorsListQuery({
        variables: { pageLimit: pageLimit, startOffset: offset },
    });

    let authors: Author[] = [];

    if (data?.listAuthors) {
        authors = data.listAuthors.edges.map((edge) => ({
            id: edge.node.id,
            name: `${edge.node.firstName} ${edge.node.lastName}`,
            dateOfBirth: edge.node.dateOfBirth,
            dateOfDeath: edge.node.dateOfDeath,
            hometown: edge.node.hometown,
            bio: edge.node.bio,
        }));
        if (data.listAuthors) {
            console.log(data.listAuthors.at(0)?.id);
        }
    }

    return { authors };
}
