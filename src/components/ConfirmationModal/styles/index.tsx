import { THEME_COLORS } from "@/styles/GlobalStyles";
import styled from "@emotion/styled"
import Popover from '@mui/material/Popover';

export const StyledPopover = styled(Popover)`

`

export const ConfimationModalText = styled.p`
    padding: 10px 20px;
`

export const ButtonsContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(2,1fr);
    gap: 10px;
    padding: 10px 40px;
    width: 100%;
`

export const ConfirmButton = styled.div`
    cursor: pointer;
    display: flex;
    justify-content: center;
    border-radius: 5px;
    padding: 5px 2px;
    background-color: ${THEME_COLORS.success};
    color: white;
    opacity: .8;

    &:hover{
        opacity: 1;
    }
`

export const CancelButton = styled(ConfirmButton)`
    background-color: ${THEME_COLORS.danger};
`