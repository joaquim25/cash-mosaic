import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setProfileInfo } from "@/store/user/actions";
import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";
import { RootState } from "@/store/types";

function ProfilePage() {
    const dispatch = useDispatch<ThunkDispatch<any, any, AnyAction>>();
    const user = useSelector((state: RootState) => state.user);

    useEffect(() => {
        const getProfileInfo = async () => {
            try {
                await dispatch(setProfileInfo());
            } catch (error) {
                console.error(error);
            }
        };

        getProfileInfo();
    }, [dispatch]);

    return (
        <div>
            <h1>ProfilePage</h1>
            <p>Name: {user.firstname}, {user.lastname}</p>
            <p>Location: {user.location || "..."}</p>
            <p>Bio: {user.bio || "..."}</p>
        </div>
    );
}

export default ProfilePage;