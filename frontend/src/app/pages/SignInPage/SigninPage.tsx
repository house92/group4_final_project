import SignInForm from "app/components/compounds/SignInForm";

import useSignIn from "./useSignIn";

export default function SignInPage() {


    const { user } = useSignIn(email, password);

    return (
        <div>
            <h1>Sign-in Page</h1>
            <div style={{ marginBottom: '20px' }}></div>
            <SignInForm
                email={user?.email}
                password={user?.password}
                onSubmit={({ email, password }) => useSignIn({ variable: { email, password } })} 
            />
        </div>
    )
}