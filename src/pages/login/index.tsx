import { AuthForm } from '@/components/AuthForm';
import { Fields } from '@/types';
import React from 'react'



function LoginPage() {
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

export default LoginPage;