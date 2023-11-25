/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from 'react'
import { IoArrowDown, IoArrowUp } from "react-icons/io5";
import { AmountInput, CategoryContainer, DateInput, RecordTypeSelectorContainer, InputContainer, StyledDatePicker, RecordTypeIncome, RecordTypeExpense } from './styles'
import { DefaultButton } from '@/styles/GlobalStyles';
import CategoriesGrid from '../CategoriesGrid';
import HydrationSafety from '../HydrationSafety/HydrationSafety';
import CurrencyInput from 'react-currency-input-field';
import dayjs from 'dayjs';
import { addExpense, addIncome } from '@/pages/api/dashboard';
import { useDispatch } from 'react-redux';
import { User } from '@/store/types';
import { setUserDashboard } from '@/store/user/actions';

type AddRecordsComponentProps = {
    user: User;
}

function AddRecordsComponent({ user }: AddRecordsComponentProps) {
    const dispatch = useDispatch();
    const [selectedRecordType, setSelectedRecordType] = useState<"expenses" | "income">("expenses");
    const [date, setDate] = useState<string | number | dayjs.Dayjs | Date | null | undefined | unknown>(dayjs());
    const [amount, setAmount] = useState<string | undefined>();
    const [category, setCategory] = useState<string | undefined>();


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

                    setDate(dayjs());
                    setCategory(undefined);

                    break;
                default:
                    return;
            }

        } catch (error) {
            //TO-DO display a snackbar with error
            console.error(error);
        }

    }

    return (
        <HydrationSafety>
            <RecordTypeSelectorContainer>
                <RecordTypeIncome isSelected={selectedRecordType === "income"} onClick={() => onRecordTypeSelection("income")}>
                    <IoArrowDown />
                    <p>Income</p>
                </RecordTypeIncome>
                <RecordTypeExpense isSelected={selectedRecordType === "expenses"} onClick={() => onRecordTypeSelection("expenses")}>
                    <IoArrowUp />
                    <p>Expense</p>
                </RecordTypeExpense>
            </RecordTypeSelectorContainer>

            <InputContainer>
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
                        defaultValue={"0.00"}
                        decimalsLimit={2}
                        value={amount}
                        onValueChange={(value) => setAmount(value)}
                        fixedDecimalLength={2}
                        suffix='€'
                        disableAbbreviations={true}
                    />
                </AmountInput>
            </InputContainer>

            <CategoryContainer>
                <h3>Category</h3>
                <CategoriesGrid type={selectedRecordType} onCategorySelection={onCategorySelection} category={category} />
                <DefaultButton onClick={onAddRecord}>Add</DefaultButton>
            </CategoryContainer>

        </HydrationSafety>
    )
}

export default AddRecordsComponent