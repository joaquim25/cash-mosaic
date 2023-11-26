import React from 'react'
import { BalanceText, BalanceValue, HeaderContainer, HeaderOverviewContainer, OverviewExpensesSectionContainer, OverviewIncomeSectionContainer, OverviewSectionTitle, OverviewSectionValue } from './styles'
import { IoArrowDownCircleOutline, IoArrowUpCircleOutline } from "react-icons/io5";
import { User } from '@/store/types';

type DashboardHeaderProps = {
    user: User;
}

function DashboardHeader({ user }: DashboardHeaderProps) {
    const { balance, totalIncome, totalExpenses } = user;

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
                        <OverviewSectionValue>{totalExpenses ? totalExpenses.toFixed(2).replace("-", "") : "-.--"}€</OverviewSectionValue>
                    </div>

                </OverviewExpensesSectionContainer>
            </HeaderOverviewContainer>
        </HeaderContainer>
    )
}

export default DashboardHeader