import styled from "@emotion/styled";

export const THEME_COLORS = {
  danger: "rgb(179, 53, 86)",
  success: "rgb(0,101,85)",
  grey_text: "rgb(100,100,100)",
  white: "#FFFFFF",

  green_light: "rgb(228,236,220)",
  green_normal: "rgb(129,174,167)",

  title_prim: "rgb(249,251,253)",
  title_sec: "rgb(115,166,158)",

  text_prim: "rgba(0, 0, 0, .6)",

  grey_border: "rgba(100,100,100, .4)",

  svg_prim: "rgba(0,0,0,.3)",
  svg_prim_hover: "rgba(0,0,0,.8)"
};

type ThemeColors = keyof typeof THEME_COLORS;


export const DefaultButton = styled.button<{ bgColor?: ThemeColors }>`
    cursor: pointer;
    margin-top: 2rem;
    padding: 15px 0;
    border-radius: 30px;
    border: 1px solid ${THEME_COLORS.grey_border};
    background-color: ${props => (props.bgColor ? THEME_COLORS[props.bgColor] : THEME_COLORS.success)};
    color: white;
    font-size: 1rem;
    transition: all .2s ease-in-out;
    width: 100%;

    :hover{
        box-shadow: 0 2px 8px 1px ${props => (props.bgColor ? THEME_COLORS[props.bgColor] : THEME_COLORS.success)};
    }
`