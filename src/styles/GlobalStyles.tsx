import styled from "@emotion/styled";

export const THEME_COLORS = {
    danger: "rgb(179, 53, 86)",
    success: "rgb(0,101,85)",
    greyText: "rgb(100,100,100)",
};

type ThemeColors = keyof typeof THEME_COLORS;


export const DefaultButton = styled.button<{ bgColor?: ThemeColors }>`
    cursor: pointer;
    margin-top: 2rem;
    padding: 15px 0;
    border-radius: 30px;
    border: 1px solid rgba(100, 100, 100, .5);
    background-color: ${props => (props.bgColor ? THEME_COLORS[props.bgColor] : THEME_COLORS.success)};
    color: white;
    font-size: 1rem;
    transition: all .2s ease-in-out;

    :hover{
        box-shadow: 0 2px 8px 1px ${props => (props.bgColor ? THEME_COLORS[props.bgColor] : THEME_COLORS.success)};
    }
`