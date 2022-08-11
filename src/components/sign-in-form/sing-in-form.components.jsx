import { useState } from "react";
import {
    createUserDocumentFromAuth,
    signInWithGooglePopup,
    singInAuthUserWithEmailAndPassword
} from "../../utils/firebase/firebase.utils";


import FormInput from "../form-input/form-input.components";
import Button from "../button/button.components";

import './sign-in-form.styles.scss'

const defaultFormFields = {
    email: "",
    password: "",
};

const SignInForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const { email, password } = formFields;

    const resetFromFields = () => {
        setFormFields(defaultFormFields)
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        //Create User
        try {
            const { user } = await singInAuthUserWithEmailAndPassword(
                email,
                password
            );

            resetFromFields();
        } catch (error) {
            switch (error.code) {
                case "auth/wrong-password":
                    alert("incorrect password for email");
                    break;
                case "auth/user-not-found":
                    alert("no user associated with this email");
                    break;
                default:
                    console.log(error);
            }
        }
    }


    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormFields({ ...formFields, [name]: value })
    }

    const signInWithGoogle = async () => {
        await signInWithGooglePopup();
    }

    return (
        <div className="sign-up-form-container">
            <h2>Already have an account?</h2>
            <span>Sign in with you email and password</span>
            <form onSubmit={handleSubmit}>
                <FormInput
                    label="Email"
                    type="email"
                    required
                    name="email"
                    value={email}
                    onChange={handleChange}
                />

                <FormInput
                    label="Password"
                    type="password"
                    required
                    name="password"
                    value={password}
                    onChange={handleChange}
                />
                <div className="buttons-container">
                    <Button type='submit'>Sign In</Button>

                    <Button type='button' buttonType='google' onClick={signInWithGoogle}>
                        Google sign in
                    </Button>
                </div>
            </form>
        </div>
    )
}

export default SignInForm;