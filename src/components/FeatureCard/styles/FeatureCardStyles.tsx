import styled from "@emotion/styled"
import { THEME_COLORS } from "../../../styles/GlobalStyles";

export const CardContainer = styled.div <{ size: string; $bgColor: string }>`
    border-radius: 24px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    background-color: ${props => props.$bgColor}55;
    max-width: 200px;
    max-height: 190px;
    position: relative;
    box-shadow: 0px 3px 8px rgba(0,0,0,.4);
    padding: 10px 0;

    ${({ size }) => (
        size === "small"
            ? `flex: 0 1 40%; max-height: 120px;`
            : size === "medium"
                ? `flex: 1 1;`
                : size === "large"
                    ? `flex: 1 0;`
                    : `height: 100%;`
    )}
`

export const CardText = styled.p`
    margin-top: 50px;
    padding: 0 10px;
    text-align: center;
    flex: 1 0 auto;
    font-size: .8rem;
    font-weight: 400;
    color: ${THEME_COLORS.grey_text};

    @media (min-width: 425px){
        font-size: 1rem;
    }
`

export const CardUnList = styled.ul`
    margin-top: 40px;
    padding: 10px 2px 20px 20px;
    flex: 1 0 auto;
    font-size: .8rem;
    font-weight: 400;
    color: ${THEME_COLORS.grey_text};
    list-style-type: circle;

    @media (min-width: 425px){
        font-size: 1rem;
    }
`

export const CardIcon = styled.div <{ $bgColor: string }> `
    position: absolute;
    margin-bottom: auto;
    margin-right: auto;
    left: 15px;
    top: 15px;
    background-color: ${props => props.$bgColor};
    padding: 4px 7px;
    border-radius: 50%;

    & img{
        height: 12px;
        width: auto;
    }
`