// import { useEffect } from "react";
// import { getRedirectResult } from "firebase/auth";
import {
    // auth,
    signInWithGooglePopup,
    // signInWithGoogleRedirect,
    createUserDocumentFromAuth
} from "../../utils/firebase/firebase.utils";
import SignUpForm from "../../components/sign-up-form/sing-up-form.components";

const SignIn = () => {

    //Redirect sign-in
    // useEffect(() => {
    //     const getRedirectResponse = async () => {
    //         const response = await getRedirectResult(auth);

    //         if (response) {
    //             await createUserDocumentFromAuth(response.user);
    //         }
    //         console.log(response);
    //     }
    //     getRedirectResponse();
    // }, []);

    const logGoogleUser = async () => {
        const { user } = await signInWithGooglePopup();
        const userDocRef = await createUserDocumentFromAuth(user);
        console.log(userDocRef);
    }

    return (
        <div>
            <h1>Sign In Page</h1>
            <button onClick={logGoogleUser}>Sign in with google Popup</button>
            {/* <button onClick={signInWithGoogleRedirect}>Sign in with google Redirect</button> */}
            <SignUpForm />
        </div>
    )
}

export default SignIn;