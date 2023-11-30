import React, { ChangeEvent, useState } from 'react';
import FormFieldsContainer from '../FormFieldsContainer';
import {
    ButtonsGroup,
    ExtraInfoFieldsGroup,
    FieldsIcon,
    FormContainer,
    NameFieldsGroup,
    PasswordFieldsGroup,
} from './styles';
import { DefaultButton } from '@/styles/GlobalStyles';
import { EditActionFieldProps, FieldChangeProps, UserData } from './types';
import { CgProfile } from "react-icons/cg";
import { TbListDetails } from "react-icons/tb";
import { MdLockOutline } from "react-icons/md";





type ProfileFormContainerProps = {
    userData: UserData;
    handleFieldChange: FieldChangeProps;
    handleEditActionField: EditActionFieldProps;
    cancelChanges: () => void;
    submitChanges: () => Promise<void>;
};

function ProfileFormContainer({
    userData, handleFieldChange, handleEditActionField, cancelChanges, submitChanges
}: ProfileFormContainerProps) {



    return (
        <FormContainer>
            {/* Name & Last Name group */}
            <NameFieldsGroup>
                <FieldsIcon>
                    <CgProfile />
                </FieldsIcon>
                <FormFieldsContainer
                    fields={[
                        {
                            label: "First Name:",
                            type: "text",
                            name: "firstname",
                            value: userData.firstname.value,
                            isEditing: userData.firstname.isEditing
                        },
                        {
                            label: "Last Name:",
                            type: "text",
                            name: "lastname",
                            value: userData.lastname.value,
                            isEditing: userData.lastname.isEditing
                        }
                    ]}
                    handleFieldChange={handleFieldChange}
                    handleEditActionField={handleEditActionField}
                />
            </NameFieldsGroup>

            {/* Location & Bio group */}
            <ExtraInfoFieldsGroup>
                <FieldsIcon>
                    <TbListDetails />
                </FieldsIcon>

                <FormFieldsContainer
                    fields={[
                        {
                            label: "Location:",
                            type: "text",
                            name: "location",
                            value: userData.location.value,
                            isEditing: userData.location.isEditing
                        },
                        {
                            label: "Bio:",
                            type: "textarea",
                            name: "bio",
                            value: userData.bio.value,
                            isEditing: userData.bio.isEditing
                        }
                    ]}
                    handleFieldChange={handleFieldChange}
                    handleEditActionField={handleEditActionField}
                />
            </ExtraInfoFieldsGroup>

            {/* Password group */}
            <PasswordFieldsGroup>
                <FieldsIcon>
                    <MdLockOutline />
                </FieldsIcon>
                <FormFieldsContainer
                    fields={[
                        {
                            label: "Password:",
                            type: "password",
                            name: "password",
                            value: userData.password.value,
                            isEditing: userData.password.isEditing
                        }
                    ]}
                    handleFieldChange={handleFieldChange}
                    handleEditActionField={handleEditActionField}
                />
            </PasswordFieldsGroup >

            {/* General Form buttons */}
            <ButtonsGroup>
                <DefaultButton onClick={submitChanges}>Save Changes</DefaultButton>
                <DefaultButton $bgColor='danger' onClick={cancelChanges}>Cancel</DefaultButton>
            </ButtonsGroup>

        </FormContainer>

    )
}

export default ProfileFormContainer