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
    //issue here
    const { data } = useGetAuthorsListQuery(/* { variables: { pageLimit, offset } } */);

    let authors: Author[] = [];

    if (data?.listAuthors) {
        authors = data.listAuthors.map((author) => ({
            id: author.id,
            name: `${author.firstName} ${author.lastName}`,
            dateOfBirth: author.dateOfBirth,
            dateOfDeath: author.dateOfDeath,
            hometown: author.hometown,
            bio: author.bio,
        }));
        if (data.listAuthors) {
            console.log(data.listAuthors.at(0)?.id);
        }
    }

    return { authors };
}
