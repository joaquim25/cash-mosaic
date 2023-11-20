import React from 'react';
import { FieldContainer, Input, Label, TextArea } from "./styles/index"

type FormFieldsContainerProps = {
    fields: {
        label: string;
        type: string;
        name: string;
        value: string;
        isEditing: boolean;
    }[];
    handleFieldChange: any;
};

function FormFieldsContainer({ fields, handleFieldChange }: FormFieldsContainerProps) {
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
                        />

                        : field.type === "password" && field.isEditing === true ?
                            <Input
                                type="text"
                                name={field.name}
                                value={field.value}
                                onChange={(e) => handleFieldChange(field.name, e)}
                            />
                            : <Input
                                type={field.type}
                                name={field.name}
                                value={field.value}
                                onChange={(e) => handleFieldChange(field.name, e)}
                            />

                    }
                </FieldContainer>
            ))}
        </>
    );
}

export default FormFieldsContainer;