import styled from "@emotion/styled";
// import { THEME_COLORS } from "./GlobalStyles";

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
    list-style-type: none;
    display: flex;
    flex-direction: column;
    font-size: .8rem;

    & li{
        & a:hover {
            font-weight: 500;
            transition: all .2s ease-in-out;
        }
    }

    @media (min-width: 1024px){
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
    gap: 5px;

    & svg{
        width: 16px;
        height: 16px;
        cursor: pointer;
        color: rgba(0,0,0,.8);

        :hover {
            color: rgb(0,0,0);
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