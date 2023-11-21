import React, { ChangeEvent, useState } from "react";
import { GetServerSideProps } from "next";
import { fetchProfileData } from "../api/profile";
import { User } from "@/store/types";
import * as cookie from 'cookie'
import ProfileFormContainer from "@/components/ProfileFormContainer";

type ProfilePageProps = {
    user: User;
};

//TO-DO's:
//-submit logic


function ProfilePage({ user }: ProfilePageProps) {
    const [userData, setUserData] = useState({
        firstname: { value: user.firstname, isEditing: false },
        lastname: { value: user.lastname, isEditing: false },
        location: { value: user.location, isEditing: false },
        bio: { value: user.bio, isEditing: false },
        password: { value: "password", isEditing: false },
    });

    type UserDataKeys = keyof typeof userData;

    const handleFieldChange = (
        fieldname: UserDataKeys,
        e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>
    ) => {
        setUserData((prevUserData) => ({
            ...prevUserData,
            [fieldname]: {
                ...prevUserData[fieldname],
                value: e.target.value,
            },
        }));
    };

    const handleEditActionField = (action: "edit" | "save" | "dismiss", fieldname: UserDataKeys) => {
        switch (action) {
            case "edit":
                setUserData((prevUserData) => ({
                    ...prevUserData,
                    [fieldname]: {
                        ...prevUserData[fieldname],
                        isEditing: true,
                    },
                }));
                break;
            case "save":
                setUserData((prevUserData) => ({
                    ...prevUserData,
                    [fieldname]: {
                        ...prevUserData[fieldname],
                        isEditing: false,
                    },
                }));
                break;
            case "dismiss":
                //return to prevValue
                if (fieldname === "password") {
                    setUserData((prevUserData) => ({
                        ...prevUserData,
                        [fieldname]: {
                            ...prevUserData[fieldname],
                            value: "password",
                            isEditing: false,
                        },
                    }));
                } else {
                    setUserData((prevUserData) => ({
                        ...prevUserData,
                        [fieldname]: {
                            ...prevUserData[fieldname],
                            value: user[fieldname],
                            isEditing: false,
                        },
                    }));
                }
                break;
            default:
                return;
        }
    }

    const submitChanges = async () => {
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

    const cancelChanges = () => {
        setUserData({
            firstname: { value: user.firstname, isEditing: false },
            lastname: { value: user.lastname, isEditing: false },
            location: { value: user.location, isEditing: false },
            bio: { value: user.bio, isEditing: false },
            password: { value: "password", isEditing: false },
        })
    }

    return (
        <>
            <h1>{user.firstname}&apos;s Profile</h1>

            <ProfileFormContainer userData={userData} handleFieldChange={handleFieldChange} handleEditActionField={handleEditActionField} />
        </>
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
        console.error("Error in getServerSideProps[profile page]: ", error);

        return {
            props: {
                user: {},
            },
        };
    }
};

export default ProfilePage;
