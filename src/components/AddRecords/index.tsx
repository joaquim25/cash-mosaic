import React, { useState } from 'react'
import { IoArrowDown, IoArrowUp, IoCalendarOutline } from "react-icons/io5";
import { AmountInput, CategoryContainer, DateInput, IncomeExpenseSelectorContainer, InputContainer } from './styles'
import { DefaultButton } from '@/styles/GlobalStyles';
import CategoriesGrid from '../CategoriesGrid';
import HydrationSafety from '../HydrationSafety/HydrationSafety';



function AddRecordsComponent() {
    const [selectedCategoryType, setSelectedCategoryType] = useState<"expenses" | "income">("expenses");

    const handleCategorySelection = (type: "expenses" | "income") => {
        setSelectedCategoryType(type);
    }

    return (
        <HydrationSafety>
            <IncomeExpenseSelectorContainer>
                <div onClick={() => handleCategorySelection("income")}>
                    <IoArrowDown />
                    <p>Income</p>
                </div>
                <div onClick={() => handleCategorySelection("expenses")}>
                    <IoArrowUp />
                    <p>Expense</p>
                </div>
            </IncomeExpenseSelectorContainer>

            <InputContainer>
                <AmountInput>
                    <label>Amount</label>
                    <input placeholder="0,00€" />
                </AmountInput>
                <DateInput>
                    <IoCalendarOutline />
                    <p>Date</p>
                </DateInput>
            </InputContainer>

            <CategoryContainer>
                <h3>Category</h3>
                <CategoriesGrid type={selectedCategoryType} />
                <DefaultButton>Add</DefaultButton>
            </CategoryContainer>

        </HydrationSafety>
    )
}

export default AddRecordsComponent