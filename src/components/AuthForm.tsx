import { Fields } from "@/pages/login";
import { AuthContainer, ExtraFormLinks, FormContainer, FormImageContainer, FormInput, FormTitle, StyledAuthForm } from "@/styles/AuthFormStyles";
import { DefaultButton, ErrorMessage, SuccessMessage } from "@/styles/GlobalStyles";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from 'next/router';
import { ChangeEvent, useState } from "react";
import axios from "axios";
// import { logIn } from "../../store/user/actions";

type propTypes = {
    endpoint: string,
    fields: Fields,
    title: string
}

type FormValues = {
    name: string,
    email: string,
    password: string
}


export const AuthForm = ({ endpoint, fields, title }: propTypes) => {
    const [submitRequest, setSubmitRequest] = useState({ isLoading: false, submited: false, error: false, errorMessage: "" });
    const [values, setValues] = useState<FormValues>({ name: "", email: "", password: "" });
    const router = useRouter();

    // Function to handle input changes and update its state value
    const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setValues((prevValues) => ({
            ...prevValues,
            [name]: value,
        }));
    };

    // Function to handle form submission
    const handleSubmit = async (e: { preventDefault: () => void; }) => {
        try {
            setSubmitRequest({ ...submitRequest, isLoading: true });
            e.preventDefault();

            const { email, password } = values;
            // Make a POST request to the provided endpoint with input values and set authToken
            const response = await axios.post(endpoint, { email, password });
            // !!! TO-DO
            // dispatch(logIn(response.data.authToken));
            //set authToken in browser, get user info

            // Navigate to the user dashboard after a successful submission
            setSubmitRequest({
                ...submitRequest,
                submited: true,
                isLoading: false,
            });
            setTimeout(() => {
                //!!! TO-DO Redirect to dashboard instead
                router.push('/');
            }, 3500);
        } catch (error) {
            setSubmitRequest({
                ...submitRequest,
                error: true,
                submited: true,
                errorMessage: "error",
            });

            setTimeout(() => {
                setSubmitRequest({
                    ...submitRequest,
                    error: false,
                });
            }, 2500);
        }
    };

    return (
        <AuthContainer>
            <FormContainer>
                <FormTitle>{title == "Login" ? "Log In" : "Sign-up"}</FormTitle>
                <StyledAuthForm onSubmit={handleSubmit}>
                    {fields.map((field) => (
                        <div key={field.name}>
                            <label>{field.label}:</label>
                            <FormInput
                                type={field.type}
                                name={field.name}
                                value={values[field.name]}
                                onChange={(e) => onInputChange(e)}
                                required
                                //add Autocompletes (next.js suggestion)
                            />
                        </div>
                    ))}
                    <DefaultButton bgColor="danger" type='submit'>{title}</DefaultButton>
                    <ExtraFormLinks>
                        {/* Auto switch links */}

                        <p>
                            {title === "Login"
                                ? "Do not have an account?"
                                : "Already have an account?"}
                        </p>

                        <Link href={title === "Login" ? "/register" : "/login"}>
                            {title === "Login" ? "Register" : "Login"}
                        </Link>
                    </ExtraFormLinks>
                </StyledAuthForm>
                {submitRequest.isLoading && <p>Loading...</p>}

                {submitRequest.error && (
                    <ErrorMessage>Sorry, {submitRequest.errorMessage}</ErrorMessage>
                )}
                {!submitRequest.isLoading &&
                    submitRequest.submited &&
                    !submitRequest.error ? (
                    <SuccessMessage>
                        <p>Successfully {title === "Login" ? "Logged in" : "Registered"}. <br />You&apos;ll be redirected...</p>
                    </SuccessMessage>
                ) : null}
            </FormContainer>
            <FormImageContainer>
                <Image src="/images/auth-img.png" alt="A tablet and a smartphone showing the Cash Mosaic App" width={748} height={982} />
            </FormImageContainer>
        </AuthContainer>
    );
};
