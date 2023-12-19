/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/display-name */
import React, { useEffect, useState } from 'react';
import { AmountTableCell, TransactionsContainer } from './styles';
import { getAuthTokenFromCookies } from '../../../utils/cookies';
import { fetchTransactions } from '@/services/transactions';
import { TransactionRecordItem } from './types';
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Alert, Pagination, PaginationItem, Snackbar, Stack } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import DataLoadingError from '@/components/Error/DataLoading';

function Transactions() {
    const authToken = getAuthTokenFromCookies();
    const [errorStatus, setErrorStatus] = useState({ error: false, errorMessage: "" });
    const [page, setPage] = useState(0);
    const [pageTotal, setPageTotal] = useState(0)
    const [items, setItems] = useState<TransactionRecordItem[] | undefined>(undefined);
    const [fetchError, setFetchError] = useState(false);


    useEffect(() => {
        const fetchData = async () => {
            try {
                if (typeof authToken === "string") {
                    const { transactions_list } = await fetchTransactions(authToken)
                    setItems(transactions_list.items)
                    setPageTotal(transactions_list.pageTotal)
                }

            } catch (error) {
                console.log(error);
                setFetchError(true);
            }
        }

        fetchData();
    }, [])

    const handlePageChange = async (event: React.ChangeEvent<unknown>, value: number) => {
        try {
            const response = await fetchTransactions(authToken, value);
            setItems(response.transactions_list.items)
            setPage(value)
        } catch (error) {
            if (axios.isAxiosError(error) && error.response?.status === 429) {
                setErrorStatus({
                    error: true,
                    errorMessage: "You can only make 10 requests every 20 Seconds, wait a few moments and try again."
                })
            } else {
                setErrorStatus({
                    error: true,
                    errorMessage: "An unknown Error ocurred. Refresh and try again."
                })
            }

            setTimeout(() => {
                setErrorStatus(
                    {
                        error: false,
                        errorMessage: "",
                    }
                )
            }, 4000);
        }
    }


    return (
        <>
        {items && (
            <TransactionsContainer>
                <TableContainer sx={{ borderRadius: "10px" }} component={Paper} elevation={5} >
                    <Table>
                        <TableHead sx={{ backgroundColor: "#c7c2c29c" }}>
                            <TableRow>
                                <TableCell sx={{ fontWeight: "600", textAlign: "center" }}>Date</TableCell>
                                <TableCell sx={{ fontWeight: "600", textAlign: "right" }}>Amount</TableCell>
                                <TableCell sx={{ fontWeight: "600", textAlign: "center" }}>Category</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody sx={{ backgroundColor: "#33333315" }}>
                            {items.map((item: TransactionRecordItem) => (
                                <TableRow key={item.id}>
                                    <TableCell sx={{ textAlign: "center" }}>{item.date}</TableCell>
                                    <AmountTableCell $isIncome={item.amount > 0} sx={{ textAlign: "right" }}>{item.amount.toFixed(2)}€</AmountTableCell>
                                    <TableCell sx={{ textAlign: "center" }}>{item.category}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <Stack spacing={1}>
                    <Pagination
                        count={pageTotal}
                        onChange={handlePageChange}
                        renderItem={(item) => (
                            <PaginationItem
                                slots={{ previous: ArrowBackIcon, next: ArrowForwardIcon }}
                                {...item}
                            />
                        )}
                    />
                </Stack>
                <Snackbar
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                    open={errorStatus.error}
                    autoHideDuration={3000}
                >
                    <Alert severity="error">{errorStatus.errorMessage}</Alert>
                </Snackbar>
            </TransactionsContainer>
        )}
        {fetchError && <DataLoadingError />}
        </>
    );
};

export default Transactions;
