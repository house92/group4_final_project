import SignInForm from "app/components/compounds/SignInForm";
import useSignIn from "./useSignIn";

export default function SignInPage() {
    const { user } = useSignIn();

    return <SignInForm onSubmit={({ email, password }) => useSignIn({ variable: { email, password } })} />
}