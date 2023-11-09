// Login & Sign-up
export type Fields = {
    name: "email" | "password" | "firstname" | "lastname",
    label: string,
    type: string
}[];

// AuthForm
export type FormValues = {
    firstname: string,
    lastname: string,
    email: string,
    password: string
}