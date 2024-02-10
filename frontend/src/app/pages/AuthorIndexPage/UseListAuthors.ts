import { useGetAuthorsListQuery } from 'generated/graphql';

interface Author {
    id: string;
    firstName: string;
    lastName: string;
    dateOfBirth: string;
    dateOfDeath: string;
    hometown: string;
    bio: string;
}

export default function useListAuthors(id: string = '') {
    const { data } = useGetAuthorsListQuery();

    let authorTemp: Author | undefined;
    let authorArr: Author[] = [];

    if (data?.listAuthors) {
        // let myArray: Author[] = [];

        // for (let element of data?.listAuthors) {
        //     myArray.push(element);
        // }
        for (let i = 0; i < data?.listAuthors.length; i++) {
            authorTemp = {
                id: data?.listAuthors[i].id,
                firstName: data?.listAuthors[i].firstName,
                lastName: data?.listAuthors[i].lastName,
                dateOfBirth: data?.listAuthors[i].dateOfBirth,
                dateOfDeath: data?.listAuthors[i].dateOfDeath,
                hometown: data?.listAuthors[i].hometown,
                bio: data?.listAuthors[i].bio
            }
            authorArr.push(authorTemp);
        }
        
    }

    return { authorArr };
}
