/* eslint-disable react/display-name */
/* eslint-disable react-hooks/exhaustive-deps */
import DashboardLayout from '@/components/DashboardLayout'
import React, { useEffect } from 'react'
import * as cookie from 'cookie'
import { useDispatch, useSelector } from 'react-redux';
import { RootState, User } from '@/store/types';
import { setUserDashboard } from '@/store/user/actions';
import { GetServerSidePropsContext, PreviewData } from 'next';
import { ParsedUrlQuery } from 'querystring';
import { fetchTransactions } from '../../services/transactions';
import DataLoadingError from '@/components/Error/DataLoading';
import axios from 'axios';
import { TransactionRecordItem } from '@/pages-containers/transactions/types';
import Transactions from '@/pages-containers/transactions';

type TransactionsPageProps = {
    initialUser: User;
    transactions_list: {
        itemsReceived: number;
        currPage: number;
        nextPage: number | null;
        prevPage: number | null;
        pageTotal: number;
        items: TransactionRecordItem[]
    };
};


const TransactionsPage = React.memo(({ initialUser, transactions_list }: TransactionsPageProps) => {
    const dispatch = useDispatch();
    const user = useSelector((state: RootState) => state.user);

    useEffect(() => {
        dispatch(setUserDashboard(initialUser));
    }, [])

    return (
        <DashboardLayout user={user} >
            {initialUser
                ? <Transactions initialTransactions={transactions_list} />
                : <DataLoadingError />
            }
        </DashboardLayout>
    )
});


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

        const { transactions_list, initialUser } = await fetchTransactions(parsedCookies.authToken)


        return {
            props: {
                initialUser,
                transactions_list
            },
        };
    } catch (error) {
        console.error("Error in getServerSideProps[transactions]: ", error);

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
                transactions_list: null
            },
        };
    }
};

export default TransactionsPage;