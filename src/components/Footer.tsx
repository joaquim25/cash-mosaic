import { HiOutlineMail } from 'react-icons/hi';
import { FiGithub, FiLinkedin } from 'react-icons/fi';
import { CopyrightText, FooterContainer, FooterLinks, FooterLogo, SocialLinksContainer } from "@/styles/FooterStyles"
import Image from "next/image"

function Footer() {
    return (
        <FooterContainer>
            <FooterLogo>
                <a href='#'>
                    <Image src="/images/logo.svg" width={100} height={45} alt="menu icon" />
                </a>
            </FooterLogo>
            <FooterLinks>
                <li><a href='#'>Dashboard</a></li>
                <li><a href='#'>Profile</a></li>
                <li><a href='#'>Login</a></li>
                <li><a href='#'>Sign-up</a></li>
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