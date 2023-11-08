import styled from "@emotion/styled";
// import { THEME_COLORS } from "./GlobalStyles";

export const NavbarContainer = styled.div`
    padding: 0 24px;
    height: 70px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    & svg {
        width: 30px;
        height: 30px;
        cursor: pointer;
        color: rgba(0,0,0,.3);
        transition: all .2s ease-in-out;

        :hover {
            color: rgba(0,0,0,.8);
        }
    }

    & img {
        cursor: pointer;
    }

    @media (min-width: 1024px){
        gap: 40px;
    }
`

export const HambuguerIcon = styled.div`
@media (min-width: 1024px){
    display: none;
}
`

export const DesktopLinks = styled.ul`
    display: none;
    flex: 1 0 auto;
    list-style-type: none;
    font-weight: 500;
    color: rgba(0,0,0,.6);

    gap: 20px;
    justify-content: flex-end;

    & li{
        & a:hover {
            font-weight: 600;
            color: rgba(0,0,0,.8);
            transition: all .2s ease-in-out;
        }
    }

    @media (min-width: 1024px){
        display: flex;
    }
`

export const SidebarFadedBackground = styled.div<{ showSidebar: boolean }>`
    display: flex;
    position: fixed;
    background-color: rgba(0,0,0,.7);
    backdrop-filter: blur(10px);
    height: 100vh;
    left: 0;
    top: 0;

    z-index: 98;

    ${({ showSidebar }) => (
        showSidebar
            ? `width: 100vw;`
            : `width: 0;`
    )}

    @media (min-width: 1024px){
        display: none;
    }
`
export const Sidebar = styled.div<{ showSidebar: boolean }>`
    position: fixed;
    padding: 0 30px;
    background-color: rgb(220,220,220);
    height: 100vh;
    width: 300px;
    top: 0;
    left: -300px;
    z-index: 99;
    transition: all 1s ease-in-out;

    ${({ showSidebar }) => (
        showSidebar
            ? `left: 0;`
            : ``
    )}

    @media (min-width: 1024px){
        display: none;
    }
`

export const CloseIconContainer = styled.div`
    width: 100%;
    display: flex;
    justify-content: flex-end;
    padding-top: 20px;

    & svg{
        width: 20px;
        height: 20px;
        cursor: pointer;
        color: rgba(0,0,0,.3);
        transition: all .2s ease-in-out;

        :hover {
            color: rgba(0,0,0,.8);
        }
    }
`

export const SidebarTitle = styled.h2`
    border-bottom: 2px solid rgba(0,0,0,.2);
`

export const SidebarLinks = styled.ul`
    list-style-type: none;
    margin-top: 20px;
    display: flex;
    flex-direction: column;
    gap: 20px;

    & li{
        width: 280px;

        & a:hover {
            font-weight: 500;
            transition: all .2s ease-in-out;
        }
    }
`