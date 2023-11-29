import { styled } from 'styled-components';

export const RangeSelectorContainer = styled.div`
    padding: 10px 0 40px 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 30px;

    & div {
        color: #222222;

        & label{
            color: #d1d1d1;
        }

        & fieldset {
            border: 1px solid #D6E1DF;
        }
    }

    @media(min-width: 600px){
        flex-direction: row;
    }
`

export const RangeSubmitButton = styled.button`
    box-sizing: border-box;
    background-color: #D6E1DF;
    cursor: pointer;
    padding: 10px 30px;
    border-radius: 10px;
    border: none;
    outline: none;
    transition: all .2s ease-in-out;

    &:hover{
        transform: scale(.95);
        border-radius: 16px;
        box-shadow: 0 0 7px 1px #b5b1b1;
    }

    @media(min-width: 600px){
        margin-left: 50px;
    }
`

export const StatisticsChartContainer = styled.div`
    background-color: #D6E1DF;
    border-radius: 16px;
    display: flex;
    padding: 40px 0 20px 0;

    @media (min-width: 600px){
        padding: 80px 0;
    }
`
