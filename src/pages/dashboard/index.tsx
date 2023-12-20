/* eslint-disable react/display-name */
/* eslint-disable react-hooks/exhaustive-deps */
import { RootState, User } from '@/store/types';
import { GetServerSidePropsContext, PreviewData } from 'next';
import React, { ReactNode, useEffect } from 'react'
import * as cookie from 'cookie'
import { ParsedUrlQuery } from 'querystring';
import { setUserDashboard } from '@/store/user/actions';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDashboardData } from '../../services/dashboard';
import DashboardLayout from '@/components/DashboardLayout';
import AddRecords from '@/pages-containers/AddRecords';
import axios from 'axios';
import { useRouter } from 'next/router';
import Statistics from '@/pages-containers/Statistics';
import Transactions from '@/pages-containers/Transactions';

type DashboardPageProps = {
    initialUser: User;
    statisticsData: { label: string, value: number }[];
    initialTransactions: any;
    totalExpenses: number;
    totalIncome: number;
    balance: number;
    contentType: 'dashboard' | 'statistics' | 'transactions';
};

const Dashboard = ({ initialUser /*, statisticsData, initialTransactions */ }: DashboardPageProps) => {
    const dispatch = useDispatch();
    const user = useSelector((state: RootState) => state.user);
    const router = useRouter();
    const type = router.query.type;

    useEffect(() => {
        dispatch(setUserDashboard(initialUser));
    }, []);

    let contentComponent: ReactNode;

    switch (type) {
        case 'statistics':
            contentComponent =  <Statistics />;
            break;
        case 'transactions':
            contentComponent =  <Transactions />;
            break;
        default:
            contentComponent = <AddRecords user={user} />;
            break;
    }

    return <DashboardLayout user={user}>{initialUser && contentComponent}</DashboardLayout>;
};

export const getServerSideProps: (context: GetServerSidePropsContext<ParsedUrlQuery, PreviewData>) => Promise<{ redirect?: { destination?: string; permanent?: false; }; props?: any; }> = async (context) => {
    try {
        const cookieHeader = context.req.headers.cookie || '';
        const parsedCookies = cookie.parse(cookieHeader!);

        //If authToken does not exist, redirect to login page
        if (!parsedCookies.authToken) {
            return {
                redirect: {
                    permanent: false,
                    destination: "/login",
                },
                props: {},
            };
        }

        const initialUser = await fetchDashboardData(parsedCookies.authToken);
        const contentType = context.query.type || 'dashboard';

        return {
            props: {
                initialUser,
                contentType,
            },
        };
    } catch (error) {
        console.error("Error in getServerSideProps[dashboard page]: ", error);

        //If authtoken exists but is not set by the app (therefore is invalid), redirect to login page
        if (axios.isAxiosError(error) && error.response!.status === 401) {
            return {
                redirect: {
                    permanent: false,
                    destination: "/login",
                },
                props: {},
            };
        }

        return {
            props: {
                initialUser: null,
            },
        };
    }
};

export default Dashboard

