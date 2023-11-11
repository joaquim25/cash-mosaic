import { THEME_COLORS } from "@/styles/GlobalStyles";
import styled from "@emotion/styled";

export const FooterContainer = styled.div`
    position: relative;
    background-color: #94BE9B;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 100px;
    padding: 20px 30px;
    border-radius: 24px 24px 0 0;

    @media (min-width: 1024px){
        justify-content: space-evenly;
    }
`
export const FooterLogo = styled.div`
    cursor: pointer;
`

export const FooterLinks = styled.ul`
    display: none;

    @media (min-width: 425px){
        list-style-type: none;
        display: grid;
        grid-template-rows: repeat(3,1fr);
        grid-auto-flow: column;
        column-gap: 10px;
        font-size: .8rem;

        & li{
            & a:hover {
                font-weight: 500;
                transition: all .2s ease-in-out;
            }
        }
    }

    @media (min-width: 1024px){
        display: flex;
        flex-direction: row;
        gap: 10px;
        font-size: .9rem;

        & li{
            border-right: 1px solid black;
            padding-right: 10px;
        }

        & li:last-child{
            border: none;
            padding: 0;
        }
    }
`

export const SocialLinksContainer = styled.div`
    display: flex;
    justify-content: flex-end;
    min-width: 90px;
    gap: 5px;

    & svg{
        width: 16px;
        height: 16px;
        cursor: pointer;
        color: ${THEME_COLORS.text_prim};

        :hover {
            color: black;
        }

        @media (min-width: 1024px){
            width: 24px;
            height: 24px;
        }
    }
`

export const CopyrightText = styled.p`
    position: absolute;
    font-size: .6rem;
    right: 30px;
    bottom: 26px;

    @media (min-width: 1024px){
        right: auto;
        bottom: 16px;
    }
`