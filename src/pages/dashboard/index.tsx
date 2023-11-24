/* eslint-disable react-hooks/exhaustive-deps */
import DashboardHeader from '@/components/DashboardHeader'
import DashboardTabs from '@/components/DashboardTabs'
import { RootState, User } from '@/store/types';
import { GetServerSidePropsContext, PreviewData } from 'next';
import React, { useEffect } from 'react'
import * as cookie from 'cookie'
import { fetchProfileData } from '../api/profile';
import { ParsedUrlQuery } from 'querystring';
import { setUserDashboard } from '@/store/user/actions';
import { useDispatch, useSelector } from 'react-redux';

type DashboardPageProps = {
    initialUser: User;
    totalExpenses: number;
    totalIncome: number;
    balance: number;
};

function Dashboard({ initialUser }: DashboardPageProps) {
    const dispatch = useDispatch();
    const user = useSelector((state: RootState) => state.user);

    useEffect(() => {
        dispatch(setUserDashboard(initialUser));
    }, [])

    return (
        <>
            <DashboardHeader user={user} />
            <DashboardTabs user={user} />
        </>
    )
}

export const getServerSideProps: (context: GetServerSidePropsContext<ParsedUrlQuery, PreviewData>) => Promise<{ redirect?: { destination?: string; permanent?: false; }; props?: any; }> = async (context) => {
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

        const initialUser = await fetchProfileData(parsedCookies.authToken);

        return {
            props: {
                initialUser
            },
        };
    } catch (error) {
        console.error("Error in getServerSideProps[dashboard page]: ");

        return {
            props: {
                initialUser: {},
            },
        };
    }
};

export default Dashboard

