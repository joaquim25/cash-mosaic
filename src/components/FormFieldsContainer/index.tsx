import React, { ChangeEvent } from 'react';
import { CheckIconContainer, DismissIconContainer, EditIconContainer, EditingIconsContainer, FieldContainer, Input, Label, TextArea } from "./styles/index"
import { FaRegEdit } from "react-icons/fa";
import { IoMdCheckmark, IoMdClose } from "react-icons/io";

type FormFieldsContainerProps = {
    fields: {
        label: string;
        type: string;
        name: "firstname" | "lastname" | "location" | "bio" | "password";
        value: string;
        isEditing: boolean;
    }[];
    handleFieldChange: (fieldname: "firstname" | "lastname" | "location" | "bio" | "password", e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) => void;
    handleEditActionField: (action: "edit" | "save" | "dismiss", fieldname: "firstname" | "lastname" | "location" | "bio" | "password") => void;
};

function FormFieldsContainer({ fields, handleFieldChange, handleEditActionField }: FormFieldsContainerProps) {

    return (
        <>
            {fields.map((field) => (
                <FieldContainer key={field.name}>
                    <Label>{field.label}</Label>
                    {field.type === "textarea"
                        ? <TextArea
                            name={field.name}
                            value={field.value}
                            onChange={(e) => handleFieldChange(field.name, e)}
                            rows={8}
                            disabled={!field.isEditing}
                        />

                        : field.type === "password" && field.isEditing === true ?
                            <Input
                                type="text"
                                name={field.name}
                                value={field.value}
                                onChange={(e) => handleFieldChange(field.name, e)}
                                disabled={!field.isEditing}
                            />
                            : <Input
                                type={field.type}
                                name={field.name}
                                value={field.value}
                                onChange={(e) => handleFieldChange(field.name, e)}
                                disabled={!field.isEditing}
                            />

                    }

                    <EditIconContainer $isEditing={field.isEditing} onClick={() => handleEditActionField("edit", field.name)}>
                        <FaRegEdit />
                    </EditIconContainer>
                    <EditingIconsContainer $isEditing={field.isEditing}>
                        <CheckIconContainer onClick={() => handleEditActionField("save", field.name)}>
                            <IoMdCheckmark />
                        </CheckIconContainer>
                        <DismissIconContainer onClick={() => handleEditActionField("dismiss", field.name)}>
                            <IoMdClose />
                        </DismissIconContainer>
                    </EditingIconsContainer>
                </FieldContainer>
            ))}
        </>
    );
}

export default FormFieldsContainer;