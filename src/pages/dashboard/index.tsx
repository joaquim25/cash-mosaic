/* eslint-disable react-hooks/exhaustive-deps */
import { RootState, User } from '@/store/types';
import { GetServerSidePropsContext, PreviewData } from 'next';
import React, { useEffect } from 'react'
import * as cookie from 'cookie'
import { ParsedUrlQuery } from 'querystring';
import { setUserDashboard } from '@/store/user/actions';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDashboardData } from '../../services/dashboard';
import DashboardLayout from '@/components/DashboardLayout';
import AddRecords from '@/components/AddRecords';
import axios from 'axios';
import DataLoadingError from '@/components/Error/DataLoading';

type DashboardPageProps = {
    initialUser: User;
    statisticsData: { label: string, value: number }[];
    totalExpenses: number;
    totalIncome: number;
    balance: number;
};

function Dashboard({ initialUser }: DashboardPageProps) {
    const dispatch = useDispatch();
    //2. Get hold of redux user state
    const user = useSelector((state: RootState) => state.user);

    //1. populate the redux user state with the SSP info
    useEffect(() => {
        dispatch(setUserDashboard(initialUser));
    }, [])

    return (
        <DashboardLayout user={user} >
            {initialUser
                ? <AddRecords user={user} />
                : <DataLoadingError />
            }
        </DashboardLayout>
    )
}

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

        return {
            props: {
                initialUser,
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

