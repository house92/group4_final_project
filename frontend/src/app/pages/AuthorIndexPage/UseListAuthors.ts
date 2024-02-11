import { useGetAuthorsListQuery } from 'generated/graphql';

interface Author {
    id: string;
    name: string;
    dateOfBirth: string;
    dateOfDeath: string;
    hometown: string;
    bio: string;
}

export default function useAuthors() {
    const { data } = useGetAuthorsListQuery();

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
    }

    return { authors };
}
