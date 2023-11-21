import React from 'react'
import { Background, UserAvatar, UserAvatarContainer, UserBalance, UserName, UserProfileSection } from './styles'
import { User } from '@/store/types';

type ProfileHeaderProps = {
    user: User;
};

function ProfileHeader({ user }: ProfileHeaderProps) {
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