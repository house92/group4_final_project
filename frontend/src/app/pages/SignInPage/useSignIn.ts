import { useGetUserSessionQuery } from "generated/graphql"

interface User {
    userName: string;
    password: string;
}

export default function useSignIn() {
    const { data } = useGetUserSessionQuery();

    let user = "";
    user="";

    return user;
}