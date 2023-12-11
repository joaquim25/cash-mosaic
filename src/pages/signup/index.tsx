import * as cookie from 'cookie'

import { GetServerSidePropsContext, PreviewData } from 'next';
import { ParsedUrlQuery } from 'querystring';
import { useDispatch } from 'react-redux';
import { cleanUser } from '@/store/user/actions';
import { Fields } from '@/pages-containers/AuthForm/types';
import { AuthForm } from '@/pages-containers/AuthForm';

type SignupPageProps = {
    isLogged: boolean;
}

function SignupPage({ isLogged }: SignupPageProps) {
    const dispatch = useDispatch();
    if (!isLogged) {
        dispatch(cleanUser())
    }


    const fields: Fields = [
        { name: "firstname", label: "First Name", type: "text" },
        { name: "lastname", label: "Last Name", type: "text" },
        { name: "email", label: "Email", type: "email", autocomplete: "email" },
        { name: "password", label: "Password", type: "password", autocomplete: "new-password" },
    ]

    return (
        <AuthForm
            fields={fields}
            title="Signup"
        />
    )
}

export const getServerSideProps = (context: GetServerSidePropsContext<ParsedUrlQuery, PreviewData>) => {
    // In case of token expiration, will trigger redux logOut action
    const cookieHeader = context.req.headers.cookie || '';
    const parsedCookies = cookie.parse(cookieHeader!);

    if (!parsedCookies.authToken) {
        return {
            props: {
                isLogged: false
            }
        }
    } else {
        return {
            props: {
                isLogged: true
            }
        }
    }
}

export default SignupPage;