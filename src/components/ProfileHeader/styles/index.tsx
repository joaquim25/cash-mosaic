import styled from "@emotion/styled";
import { THEME_COLORS } from "@/styles/GlobalStyles";

export const Background = styled.div`
    position: relative;
    width: 100%;
    height: 300px;
    min-width: 1000px;
    top: -80px;
    z-index: -99;
    background-image: url("/images/profile-bg.png");
    background-size: cover;
    margin-bottom: 100px;
    opacity: .7;
`

export const UserProfileSection = styled.div`
    position: relative;
    top: -250px;
    display: flex;
    left: calc(50% - 90px);
    margin-bottom: -180px;
`

export const UserAvatarContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 20px;
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
`

export const UserBalance = styled.p`
    margin-top: 5px;
    color: ${THEME_COLORS.grey_text}
`