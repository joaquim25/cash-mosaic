import React, { useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { AmountTableCell, TransactionsContainer } from './styles';
import { Alert, Pagination, PaginationItem, Snackbar, Stack } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { getAuthTokenFromCookies } from '../../../utils/cookies';
import { fetchTransactions } from '@/pages/api/transactions';
import { TransactionRecordItem } from './types';
import axios from 'axios';

type TransactionsComponentProps = {
    initialTransactions: {
        itemsReceived: number;
        currPage: number;
        nextPage: number | null;
        prevPage: number | null;
        pageTotal: number;
        items: TransactionRecordItem[]
    };
};

function TransactionsComponent({ initialTransactions }: TransactionsComponentProps) {
    const authToken = getAuthTokenFromCookies();
    const [errorStatus, setErrorStatus] = useState({ error: false, errorMessage: "" });
    const [items, setItems] = useState(initialTransactions.items);
    const [page, setPage] = useState(0);

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
                    count={initialTransactions.pageTotal}
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
    );
}

export default TransactionsComponent;
