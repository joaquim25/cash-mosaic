import { AuthForm } from '@/components/AuthForm';
import { Fields } from '@/components/AuthForm/types';
import { GetServerSidePropsContext, PreviewData } from 'next';
import { ParsedUrlQuery } from 'querystring';
import * as cookie from 'cookie'
import React from 'react'
import { useDispatch } from 'react-redux';
import { cleanUser } from '@/store/user/actions';

type LoginPageProps = {
    isLogged: boolean;
}

function LoginPage({ isLogged }: LoginPageProps) {
    const dispatch = useDispatch();
    if (!isLogged) {
        dispatch(cleanUser())
    }

    const fields: Fields = [
        { name: "email", label: "Email", type: "email", autocomplete: "email" },
        { name: "password", label: "Password", type: "password", autocomplete: "current-password" },
    ]

    return (
        <AuthForm
            fields={fields}
            title="Login"
        />
    )
}

export const getServerSideProps = (context: GetServerSidePropsContext<ParsedUrlQuery, PreviewData>) => {
    // In case of token expiration, will trigger redux cleanUser action
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

export default LoginPage;
