import React from "react";
import { GetServerSideProps } from "next";
import { fetchProfileData } from "../api/profile";
import { User } from "@/store/types";
import * as cookie from 'cookie'

type ProfilePageProps = {
    user: User;
};

function ProfilePage({ user }: ProfilePageProps) {
    return (
        <div>
            <h1>ProfilePage</h1>
            <p>Name: {user.firstname}, {user.lastname}</p>
            <p>Location: {user.location || "..."}</p>
            <p>Bio: {user.bio || "..."}</p>
        </div>
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
