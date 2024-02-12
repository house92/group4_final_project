import { useParams } from 'react-router-dom';
import useSignIn from './useSignIn';

export default function SignInPage() {
    const { users } = useSignIn();

    return (
        <div>
            <h1>Sign In Page</h1>
        </div>
    );
}