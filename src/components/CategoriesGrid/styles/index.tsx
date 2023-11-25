import { THEME_COLORS } from "@/styles/GlobalStyles";
import styled from "@emotion/styled";

export const CategoriesGridContainer = styled.div`
    width: 100%;
    padding: 0 24px;
    margin-top: 30px;
    display: grid;
    row-gap: 20px;
    column-gap: 30px;
    grid-template-columns: repeat(3,1fr);
`

export const CategorieCard = styled.div <{ squareColor: string, isSelected: boolean }>`
    padding: 10px 4px;
    display: flex;
    gap: 7px;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    border-radius: 10px;
    cursor: pointer;
    max-width: 110px;
    border: 1px solid transparent;

    ${props => props.isSelected
        ?
        `
            background-color: ${props.squareColor}80;
            box-shadow: 0 0 8px 4px ${props.squareColor}40;
            border: 1px solid #FFFFFF50;
        `
        :
        `
            background-color: rgba(33,33,33,.1);
        `
    }


    & img {
        width: 40px;
        height: 40px;
        object-fit: contain;
    }

    & p {
        text-align: center;
        font-size: 10px;
        color: ${THEME_COLORS.text_prim};
    }
`