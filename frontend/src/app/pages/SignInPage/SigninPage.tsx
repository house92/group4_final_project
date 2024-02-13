import SignInForm from "app/components/compounds/SignInForm";

import { useParams } from 'react-router-dom';
import useSignIn from "./useSignIn";

export default function SignInPage() {

    const { userID } = useParams();

    const { user } = useSignIn(email, password);

    return (
        <div>
            <h1>Sign In Page</h1>
            <div style={{ marginBottom: '20px' }}></div>
            <SignInForm
                email={user?.email}
                password={user?.password}
                onSubmit={({ email, password }) => useSignIn({ variable: { email, password } })} 
            />
        </div>
    )
}