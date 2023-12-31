/* eslint-disable react-hooks/exhaustive-deps */
import React, { ChangeEvent, useEffect, useState } from "react";
import { GetServerSideProps } from "next";
import { changeProfileData, fetchProfileData } from "../../services/profile";
import { User } from "@/store/types";
import * as cookie from 'cookie'
import ProfileFormContainer from "@/components/ProfileFormContainer";
import { simplifyUserData } from "../../../utils";
import { useDispatch } from "react-redux";
import { setUserProfile } from "@/store/user/actions";
import { Alert, Snackbar } from "@mui/material";
import axios from "axios";
import ProfileHeader from "@/components/ProfileHeader";
import { UserData } from "@/components/ProfileFormContainer/types";

type ProfilePageProps = {
    user: User;
};

function ProfilePage({ user }: ProfilePageProps) {
    const dispatch = useDispatch();
    const [submitChangesRequestState, setSubmitChangesRequestState] = useState({ success: false, error: false, errorMessage: "" });
    // Local data to manipulate in ProfileForm
    const [userData, setUserData] = useState<UserData>({
        firstname: { value: user.firstname || "", isEditing: false },
        lastname: { value: user.lastname || "", isEditing: false },
        location: { value: user.location || "", isEditing: false },
        bio: { value: user.bio || "", isEditing: false },
        password: { value: "", isEditing: false },
    });

    // Set the global user state
    useEffect(() => {
        dispatch(setUserProfile(user))
    }, [])



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
                // Return to previous values
                if (fieldname === "password") {
                    setUserData((prevUserData) => ({
                        ...prevUserData,
                        [fieldname]: {
                            ...prevUserData[fieldname],
                            value: "",
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

    const submitChanges = async (e:any) => {
        e.preventDefault();
        const newUserData = simplifyUserData(userData);
        try {
            const response = await changeProfileData(user.id, newUserData);
            //update the user local state
            dispatch(setUserProfile(response));
            //show a success message
            setSubmitChangesRequestState(
                {
                    ...submitChangesRequestState,
                    success: true,
                }
            )
            setTimeout(() => {
                setSubmitChangesRequestState(
                    {
                        ...submitChangesRequestState,
                        success: false,
                    }
                )
            }, 3000);
        } catch (error) {
            console.error("Error updating profile data: ", error);
            //show an error message
            if (axios.isAxiosError(error)) {
                setSubmitChangesRequestState(
                    {
                        ...submitChangesRequestState,
                        error: true,
                        errorMessage: error!.response?.data?.message
                    }
                )
            } else {
                setSubmitChangesRequestState(
                    {
                        ...submitChangesRequestState,
                        error: true,
                        errorMessage: "Sorry, an error ocurred."
                    }
                )
            }

            setTimeout(() => {
                setSubmitChangesRequestState(
                    {
                        ...submitChangesRequestState,
                        error: false,
                        errorMessage: "",
                    }
                )
            }, 4000);
        }
    };

    const cancelChanges = () => {
        setUserData({
            firstname: { value: user.firstname || "", isEditing: false },
            lastname: { value: user.lastname || "", isEditing: false },
            location: { value: user.location || "", isEditing: false },
            bio: { value: user.bio || "", isEditing: false },
            password: { value: "", isEditing: false },
        })
    }

    return (
        <>
            <ProfileHeader />

            <ProfileFormContainer
                userData={userData}
                handleFieldChange={handleFieldChange}
                handleEditActionField={handleEditActionField}
                cancelChanges={cancelChanges} submitChanges={submitChanges}
            />

            <Snackbar
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                open={submitChangesRequestState.error}
                autoHideDuration={3000}
            >
                <Alert severity="error">{submitChangesRequestState.errorMessage}</Alert>
            </Snackbar>

            <Snackbar
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                open={submitChangesRequestState.success}
                autoHideDuration={4000}
            >
                <Alert severity="success">Success!! Your profile changes were sent!</Alert>
            </Snackbar>
        </>
    );
}

export const getServerSideProps: GetServerSideProps<ProfilePageProps> = async (context) => {
    try {
        const cookieHeader = context.req.headers.cookie || '';
        const parsedCookies = cookie.parse(cookieHeader!);

        if (!parsedCookies.authToken) {
            // If there is no authToken, redirect to login page

            return {
                redirect: {
                    permanent: false,
                    destination: "/login",
                },
                props: {},
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
