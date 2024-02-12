interface User {
    userName: string;
    password: string;
}

export default function useSignIn() {
    const { data } = useGetSignInPageQuery();
}