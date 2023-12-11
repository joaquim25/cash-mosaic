import { CopyrightText, ExtraText, FooterContainer, FooterLinks, FooterLogo, SocialLinksContainer } from "@/components/Footer/styles"
import { HiOutlineMail } from 'react-icons/hi';
import { FiGithub, FiLinkedin } from 'react-icons/fi';
import Image from "next/image"
import Link from 'next/link';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/types';
import { FooterLink } from './types';

function Footer() {
    const isLoggedIn = useSelector((state: RootState) => state.user.isLoggedIn);

    const footerLinks: FooterLink[] = isLoggedIn ?
    [
        { href: "/", content: "Homepage" },
        { href: "/dashboard", content: "Dashboard" },
        { href: "/profile", content: "Profile" },
        { href: "/#", content: "Terms" },
        { href: "/#", content: "Privacy" },
        { href: "/#", content: "About" }
    ]
    :
    [
        { href: "/", content: "Homepage" },
        { href: "/login", content: "Login" },
        { href: "/signup", content: "Sign-up" },
        { href: "/#", content: "Terms" },
        { href: "/#", content: "Privacy" },
        { href: "/#", content: "About" }
    ];

    return (
        <FooterContainer>
            <FooterLogo>
                <a href='#'>
                    <Image src="/images/cash-mosaic-logo.svg" width={50} height={50} alt="menu icon" />
                </a>
            </FooterLogo>
            <FooterLinks>
                {footerLinks && footerLinks.map((item, index) => (
                    <li key={index}><Link href={item.href}>{item.content}</Link></li>
                ))}
            </FooterLinks>
            <SocialLinksContainer>
                <Link href={"mailto: quimze1996.25@gmail.com"} target="_blank"><HiOutlineMail /></Link>
                <Link href={"https://github.com/joaquim25/cash-mosaic"} target="_blank"><FiGithub /></Link>
                <Link href={"https://www.linkedin.com/in/joaquim-luzia/"} target="_blank"><FiLinkedin /></Link>
            </SocialLinksContainer>
            <CopyrightText>&copy; 2023 Cash Mosaic</CopyrightText>
            <ExtraText>A Final Project for Eddisrupt Bootcamp</ExtraText>
        </FooterContainer>
    )
}

export default Footer