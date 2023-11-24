/* eslint-disable react-hooks/exhaustive-deps */
import DashboardHeader from '@/components/DashboardHeader'
import DashboardTabs from '@/components/DashboardTabs'
import { User } from '@/store/types';
import { GetServerSidePropsContext, PreviewData } from 'next';
import React, { useEffect } from 'react'
import * as cookie from 'cookie'
import { fetchProfileData } from '../api/profile';
import { ParsedUrlQuery } from 'querystring';
import { setUserDashboard } from '@/store/user/actions';
import { useDispatch } from 'react-redux';

type DashboardPageProps = {
    user: User;
    totalExpenses: number;
    totalIncome: number;
    balance: number;
};

function Dashboard({ user }: DashboardPageProps) {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setUserDashboard(user));
    }, [user])

    return (
        <>
            <DashboardHeader />
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

        const user = await fetchProfileData(parsedCookies.authToken);
        setUserDashboard(user);

        return {
            props: {
                user
            },
        };
    } catch (error) {
        console.error("Error in getServerSideProps[dashboard page]: ");

        return {
            props: {
                user: {},
            },
        };
    }
};

export default Dashboard

