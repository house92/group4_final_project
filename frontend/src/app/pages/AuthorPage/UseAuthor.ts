import { Author } from 'generated/graphql';

interface Author {
    id: string;
    name: string;
    dateOfBirth: string;
    dateOfDeath: string;
    hometown: string;
    bio: string;
}

export default function useAuthor() {
    const { data } = Author();

    let author: Author[] = [];

    author = data.listAuthors(author) => ({
        bio: author.bio
        id: author.id,
        name: `${author.firstName} ${author.lastName}`,
        dateOfBirth: author.dateOfBirth,
        dateOfDeath: author.dateOfDeath,
        hometown: author.hometown,
        bio: author.bio,
    )};

    return { author };
}