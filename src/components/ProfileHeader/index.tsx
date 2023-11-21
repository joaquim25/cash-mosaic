import React from 'react'
import { Background, UserAvatar, UserAvatarContainer, UserBalance, UserName, UserProfileSection } from './styles'
import { RootState } from '@/store/types';
import { useSelector } from 'react-redux';


function ProfileHeader() {
    const user = useSelector((state: RootState) => state.user);

    return (
        <>
            <Background />
            <UserProfileSection>
                <UserAvatarContainer>
                    <UserAvatar src='/images/profile-img.png' />
                    <div>
                        <UserName>{user.firstname}, {user.lastname}</UserName>
                        <UserBalance>5700,00€</UserBalance>
                    </div>
                </UserAvatarContainer>

            </UserProfileSection>
        </>
    )
}

export default ProfileHeader