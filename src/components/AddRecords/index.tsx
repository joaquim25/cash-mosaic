/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from 'react'
import { IoArrowDown, IoArrowUp } from "react-icons/io5";
import { AmountInput, CategoryContainer, DateInput, RecordTypeSelectorContainer, InputContainer, StyledDatePicker, RecordTypeIncome, RecordTypeExpense } from './styles'
import { DefaultButton } from '@/styles/GlobalStyles';
import CategoriesGrid from '../CategoriesGrid';
import HydrationSafety from '../HydrationSafety/HydrationSafety';
import CurrencyInput from 'react-currency-input-field';
import dayjs from 'dayjs';
import { addIncome } from '@/pages/api/dashboard';
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
        try {
            switch (selectedRecordType) {
                case "income":
                    //prepare data for post request
                    const cashmosaic_user_id = user.id;
                    const params = { cashmosaic_user_id, date, amount, category }
                    //post request on cashMosaic-transactions_income table
                    const response = await addIncome(params);


                    //Modify the local user state accordingly
                    const newIncomeRecord = {
                        id: response.data.cashmosaic_user_id,
                        date: response.data.date,
                        amount: response.data.amount,
                        category: response.data.category
                    }

                    //update the icome transactions object
                    const newUser = {
                        ...user,
                        transactions_income: [...user.transactions_income!, newIncomeRecord]
                    }

                    //dispatch an action that updates the totalIncome, totalExpenses, balance and transaction_income array
                    dispatch(setUserDashboard(newUser));
                    break;
                case "expenses":


                    break;
                default:
                    return;
            }

        } catch (error) {
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