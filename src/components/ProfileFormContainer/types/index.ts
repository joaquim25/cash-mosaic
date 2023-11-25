import { ChangeEvent } from "react";

export type UserData = {
    firstname: { value: string; isEditing: boolean };
    lastname: { value: string; isEditing: boolean };
    location: { value: string; isEditing: boolean };
    bio: { value: string; isEditing: boolean };
    password: { value: string; isEditing: boolean };
};

export type FieldChangeProps = (
    fieldname: 'firstname' | 'lastname' | 'location' | 'bio' | 'password',
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>
) => void;

export type EditActionFieldProps = (action: "edit" | "save" | "dismiss", fieldname: "firstname" | "lastname" | "location" | "bio" | "password") => void;