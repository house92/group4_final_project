import { SigninForm } from } 'app/components';;
import { useSignInMutation } from 'geberated/graphql';

export default function SignInPage() {
    const [SignIn] = useSignInMutation();

    return <SigninForm onSubmit={({ email, password }) => SignIn({ variable: { email, password } })} />
}