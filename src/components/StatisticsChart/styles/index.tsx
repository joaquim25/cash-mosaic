import styled from "@emotion/styled"

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
    flex-direction: column;
    gap: 20px;
    align-items: center;
    padding: 20px 20px 20px 20px;

    @media (min-width: 600px){
        padding: 40px 40px;
    }
`

export const ChartGenInfo = styled.p`
    color: #333;
    text-align: center;

    & span {
        font-weight: 600;
    }
`

export const ChartLegend =  styled.ul`
    color: #333;
    display: grid;
    grid-template-columns: repeat(1, 1fr);
    grid-auto-flow: row;
    column-gap: 50px;
    row-gap: 15px;

    @media (min-width: 600px){
        grid-template-columns: repeat(2, 1fr);
    }

    @media (min-width: 768px){
        grid-template-columns: repeat(3, 1fr);
    }

    @media (min-width: 1024px){
        grid-template-columns: repeat(4, 1fr);
    }
`

export const ChartLengendItem = styled.li <{ $color: string }>`
    list-style-type: none;
    display: flex;
    height: 30px;

    & div {
        height: 20px;
        width: 20px;
        border-radius: 3px;
        background-color: ${(props) => props.$color};
        margin-right: 10px;
    }

    & span {
        font-size: .9rem;
        font-weight: 600;
        margin-right: 6px;
    }


`