export type propTypes = {
    fields: Fields,
    title: string
}

export type FormValues = {
    firstname: string,
    lastname: string,
    email: string,
    password: string
}

export type Fields = {
    name: "email" | "password" | "firstname" | "lastname",
    label: string,
    type: string,
    autocomplete?: string
}[];