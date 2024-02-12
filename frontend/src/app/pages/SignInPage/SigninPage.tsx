import SignInForm from "app/components/compounds/SignInForm";
import useSignIn from "./useSignIn";

export default function SignInPage() {
    const { user } = useSignIn();

    return <SignInForm onSubmit={({ email, password }) => SignIn({ variable: { email, password } })} />
}