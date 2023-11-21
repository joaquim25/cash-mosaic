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
import { IoMdSettings } from 'react-icons/io';

type UserData = {
    firstname: { value: string; isEditing: boolean };
    lastname: { value: string; isEditing: boolean };
    location: { value: string; isEditing: boolean };
    bio: { value: string; isEditing: boolean };
    password: { value: string; isEditing: boolean };
};

type ProfileFormContainerProps = {
    userData: UserData;
    handleFieldChange: (
        fieldname: 'firstname' | 'lastname' | 'location' | 'bio' | 'password',
        e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>
    ) => void;
    handleEditActionField: (action: "edit" | "save" | "dismiss", fieldname: "firstname" | "lastname" | "location" | "bio" | "password") => void;
    cancelChanges: () => void;
    submitChanges: () => Promise<void>;
};

function ProfileFormContainer({
    userData, handleFieldChange, handleEditActionField, cancelChanges, submitChanges
}: ProfileFormContainerProps) {



    return (
        <FormContainer>

            <NameFieldsGroup>
                <FieldsIcon>
                    <IoMdSettings />
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

            <ExtraInfoFieldsGroup>
                <FieldsIcon>
                    <IoMdSettings />
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

            <PasswordFieldsGroup>
                <FieldsIcon>
                    <IoMdSettings />
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
            <ButtonsGroup>
                <DefaultButton onClick={submitChanges}>Save Changes</DefaultButton>
                <DefaultButton bgColor='danger' onClick={cancelChanges}>Cancel</DefaultButton>
            </ButtonsGroup>

        </FormContainer>

    )
}

export default ProfileFormContainer