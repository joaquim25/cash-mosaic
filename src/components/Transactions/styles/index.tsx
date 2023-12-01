import styled from "@emotion/styled"
import TableCell from '@mui/material/TableCell';

export const TransactionsContainer = styled.div`
    padding: 0 24px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 30px;
    max-width: 700px;
    margin: 0 auto;
`

export const AmountTableCell = styled(TableCell) <{ $isIncome: boolean }>`
    font-weight: 600;

    ${props => props.$isIncome
        ?
        `
            color: green;
        `
        :
        `
            color: red;
        `
    }
`