import styled from "@emotion/styled";
import { THEME_COLORS } from "./GlobalStyles";
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

export const SidebarItems = styled.ul`
    list-style-type: none;
    margin-top: 20px;

    // flex-direction: column;
    display: grid;
    justify-items: center;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
    width: 100%;

    & li{
        order: 1;
        grid-column-start: span 2;
        width: 100%;

        & a:hover {
            font-weight: 500;
            transition: all .2s ease-in-out;
        }
    }
`

export const SidebarIcon = styled.div`
    order: 0;
    margin: auto 0 auto auto;

    :nth-of-type(even){
        margin-left: 0;
        margin-right: auto;
    }

    & svg{
        width: 35px;
        height: 35px;
        color: ${THEME_COLORS.greyText};

        :hover {
            color: rgba(0,0,0,.8);
        }
    }

    .logout-icon{
        background-color: rgba(174, 78, 78, .8);
        border-radius: 50%;
        padding: 5px 7px;
        transition: all .2s ease-in-out;

        :hover {
            background-color: rgb(174, 78, 78);
        }

        & svg{
            width: 15px;
            height: 15px;
            color: white;
            position: relative;
            top: 1px;
            left: 1px;
        }
    }
`

export const DesktopNavItemsContainer = styled.ul`
    display: none;
    flex: 1 0 auto;
    list-style-type: none;
    font-weight: 500;
    color: rgba(0,0,0,.6);

    gap: 20px;
    justify-content: flex-end;

    @media (min-width: 1024px){
        display: flex;
        align-items: center;
    }
`

export const NavItemLink = styled.li`
& a:hover {
    font-weight: 600;
    color: rgba(0,0,0,.8);
    transition: all .2s ease-in-out;
}
`

export const NavItemIcon = styled.div`

    & svg {
        width: 25px;
        height: 25px;
    }

    .logout-icon{
        margin-left: -10px;
        background-color: rgba(174, 78, 78, .65);
        width: 25px;
        height: 25px;
        border-radius: 50%;
        padding: 4px 7px;
        transition: all .2s ease-in-out;

        :hover {
            background-color: rgb(174, 78, 78);
        }

        & a{
            margin: auto;
        }

        & svg{
            padding: auto;
            width: 15px;
            height: 15px;
            color: white;
        }
    }
`