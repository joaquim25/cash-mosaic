/* eslint-disable react/display-name */
/* eslint-disable react-hooks/exhaustive-deps */
import * as cookie from 'cookie'
import axios from 'axios';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { GetServerSidePropsContext, PreviewData } from 'next';
import { ParsedUrlQuery } from 'querystring';
import { RootState, User } from '@/store/types';
import { fetchDayData } from '../../services/statistics';
import DashboardLayout from '@/components/DashboardLayout'
import { setUserDashboard } from '@/store/user/actions';
import DataLoadingError from '@/components/Error/DataLoading';
import Statistics from '@/pages-containers/statistics';

type StatisticsPageProps = {
    initialUser: User;
    data: { label: string, value: number }[];
};

const StatisticsPage = React.memo(({ initialUser, data }: StatisticsPageProps) => {
    const dispatch = useDispatch();
    const user = useSelector((state: RootState) => state.user);

    useEffect(() => {
        dispatch(setUserDashboard(initialUser));
    }, [])

    return (
        <DashboardLayout user={user} >
            {initialUser
                ? <Statistics data={data} />
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

        const { statisticsData, initialUser } = await fetchDayData(parsedCookies.authToken);

        return {
            props: {
                initialUser,
                data: statisticsData
            },
        };
    } catch (error) {
        console.error("Error in getServerSideProps[statistics page]: ", error);

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
                data: null,
            },
        };
    }
};

export default StatisticsPage;