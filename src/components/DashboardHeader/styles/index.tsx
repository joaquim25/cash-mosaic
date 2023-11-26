import { THEME_COLORS } from "@/styles/GlobalStyles";
import styled from "@emotion/styled";

export const HeaderContainer = styled.div`
    background-color: #555;
    background-image: url("/images/dashboardHeader-fadeBg.png");
    background-blend-mode: color-dodge;
    background-position: 10% 50%;
    background-size: cover;
    padding: 100px 24px 24px 24px;
    position: relative;
    margin-top: -70px;
    z-index: -99;
    border-radius: 0 0 24px 24px;
`

export const BalanceValue = styled.p`
    font-size: 22px;
    font-weight: 400;
    color: ${THEME_COLORS.white};
    margin-bottom: 8px;
`

export const BalanceText = styled.p`
    color: ${THEME_COLORS.white};
    font-size: 14px;
    font-weight: 200;
    opacity: .8;
`

export const HeaderOverviewContainer = styled.div`
    background-color: #FAFAFA;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 91px;
    border-radius: 14px;
    margin-top: 40px;

    @media (min-width: 1024px){
        max-width: 400px;
    }
`

export const OverviewIncomeSectionContainer = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;

    & svg {
        width: 26px;
        height: 26px;
        color: #02A8B9;
    }
`

export const OverviewExpensesSectionContainer = styled(OverviewIncomeSectionContainer)`
    border-left: 2px solid #F6F4F4;

    & svg {
        color: #4A5050;
    }
`

export const OverviewSectionTitle = styled.p`
    font-size: 16px;
    color: ${THEME_COLORS.grey_text};
    margin-bottom: 6px;
`

export const OverviewSectionValue = styled.p`
    font-size: 18px;
`