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
    // TO-DO: update the user global state so it holds the correct transactions
    // & dispatch an action to the global user state at each user input as well
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setUserDashboard(user));
    }, [])



    return (
        <>
            <DashboardHeader />
            <DashboardTabs />
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
        setUserDashboard(user); //change

        // // Calculate total expenses
        // const totalExpenses = getTotalExpenses(user);

        // // Calculate total income
        // const totalIncome = getTotalIncome(user);

        // // Calculate total balance
        // const balance = totalIncome - totalExpenses;

        return {
            props: {
                user,
                // totalExpenses,
                // totalIncome,
                // balance,
            },
        };
    } catch (error) {
        console.error("Error in getServerSideProps[dashboard page]: ", error);

        return {
            props: {
                user: {},
            },
        };
    }
};

export default Dashboard

