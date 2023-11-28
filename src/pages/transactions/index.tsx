/* eslint-disable react-hooks/exhaustive-deps */
import DashboardLayout from '@/components/DashboardLayout'
import TransactionsComponent from '@/components/Transactions'
import React, { useEffect } from 'react'
import { fetchDashboardData } from '../api/dashboard';
import * as cookie from 'cookie'
import { useDispatch, useSelector } from 'react-redux';
import { RootState, User } from '@/store/types';
import { setUserDashboard } from '@/store/user/actions';
import { GetServerSidePropsContext, PreviewData } from 'next';
import { ParsedUrlQuery } from 'querystring';
import { fetchTransactions } from '../api/transactions';

type TransactionsPageProps = {
    initialUser: User;
    transactions_list: any;
};

function Transactions({ initialUser, transactions_list }: TransactionsPageProps) {
    const dispatch = useDispatch();
    const user = useSelector((state: RootState) => state.user);

    useEffect(() => {
        dispatch(setUserDashboard(initialUser));
    }, [])

    return (
        <DashboardLayout user={user} >
            <TransactionsComponent initialTransactions={transactions_list} />
        </DashboardLayout>
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

        // const initialUser = await fetchDashboardData(parsedCookies.authToken);
        const { transactions_list, initialUser } = await fetchTransactions(parsedCookies.authToken)


        return {
            props: {
                initialUser,
                transactions_list
            },
        };
    } catch (error) {
        console.error("Error in getServerSideProps[dashboard page]: ", error);

        return {
            props: {
                initialUser: null,
                transactions_list: null
            },
        };
    }
};

export default Transactions