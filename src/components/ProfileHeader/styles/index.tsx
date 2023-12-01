import styled from "@emotion/styled"
import { THEME_COLORS } from "@/styles/GlobalStyles";

export const Background = styled.div`
    position: relative;
    width: 100%;
    height: 260px;
    min-width: 900px;
    top: -80px;
    z-index: -99;
    background-image: url("/images/profile-bg.png");
    background-size: 120%;
    margin-bottom: 100px;
    opacity: .7;
    background-position: 95% 30%;
    border-radius: 0 0 24px 24px;

    @media (min-width: 1024px){
        background-size: cover;
        height: 300px;
        min-width: 1000px;
    }
`

export const UserProfileSection = styled.div`
    position: relative;
    top: -250px;
    display: flex;
    justify-content: center;
    margin-bottom: -180px;
`

export const UserAvatarContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;

    @media (min-width: 1024px){
        flex-direction: row;
    }
`

export const UserAvatar = styled.img`
    width: 140px;
    height: 140px;
    object-fit: contain;
    padding: 24px;
    background-color: #D9D9D9;
    border-radius: 50%;
    border: 10px solid #fcfcfc;
`

export const UserName = styled.p`
    font-weight: 600;
    font-size: 1.5rem;
    text-align: center;

    @media(min-width: 1024px){
        text-align: left;
    }
`

export const UserBalance = styled.p`
    margin-top: 5px;
    color: ${THEME_COLORS.grey_text};
    text-align: center;

    @media(min-width: 1024px){
        text-align: left;
    }
`