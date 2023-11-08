import { IoIosMenu } from 'react-icons/io';
import { LiaUser } from 'react-icons/lia';
import { AiOutlineClose } from 'react-icons/ai';
import { CloseIconContainer, DesktopLinks, HambuguerIcon, NavbarContainer, Sidebar, SidebarFadedBackground, SidebarLinks, SidebarTitle } from "@/styles/NavbarStyles"
import Image from "next/image"
import { useState } from 'react';

function Navbar() {
    const [showSidebar, setShowSidebar] = useState(false);

    const toggleShowSidebar = () => {
        setShowSidebar(prevVal => !prevVal)
    }

    const handleSideBarLinkClick = () => {
        setShowSidebar(false);
    }

    return (
        <>
            <NavbarContainer>
                <HambuguerIcon>
                    <IoIosMenu onClick={toggleShowSidebar} />
                </HambuguerIcon>
                <Image src="/images/logo.svg" width={100} height={45} alt="menu icon" />
                <DesktopLinks>
                    <li><a href='#' onClick={handleSideBarLinkClick}>Dashboard</a></li>
                </DesktopLinks>
                <LiaUser />
            </NavbarContainer>
            <SidebarFadedBackground showSidebar={showSidebar} onClick={toggleShowSidebar} />
            <Sidebar showSidebar={showSidebar}>
                <CloseIconContainer>
                    <AiOutlineClose onClick={toggleShowSidebar} />
                </CloseIconContainer>
                <SidebarTitle>Links</SidebarTitle>
                <SidebarLinks>
                    <li><a href='#' onClick={handleSideBarLinkClick}>Dashboard</a></li>
                    <li><a href='#' onClick={handleSideBarLinkClick}>Profile</a></li>
                    <li><a href='#' onClick={handleSideBarLinkClick}>Login</a></li>
                    <li><a href='#' onClick={handleSideBarLinkClick}>Sign-up</a></li>
                </SidebarLinks>
            </Sidebar>
        </>
    )
}

export default Navbar