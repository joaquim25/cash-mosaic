import { AuthContainer, ExtraFormLinks, FieldContainer, FormContainer, FormImageContainer, FormInput, FormTitle, StyledAuthForm } from "@/components/AuthForm/styles/styles";
import { DefaultButton } from "@/styles/GlobalStyles";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from 'next/router';
import { ChangeEvent, useState } from "react";
import { Alert, Snackbar } from "@mui/material";
import { authLogin, authSignup } from "@/services/auth";
import { useDispatch } from "react-redux";
import { logIn } from "@/store/user/actions";
import { FormValues, propTypes } from "./types";



export const AuthForm = ({ fields, title }: propTypes) => {
    const [submitRequest, setSubmitRequest] = useState({ isLoading: false, submited: false, error: false, errorMessage: "" });
    const [values, setValues] = useState<FormValues>({ firstname: "", lastname: "", email: "", password: "" });
    const router = useRouter();
    const dispatch = useDispatch()

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
            //set the submit request to loading as true
            setSubmitRequest({ ...submitRequest, isLoading: true });
            e.preventDefault();

            const response = title === "Login" ? await authLogin(values) : await authSignup(values);
            dispatch(logIn(response.data.authToken));

            // Change submit request state to show success snackbar
            setSubmitRequest({
                submited: true,
                isLoading: false,
                error: false,
                errorMessage: "",
            });

            // Redirect the user to the Dashboard after success login/signup
            setTimeout(() => {
                router.push('/dashboard');
            }, 3000);

        } catch (error: any) {
            // Change submit request state to show error snackbar
            setSubmitRequest({
                submited: false,
                isLoading: false,
                error: true,
                errorMessage: error && error.response?.data?.message || "An unknown error occurred."
            });

            // Reset request state error related info
            setTimeout(() => {
                setSubmitRequest({
                    ...submitRequest,
                    error: false,
                    errorMessage: ""
                });
            }, 8000);
        }
    };

    return (
        <AuthContainer>
            <FormContainer>
                <FormTitle>{title === "Login" ? "Log In" : "Sign-up"}</FormTitle>

                <StyledAuthForm onSubmit={handleSubmit}>
                    {fields.map((field) => (
                        <FieldContainer key={field.name} name={field.name}>
                            <label>{field.label}:</label>
                            <FormInput
                                type={field.type}
                                name={field.name}
                                value={values[field.name]}
                                onChange={(e) => onInputChange(e)}
                                autoComplete={field.autocomplete && field.autocomplete}
                                required
                            />
                        </FieldContainer>
                    ))}
                    <DefaultButton $bgColor="danger" type='submit'>{title}</DefaultButton>

                    {/* Extra links to switch between login and sign-up page */}
                    <ExtraFormLinks>
                        <p>
                            {title === "Login"
                                ? "Do not have an account?"
                                : "Already have an account?"}
                        </p>

                        <Link href={title === "Login" ? "/signup" : "/login"}>
                            {title === "Login" ? "Sign-up" : "Login"}
                        </Link>
                    </ExtraFormLinks>
                </StyledAuthForm>

                {/* Loading parap */}
                {submitRequest.isLoading && <p>Loading...</p>}

                {/* Error pop-up Snackbar */}
                <Snackbar
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                    open={submitRequest.error}
                    autoHideDuration={5000}
                >
                    <Alert severity="error">{submitRequest.errorMessage}</Alert>
                </Snackbar>
                {/* Success pop-up Snackbar */}
                <Snackbar
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                    open={submitRequest.submited && !submitRequest.error}
                    autoHideDuration={5000}
                >
                    <Alert severity="success">Successfully {title === "Login" ? "Logged in" : "Registered"}.<br /> You&apos;ll be redirected shortly.</Alert>
                </Snackbar>

            </FormContainer>

            <FormImageContainer>
                <Image src="/images/auth-img.png" alt="A tablet and a smartphone showing the Cash Mosaic App" width={748} height={982} />
            </FormImageContainer>
        </AuthContainer>
    );
};