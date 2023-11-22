import React from 'react'
import { BalanceText, BalanceValue, HeaderContainer, HeaderOverviewContainer, OverviewExpensesSectionContainer, OverviewIncomeSectionContainer, OverviewSectionTitle, OverviewSectionValue } from './styles'
import { IoArrowDownCircleOutline, IoArrowUpCircleOutline } from "react-icons/io5";

function DashboardHeader() {
    return (
        <HeaderContainer>
            {/* TO-DO: Replace with Balance of user (getServerSideProps) */}
            <BalanceValue>5700,00€</BalanceValue>
            <BalanceText>Current Balance</BalanceText>
            <HeaderOverviewContainer>
                <OverviewIncomeSectionContainer>
                    <IoArrowDownCircleOutline />
                    <div>
                        <OverviewSectionTitle>Income</OverviewSectionTitle>
                        {/* TO-DO: Replace with General Income of user (getServerSideProps) */}
                        <OverviewSectionValue>3,000€</OverviewSectionValue>
                    </div>
                </OverviewIncomeSectionContainer>
                <OverviewExpensesSectionContainer>
                    <IoArrowUpCircleOutline />
                    <div>
                        <OverviewSectionTitle>Expenses</OverviewSectionTitle>
                        {/* TO-DO: Replace with General Expenses of user (getServerSideProps) */}
                        <OverviewSectionValue>2,400€</OverviewSectionValue>
                    </div>

                </OverviewExpensesSectionContainer>
            </HeaderOverviewContainer>
        </HeaderContainer>
    )
}

export default DashboardHeader