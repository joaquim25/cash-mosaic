import { THEME_COLORS } from "@/styles/GlobalStyles";
import styled from "@emotion/styled";

export const IncomeExpenseSelectorContainer = styled.div`
    margin: 20px 0 10px 0;
    display: flex;
    justify-content: center;
    gap: 50px;

    & div {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 14px;

        & svg {
            color: #4A5050;
            width: 16px;
            height: 16px;
            opacity: .8;
        }

        & p {
            color: #A4A5A5;
            font-size: 11px;
        }
    }
`

export const InputContainer = styled.div`
    display: flex;
    gap: 40px;
`

export const AmountInput = styled.div`
    flex: 1 0 auto;
    display: flex;
    gap: 10px;
    flex-direction: column;
    align-items: center;
    background-color: #C6C5C5;
    padding: 3px 10px 6px 10px;
    border-radius: 5px;

    & label {
        font-size: 9px;
        color: #7E7676;
    }

    & input {
        background-color: transparent;
        border: none;
        outline: none;
        width: 100%;
        padding: 4px 0;

        text-align: center;
    }
`

export const DateInput = styled.div`
    flex: 0 1 70px;
    display: flex;
    gap: 2px;
    flex-direction: column;
    align-items: center;
    justify-content: flex-end;
    cursor: pointer;

    & svg {
        width: 40px;
        height: 40px;
        color: #565555;
    }

    & p {
        font-size: 10px;
        color: #7E7676;
    }
`

export const CategoryContainer = styled.div`
    margin: 30px 0;
    background-color: ${THEME_COLORS.green_normal};
    border-radius: 20px;
    padding: 16px;

    & h3 {
        font-size: 13px;
        font-weight: 600;
        font-family: "Quicksand";
    }
`