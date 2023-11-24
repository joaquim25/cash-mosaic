import React from 'react'
import { BalanceText, BalanceValue, HeaderContainer, HeaderOverviewContainer, OverviewExpensesSectionContainer, OverviewIncomeSectionContainer, OverviewSectionTitle, OverviewSectionValue } from './styles'
import { IoArrowDownCircleOutline, IoArrowUpCircleOutline } from "react-icons/io5";
import { RootState } from '@/store/types';
import { useSelector } from 'react-redux';

function DashboardHeader() {
    const { balance, totalIncome, totalExpenses } = useSelector((state: RootState) => state.user);

    return (
        <HeaderContainer>
            <BalanceValue>{balance ? balance.toFixed(2) : "-.--"}€</BalanceValue>
            <BalanceText>Current Balance</BalanceText>
            <HeaderOverviewContainer>
                <OverviewIncomeSectionContainer>
                    <IoArrowDownCircleOutline />
                    <div>
                        <OverviewSectionTitle>Income</OverviewSectionTitle>
                        <OverviewSectionValue>{totalIncome ? totalIncome.toFixed(2) : "-.--"}€</OverviewSectionValue>
                    </div>
                </OverviewIncomeSectionContainer>
                <OverviewExpensesSectionContainer>
                    <IoArrowUpCircleOutline />
                    <div>
                        <OverviewSectionTitle>Expenses</OverviewSectionTitle>
                        <OverviewSectionValue>{totalExpenses ? totalExpenses.toFixed(2) : "-.--"}€</OverviewSectionValue>
                    </div>

                </OverviewExpensesSectionContainer>
            </HeaderOverviewContainer>
        </HeaderContainer>
    )
}

export default DashboardHeader