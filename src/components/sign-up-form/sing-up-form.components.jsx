import { useState } from "react";
import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils";

import FormInput from "../form-input/form-input.components";
import Button from "../button/button.components";

import './sign-up-form.styles.scss'

const defaultFormFields = {
    displayName: "",
    email: "",
    password: "",
    confirmPassword: ""
};

const SignUpForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const { displayName, email, password, confirmPassword } = formFields;

    console.log(formFields);

    const resetFromFields = () => {
        setFormFields(defaultFormFields)
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        //Check pass and confirmPass
        if (password !== confirmPassword) {
            alert("passwords do not match!");
            return;
        }

        //Create User
        try {
            const { user } = await createAuthUserWithEmailAndPassword(email, password);

            await createUserDocumentFromAuth(user, { displayName });
            resetFromFields();
        } catch (error) {
            if (error.code === "auth/email-already-in-use") {
                alert("Cannot create user, email already in use.")
            } else {
                console.log("This is firebase error: ", error);
            }
        }
    }


    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormFields({ ...formFields, [name]: value })
    }

    return (
        <div className="sign-up-form-container">
            <h2>Don't have an account?</h2>
            <span>Sign up with you email and password</span>
            <form onSubmit={handleSubmit}>
                <FormInput
                    label="Display Name"
                    type="text"
                    required
                    name="displayName"
                    value={displayName}
                    onChange={handleChange} />

                <FormInput
                    label="Email"
                    type="email"
                    required
                    name="email"
                    value={email}
                    onChange={handleChange} />

                <FormInput
                    label="Password"
                    type="password"
                    required
                    name="password"
                    value={password}
                    onChange={handleChange} />

                <FormInput
                    label="Confirm Password"
                    type="password"
                    required
                    name="confirmPassword"
                    value={confirmPassword}
                    onChange={handleChange} />


                <Button type="submit">Sign Up</Button>
            </form>
        </div>
    )
}

export default SignUpForm;