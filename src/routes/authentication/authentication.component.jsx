// import { useEffect } from "react";
// import { getRedirectResult } from "firebase/auth";

import SignUpForm from "../../components/sign-up-form/sing-up-form.components";
import SignInForm from "../../components/sign-in-form/sing-in-form.components";

import './authentication.styles.scss'

const Authentication = () => {
    return (
        <div className="authentication-container">
            {/* <button onClick={signInWithGoogleRedirect}>Sign in with google Redirect</button> */}
            <SignInForm />
            <SignUpForm />
        </div>
    )
}

export default Authentication;