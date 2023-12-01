import styled from "@emotion/styled"
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

export const AddRecordsContainer = styled.div`
    padding: 0 16px;
`

export const ParametersInputContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 40px;

    @media(min-width: 768px){
        display: grid;
        grid-template-areas:
        "typeSelect date"
        "amount amount";
        max-width: 600px;
        margin: 0 auto;
    }
`

export const RecordTypeSelectorContainer = styled.div`
    margin: 20px 0 10px 0;
    display: flex;
    justify-content: center;
    gap: 50px;

    @media(min-width: 768px){
        grid-area: typeSelect;
    }
`

export const RecordTypeSelector = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 14px;
    cursor: pointer;
    padding: 10px 14px;
    transition: all .2s ease-in-out;
    border-radius: 5px;

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
`

export const RecordTypeIncome = styled(RecordTypeSelector) <{ $isSelected: boolean }>`
    ${props => props.$isSelected && `
        background-color: #90C0A750;
        border-radius: 20px;
    `}

    & svg {
        ${props => props.$isSelected && `
            color: #1B5E20;
            opacity: 1;
        `}
    }

    & p {
        ${props => props.$isSelected && `
            color: #1B5E20;
        `}
    }
`

export const RecordTypeExpense = styled(RecordTypeSelector) <{ $isSelected: boolean }>`
    ${props => props.$isSelected && `
        background-color: #FF174430;
        border-radius: 20px;
    `}

    & svg {
        ${props => props.$isSelected && `
            color: #D32F2F;
            opacity: 1;
        `}
    }

    & p {
        ${props => props.$isSelected && `
            color: #D32F2F;
        `}
    }
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
    max-width: 500px;
    margin: 0 auto;

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
        font-size: 1.2rem;
    }

    @media(min-width: 768px){
        grid-area: amount;
    }
`

export const DateInput = styled.div`
    position: relative;
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

    @media(min-width: 768px){
        grid-area: date;
    }
`

export const StyledDatePicker = styled(DatePicker)`

`

export const CategoryContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 30px auto;
    background-color: #BAC2CD70;
    border-radius: 10px;
    padding: 16px;
    max-width: 1000px;

    & h3 {
        align-self: flex-start;
        font-size: 13px;
        font-weight: 600;
        font-family: "Quicksand";
    }

    & button {
        margin-top: 60px;
        max-width: 500px;
        justify-self: center;
    }
`