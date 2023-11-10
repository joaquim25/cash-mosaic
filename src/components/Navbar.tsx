import { IoIosMenu } from 'react-icons/io';
import { LiaUser } from 'react-icons/lia';
import { MdOutlineLogout } from 'react-icons/md';
import { AiOutlineClose } from 'react-icons/ai';
import {
    CloseIconContainer,
    DesktopNavItemsContainer,
    HambuguerIcon,
    NavItemIcon,
    NavItemLink,
    NavbarContainer,
    Sidebar,
    SidebarFadedBackground,
    SidebarIcon,
    SidebarItems,
    SidebarTitle
} from "@/styles/NavbarStyles";
import Image from "next/image"
import Link from 'next/link';
import { RootState } from '@/types';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { logOut } from '@/store/user/actions';

interface NavItem {
    href: string;
    content?: string;
    icon?: React.ReactNode;
    class?: string;
    action?: any;
}


function Navbar() {
    const [showSidebar, setShowSidebar] = useState(false);
    const [navItems, setNavItems] = useState<NavItem[]>();

    const isLoggedIn = useSelector((state: RootState) => state.user.isLoggedIn);
    const dispatch = useDispatch();



    useEffect(() => {
        if (isLoggedIn) {
            setNavItems([
                { href: "/", content: "Homepage" },
                { href: "/dashboard", content: "Dashboard" },
                { href: "/profile", icon: <LiaUser /> },
                { href: "/", class: "logout-icon", icon: <MdOutlineLogout />, action: onLogoutClick },
            ])
        } else {
            setNavItems([
                { href: "/", content: "Homepage" },
                { href: "/login", content: "Login" },
                { href: "/signup", content: "Sign-up" },
            ])
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isLoggedIn]);

    const onLogoutClick = () => {
        setShowSidebar(false);
        dispatch(logOut());
    }

    const toggleShowSidebar = () => {
        setShowSidebar(prevVal => !prevVal);
    }

    const handleSideBarItemClick = () => {
        setShowSidebar(false);
    }

    return (
        <>
            <NavbarContainer>
                <HambuguerIcon>
                    <IoIosMenu onClick={toggleShowSidebar} />
                </HambuguerIcon>
                <Link href="/">
                    <Image src="/images/logo.svg" width={100} height={45} alt="menu icon" />
                </Link>

                <DesktopNavItemsContainer>
                    {navItems && navItems.map((item, index) => {
                        if (!item.icon) {
                            return (
                                <NavItemLink key={index} >
                                    <Link href={item.href} onClick={handleSideBarItemClick}>
                                        {item.icon}
                                        {item.content}
                                    </Link>
                                </NavItemLink>)
                        } else {
                            return (
                                <NavItemIcon key={index}>
                                    <Link href={item.href} className={item.class ? item.class : ""} onClick={item.action ? item.action : handleSideBarItemClick}>{item.icon}</Link>
                                </NavItemIcon>
                            )
                        }
                    })}
                </DesktopNavItemsContainer>

            </NavbarContainer >
            <SidebarFadedBackground showSidebar={showSidebar} onClick={toggleShowSidebar} />
            <Sidebar showSidebar={showSidebar}>
                <CloseIconContainer>
                    <AiOutlineClose onClick={toggleShowSidebar} />
                </CloseIconContainer>
                <SidebarTitle>Links</SidebarTitle>

                <SidebarItems>
                    {navItems && navItems.map((item, index) => {
                        if (!item.icon) {
                            return (
                                <li key={index} >
                                    <Link href={item.href} onClick={handleSideBarItemClick}>
                                        {item.icon}
                                        {item.content}
                                    </Link>
                                </li>)
                        } else {
                            return (
                                <SidebarIcon key={index}>
                                    <Link href={item.href} className={item.class ? item.class : ""} onClick={item.action ? item.action : null}>{item.icon}</Link>
                                </SidebarIcon>
                            )
                        }
                    })}
                </SidebarItems>

            </Sidebar>
        </>
    )
}

export default Navbar;
