import { CopyrightText, FooterContainer, FooterLinks, FooterLogo, SocialLinksContainer } from "@/components/Footer/styles/FooterStyles"
import { HiOutlineMail } from 'react-icons/hi';
import { FiGithub, FiLinkedin } from 'react-icons/fi';
import Image from "next/image"
import Link from 'next/link';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { RootState } from '@/store/types';
import { FooterLink } from './types';

function Footer() {
    const isLoggedIn = useSelector((state: RootState) => state.user.isLoggedIn);
    const [footerLinks, setFooterLinks] = useState<FooterLink[]>();

    useEffect(() => {
        if (isLoggedIn) {
            setFooterLinks([
                { href: "/", content: "Homepage" },
                { href: "/dashboard", content: "Dashboard" },
                { href: "/profile", content: "Profile" },
                { href: "/#", content: "Terms" },
                { href: "/#", content: "Privacy" },
                { href: "/#", content: "About" }
            ])
        } else {
            setFooterLinks([
                { href: "/", content: "Homepage" },
                { href: "/login", content: "Login" },
                { href: "/signup", content: "Sign-up" },
                { href: "/#", content: "Terms" },
                { href: "/#", content: "Privacy" },
                { href: "/#", content: "About" }
            ])
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isLoggedIn]);

    return (
        <FooterContainer>
            <FooterLogo>
                <a href='#'>
                    <Image src="/images/logo.svg" width={100} height={45} alt="menu icon" />
                </a>
            </FooterLogo>
            <FooterLinks>
                {footerLinks && footerLinks.map((item, index) => (
                    <li key={index}><Link href={item.href}>{item.content}</Link></li>
                ))}
            </FooterLinks>
            <SocialLinksContainer>
                <HiOutlineMail />
                <FiGithub />
                <FiLinkedin />
            </SocialLinksContainer>
            <CopyrightText>&copy; 2023 Cash Mosaic</CopyrightText>
        </FooterContainer>
    )
}

export default Footer