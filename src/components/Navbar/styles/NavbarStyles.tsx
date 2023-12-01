import styled from "@emotion/styled"
import { THEME_COLORS } from "../../../styles/GlobalStyles";

export const NavbarContainer = styled.div`
    padding: 0 24px;
    height: 70px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    max-width: 2000px;
    margin: 0 auto;

    & svg {
        width: 30px;
        height: 30px;
        cursor: pointer;
        color: ${THEME_COLORS.svg_prim};
        transition: all .2s ease-in-out;

        :hover {
            color: ${THEME_COLORS.svg_prim_hover};
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
    & svg{
        color: #B3B3B3;
    }

    @media (min-width: 1024px){
        display: none;
    }
`

export const SidebarFadedBackground = styled.div<{ $showSidebar: boolean }>`
  ${({ $showSidebar }) => (
        $showSidebar
            ? `width: 100vw;`
            : `width: 0;`
    )}

  @media (min-width: 1024px){
      display: none;
  }
`;

export const Sidebar = styled.div<{ $showSidebar: boolean }>`
    position: fixed;
    padding: 0 30px;
    background-color: rgb(220,220,220);
    height: 100vh;
    width: 300px;
    top: 0;
    left: -300px;
    z-index: 99;
    transition: all 1s ease-in-out;

    ${({ $showSidebar }) => (
        $showSidebar
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
        color: ${THEME_COLORS.svg_prim};
        transition: all .2s ease-in-out;

        :hover {
            color: ${THEME_COLORS.svg_prim_hover};
        }
    }
`

export const SidebarTitle = styled.h2`
    border-bottom: 2px solid rgba(0,0,0,.2);
`

export const SidebarItems = styled.ul`
    list-style-type: none;
    margin-top: 20px;
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
        color: ${THEME_COLORS.svg_prim};

        :hover {
            color: ${THEME_COLORS.svg_prim_hover};
        }
    }

    .logout-icon{
        background-color: ${THEME_COLORS.danger};
        opacity: .8;
        border-radius: 50%;
        padding: 4px 6px;
        transition: all .2s ease-in-out;

        :hover {
            opacity: 1;
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
    color: ${THEME_COLORS.text_prim};
    text-shadow: 0 1px 5px #24232375;

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
    }
`

export const NavItemIcon = styled.div`

    & svg {
        width: 25px;
        height: 25px;
        color: ${THEME_COLORS.text_prim};
    }

    .logout-icon{
        margin-left: -10px;
        background-color: #d20808;
        opacity: .8;
        width: 25px;
        height: 25px;
        border-radius: 50%;
        padding: 4px 6px;
        transition: all .2s ease-in-out;

        :hover {
            opacity: 1;
        }

        & a{
            margin: auto;
        }

        & svg{
            width: 15px;
            height: 15px;
            color: white;
        }
    }
`