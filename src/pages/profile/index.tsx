import React, { ChangeEvent, useState } from "react";
import { GetServerSideProps } from "next";
import { fetchProfileData } from "../api/profile";
import { User } from "@/store/types";
import * as cookie from 'cookie'
import FormFieldsContainer from "@/components/FormFieldsContainer";
import { EditButton, ProfileContainer } from "@/components/FormFieldsContainer/styles";

type ProfilePageProps = {
    user: User;
};

//TO-DO's:
//-inputs have independent edit & save & cancel buttons
//-submit logic


function ProfilePage({ user }: ProfilePageProps) {
    const [userData, setUserData] = useState({
        firstname: { value: user.firstname, isEditing: false },
        lastname: { value: user.lastname, isEditing: false },
        location: { value: user.location, isEditing: false },
        bio: { value: user.bio, isEditing: false },
        password: { value: "32FAsdhQ2", isEditing: false }
    });

    type UserDataKeys = keyof typeof userData;

    const handleEditClick = () => {
        setUserData({
            firstname: { value: user.firstname, isEditing: true },
            lastname: { value: user.lastname, isEditing: true },
            location: { value: user.location, isEditing: true },
            bio: { value: user.bio, isEditing: true },
            password: { value: "*******", isEditing: true },
        });
    };

    const handleCancelClick = () => {
        // TO-DO: Reset the field data to the original user data
        setUserData({
            firstname: { value: user.firstname, isEditing: false },
            lastname: { value: user.lastname, isEditing: false },
            location: { value: user.location, isEditing: false },
            bio: { value: user.bio, isEditing: false },
            password: { value: "32FAsdhQ2", isEditing: false },
        });
    };

    const handleFieldChange = (fieldname: UserDataKeys, e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) => {
        setUserData((prevUserData) => {
            const isEditing = prevUserData[fieldname].isEditing;
            return {
                ...prevUserData,
                [fieldname]: {
                    ...prevUserData[fieldname],
                    value: e.target.value,
                    isEditing: isEditing,
                },
            };
        });
    };

    const handleFormSubmit = async () => {
        try {
            console.log("submit")
            // Logic to update the user's profile data on the server
            // await updateProfileData(user.id, updatedData);

            // After updating on the server, update the local state
            // setUserData(updatedData);
            // setIsEditing(false);
        } catch (error) {
            console.error("Error updating profile data: ", error);
            // Handle error, show a message to the user, etc.
        }
    };

    return (
        <ProfileContainer>
            <h1>{user.firstname}&apos;s Profile</h1>

            <FormFieldsContainer
                fields={[
                    {
                        label: "First Name:",
                        type: "text",
                        name: "firstname",
                        value: userData.firstname.value,
                        isEditing: userData.firstname.isEditing
                    },
                    {
                        label: "Last Name:",
                        type: "text",
                        name: "lastname",
                        value: userData.lastname.value,
                        isEditing: userData.lastname.isEditing
                    }
                ]}
                handleFieldChange={handleFieldChange}
            />

            <FormFieldsContainer
                fields={[
                    {
                        label: "Location:",
                        type: "text",
                        name: "location",
                        value: userData.location.value,
                        isEditing: userData.location.isEditing
                    },
                    {
                        label: "Bio:",
                        type: "textarea",
                        name: "bio",
                        value: userData.bio.value,
                        isEditing: userData.bio.isEditing
                    }
                ]}
                handleFieldChange={handleFieldChange}
            />

            <FormFieldsContainer
                fields={[
                    {
                        label: "Password:",
                        type: "password",
                        name: "password",
                        value: userData.password.value,
                        isEditing: userData.password.isEditing
                    }
                ]}
                handleFieldChange={handleFieldChange}
            />

            <>
                <button onClick={handleFormSubmit}>Submit</button>
                <button onClick={handleCancelClick}>Cancel</button>
            </>
            <EditButton onClick={handleEditClick}>Edit</EditButton>
        </ProfileContainer>
    );
}

export const getServerSideProps: GetServerSideProps<ProfilePageProps> = async (context) => {
    try {
        const cookieHeader = context.req.headers.cookie;
        const parsedCookies = cookie.parse(cookieHeader!);

        if (!parsedCookies.authToken) {
            // If there is no authToken, redirect to login page
            return {
                redirect: {
                    destination: '/login',
                    permanent: false,
                },
            };
        }

        const user = await fetchProfileData(parsedCookies.authToken);

        return {
            props: {
                user,
            },
        };
    } catch (error) {
        console.error("Error in getServerSideProps: ", error);

        throw error;
    }
};

export default ProfilePage;
