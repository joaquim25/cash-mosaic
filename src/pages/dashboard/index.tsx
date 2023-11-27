/* eslint-disable react-hooks/exhaustive-deps */
import DashboardHeader from '@/components/DashboardHeader'
import DashboardTabs from '@/components/DashboardTabs'
import { RootState, User } from '@/store/types';
import { GetServerSidePropsContext, PreviewData } from 'next';
import React, { useEffect, useState } from 'react'
import * as cookie from 'cookie'
import { ParsedUrlQuery } from 'querystring';
import { setUserDashboard } from '@/store/user/actions';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDashboardData } from '../api/dashboard';
import { fetchDayData } from '../api/statistics';

type DashboardPageProps = {
    initialUser: User;
    statisticsData: { label: string, value: number }[];
    totalExpenses: number;
    totalIncome: number;
    balance: number;
};

function Dashboard({ initialUser, statisticsData }: DashboardPageProps) {
    const dispatch = useDispatch();
    const user = useSelector((state: RootState) => state.user);

    useEffect(() => {
        dispatch(setUserDashboard(initialUser));
    }, [])

    return (
        <>
            <DashboardHeader user={user} />
            <DashboardTabs user={user} statisticsData={statisticsData} />
        </>
    )
}

export const getServerSideProps: (context: GetServerSidePropsContext<ParsedUrlQuery, PreviewData>) => Promise<{ redirect?: { destination?: string; permanent?: false; }; props?: any; }> = async (context) => {
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

        const initialUser = await fetchDashboardData(parsedCookies.authToken);
        const statisticsData = await fetchDayData(parsedCookies.authToken);


        return {
            props: {
                initialUser,
                statisticsData: statisticsData.user_transactions
            },
        };
    } catch (error) {
        console.error("Error in getServerSideProps[dashboard page]: ", error);

        return {
            props: {
                initialUser: {},
                statisticsData: [],
            },
        };
    }
};

export default Dashboard

