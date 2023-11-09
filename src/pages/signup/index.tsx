import { AuthForm } from '@/components/AuthForm';
import { Fields } from '@/types';
import React from 'react'



function SignupPage() {
    const fields: Fields = [
        { name: "firstname", label: "First Name", type: "text" },
        { name: "lastname", label: "Last Name", type: "text" },
        { name: "email", label: "Email", type: "email" },
        { name: "password", label: "Password", type: "password" },
    ]

    return (
        <AuthForm
            fields={fields}
            title="Signup"
        />
    )
}

export default SignupPage;