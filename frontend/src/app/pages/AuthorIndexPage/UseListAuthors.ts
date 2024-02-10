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
    console.log(data);
    console.log('in useListAuthors');

    console.log(data?.listAuthors.length);

    if (data?.listAuthors) {
        // let myArray: Author[] = [];

        // for (let element of data?.listAuthors) {
        //     myArray.push(element);
        // }
        console.log('about to map');

        authors = data.listAuthors.map((author) => ({
            id: author.id,
            name: `${author.firstName} ${author.lastName}`,
            dateOfBirth: author.dateOfBirth,
            dateOfDeath: author.dateOfDeath,
            hometown: author.hometown,
            bio: author.bio,
        }));
        console.log('just mapped');
    }

    return { authors };
}
