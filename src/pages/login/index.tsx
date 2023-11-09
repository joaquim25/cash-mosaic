import { AuthForm } from '@/components/AuthForm';
import React from 'react'

export type Fields = {
    name: "email" | "password" | "name",
    label: string,
    type: string
}[];

function LoginPage() {
    const fields: Fields = [
        { name: "email", label: "Email", type: "email" },
        { name: "password", label: "Password", type: "password" },
    ]

    const endpoint = "https://x8ki-letl-twmt.n7.xano.io/api:8Mli9063/auth/login"

    return (
        <AuthForm
            endpoint={endpoint}
            fields={fields}
            title="Login"
        />
    )
}

export default LoginPage