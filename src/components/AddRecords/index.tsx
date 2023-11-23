import React, { useState } from 'react'
import { IoArrowDown, IoArrowUp } from "react-icons/io5";
import { AmountInput, CategoryContainer, DateInput, RecordTypeSelectorContainer, InputContainer, StyledDatePicker, RecordTypeIncome, RecordTypeExpense } from './styles'
import { DefaultButton } from '@/styles/GlobalStyles';
import CategoriesGrid from '../CategoriesGrid';
import HydrationSafety from '../HydrationSafety/HydrationSafety';
import CurrencyInput from 'react-currency-input-field';
import dayjs from 'dayjs';

function AddRecordsComponent() {
    const [selectedRecordType, setSelectedRecordType] = useState<"expenses" | "income">("expenses");
    const [selectedDate, setSelectedDate] = useState<string | number | dayjs.Dayjs | Date | null | undefined | unknown>(dayjs());
    const [amount, setAmount] = useState<string | undefined>();
    const [selectedCategory, setSelectedCategory] = useState<string | undefined>();

    const onRecordTypeSelection = (type: "expenses" | "income") => {
        setSelectedRecordType(type);
    }

    const onCategorySelection = (name: string) => {
        setSelectedCategory(name)
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
                        value={selectedDate}
                        onChange={(newValue) => setSelectedDate(newValue)}
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
                <CategoriesGrid type={selectedRecordType} onCategorySelection={onCategorySelection} selectedCategory={selectedCategory} />
                <DefaultButton>Add</DefaultButton>
            </CategoryContainer>

        </HydrationSafety>
    )
}

export default AddRecordsComponent