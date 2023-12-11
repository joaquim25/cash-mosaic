/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from 'react'
import { IoArrowDown, IoArrowUp } from "react-icons/io5";
import { PiCurrencyEurBold } from "react-icons/pi";
import { AmountInput, CategoryContainer, DateInput, RecordTypeSelectorContainer, ParametersInputContainer, StyledDatePicker, RecordTypeIncome, RecordTypeExpense, AddRecordsContainer, CurrencyIconContainer } from './styles'
import { DefaultButton } from '@/styles/GlobalStyles';
import CategoriesGrid from '../../components/CategoriesGrid';
import HydrationSafety from '../../components/HydrationSafety/HydrationSafety';
import CurrencyInput from 'react-currency-input-field';
import dayjs from 'dayjs';
import { addExpense, addIncome } from '@/services/dashboard';
import { useDispatch } from 'react-redux';
import { User } from '@/store/types';
import { setUserDashboard } from '@/store/user/actions';
import axios from 'axios';
import { Alert, Snackbar } from '@mui/material';

type AddRecordsProps = {
    user: User;
}

function AddRecords({ user }: AddRecordsProps) {
    const dispatch = useDispatch();
    // record type selections, date, amount, category
    const [selectedRecordType, setSelectedRecordType] = useState<"expenses" | "income">("expenses");
    const [date, setDate] = useState<string | number | dayjs.Dayjs | Date | null | undefined | unknown>(dayjs());
    const [amount, setAmount] = useState<string | undefined>();
    const [category, setCategory] = useState<string | undefined>();
    // submit record state
    const [submitRecordRequestState, setSubmitRecordRequestState] = useState({ success: false, error: false, errorMessage: "" });


    const onRecordTypeSelection = (type: "expenses" | "income") => {
        setSelectedRecordType(type);
    }

    const onCategorySelection = (name: string) => {
        setCategory(name)
    }

    const onAddRecord = async () => {
        //prepare data for post request
        const user_id = user.id;
        const params = { user_id, date, amount, category }
        let newUser;

        try {
            const parsedAmount = parseFloat(amount!.replace(',', '.'));
            if (parsedAmount === 0) {
                throw (Error("missing param: amount"))
            }

            if(!category){
                throw (Error("missing param: category"))
            }

            switch (selectedRecordType) {
                case "income":
                    // Post request on cashMosaic-transactions_income table
                    const responseIncome = await addIncome(params);

                    // Modify the local user state accordingly
                    // 1. prepare data of the new record
                    const newIncomeRecord = {
                        id: responseIncome.data.id,
                        date: responseIncome.data.date,
                        amount: responseIncome.data.amount,
                        category: responseIncome.data.category
                    }

                    // 2. Create a newUser object with the updated transactions_income property
                    newUser = {
                        ...user,
                        transactions: [...user.transactions!, newIncomeRecord]
                    }

                    // 3. Dispatch an action that updates the global state and calcultate the new totalIncome, totalExpenses, balance values
                    dispatch(setUserDashboard(newUser));

                    setSubmitRecordRequestState(
                        {
                            ...submitRecordRequestState,
                            success: true,
                        }
                    )

                    setTimeout(() => {
                        setSubmitRecordRequestState(
                            {
                                ...submitRecordRequestState,
                                success: false,
                            }
                        )
                    }, 3000);

                    setAmount("0,00");
                    setDate(dayjs());
                    setCategory(undefined);

                    break;
                case "expenses":
                    // Post request on cashMosaic-transactions_expenses table
                    const responseExpense = await addExpense(params);

                    // Modify the local user state accordingly
                    // 1. prepare data of the new record
                    const newExpenseRecord = {
                        id: responseExpense.data.id,
                        date: responseExpense.data.date,
                        amount: responseExpense.data.amount,
                        category: responseExpense.data.category
                    }

                    // 2. Create a newUser object with the updated transactions_income property
                    newUser = {
                        ...user,
                        transactions: [...user.transactions!, newExpenseRecord]
                    }

                    // 3. Dispatch an action that updates the global state and calcultate the new totalIncome, totalExpenses, balance values
                    dispatch(setUserDashboard(newUser));

                    setSubmitRecordRequestState(
                        {
                            ...submitRecordRequestState,
                            success: true,
                        }
                    )

                    setTimeout(() => {
                        setSubmitRecordRequestState(
                            {
                                ...submitRecordRequestState,
                                success: false,
                            }
                        )
                    }, 3000);

                    setAmount("0,00");
                    setDate(dayjs());
                    setCategory(undefined);

                    break;
                default:
                    return;
            }

        } catch (error) {
            let parsedAmount;
            if (typeof amount !== "undefined") {
                parsedAmount = parseFloat(amount.replace(',', '.'));
            } else {
                parsedAmount = null;
            }

            if (parsedAmount === 0 || parsedAmount === null) {
                setSubmitRecordRequestState(
                    {
                        ...submitRecordRequestState,
                        error: true,
                        errorMessage: "Sorry, Amount should be greater than 0."
                    }
                )
            } else if (typeof category === "undefined") {
                setSubmitRecordRequestState(
                    {
                        ...submitRecordRequestState,
                        error: true,
                        errorMessage: "Sorry, Please select a Category."
                    }
                )
            }
            else if (axios.isAxiosError(error) && error.response!.status === 429) {
                setSubmitRecordRequestState(
                    {
                        ...submitRecordRequestState,
                        error: true,
                        errorMessage: "Sorry, you can only add 10 Records per 20 Seconds"
                    }
                )
            }
            else if (axios.isAxiosError(error)) {
                setSubmitRecordRequestState(
                    {
                        ...submitRecordRequestState,
                        error: true,
                        errorMessage: error!.response?.data?.message
                    }
                )
            } else {
                setSubmitRecordRequestState(
                    {
                        ...submitRecordRequestState,
                        error: true,
                        errorMessage: "Sorry, an error ocurred."
                    }
                )
            }

            setTimeout(() => {
                setSubmitRecordRequestState(
                    {
                        ...submitRecordRequestState,
                        error: false,
                        errorMessage: "",
                    }
                )
            }, 4000);
        }

    }

    return (
        <HydrationSafety>
            <AddRecordsContainer>
                <ParametersInputContainer>
                    <RecordTypeSelectorContainer>
                        <RecordTypeIncome $isSelected={selectedRecordType === "income"} onClick={() => onRecordTypeSelection("income")}>
                            <IoArrowDown />
                            <p>Income</p>
                        </RecordTypeIncome>
                        <RecordTypeExpense $isSelected={selectedRecordType === "expenses"} onClick={() => onRecordTypeSelection("expenses")}>
                            <IoArrowUp />
                            <p>Expense</p>
                        </RecordTypeExpense>
                    </RecordTypeSelectorContainer>

                    <DateInput>
                        <StyledDatePicker label="Date"
                            value={date}
                            onChange={(newValue) => setDate(newValue)}
                            defaultValue={dayjs()}
                        />
                    </DateInput>
                    <AmountInput>
                        <label>Amount</label>
                        <CurrencyInput
                            id="input-amount"
                            name="amount"
                            defaultValue={""}
                            decimalsLimit={2}
                            value={amount}
                            onValueChange={(value) => setAmount(value)}
                            disableAbbreviations={true}
                            allowDecimals={true}
                            placeholder={'0,00'}
                            autoComplete={'off'}
                        />
                        <CurrencyIconContainer>
                            <PiCurrencyEurBold />
                        </CurrencyIconContainer>
                    </AmountInput>
                </ParametersInputContainer>

                <CategoryContainer>
                    <h3>Category</h3>
                    <CategoriesGrid type={selectedRecordType} onCategorySelection={onCategorySelection} category={category} />
                    <DefaultButton onClick={onAddRecord}>Add</DefaultButton>
                </CategoryContainer>
            </AddRecordsContainer>

            <Snackbar
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                open={submitRecordRequestState.error}
                autoHideDuration={3000}
            >
                <Alert severity="error">{submitRecordRequestState.errorMessage}</Alert>
            </Snackbar>

            <Snackbar
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                open={submitRecordRequestState.success}
                autoHideDuration={4000}
            >
                <Alert severity="success">Success!! Your new record was created!</Alert>
            </Snackbar>
        </HydrationSafety>
    )
}

export default AddRecords;