import styled from "@emotion/styled"

export const FormContainer = styled.form`
    margin: 0 auto;
    padding: 0 2rem;
    max-width: 560px;
    display: flex;
    flex-direction: column;
    gap: 20px;

    @media (min-width: 1024px) {
        max-width: 900px;
        display: grid;
        grid-template-columns: repeat(2,1fr);
    }
`

export const FieldsIcon = styled.div`
    position: absolute;
    top: 20px;
    background-color: white;
    border-radius: 50%;
    padding: 5px 7px;

    & svg {
        color: #fcfcfc;
        position: relative;
        top: 2px;
        min-width: 25px;
        min-height: 25px;
    }
`

export const FieldsGroup = styled.div`
    position: relative;
    display: flex;
    column-gap: 50px;
    row-gap: 20px;
    padding: 6rem 2rem 1rem 2rem;
    border-radius: 10px;
`

export const NameFieldsGroup = styled(FieldsGroup)`
    display: flex;
    flex-direction: column;
    background-color: #BAC2CD;

    @media (min-width: 1024px){
        flex-direction: row;
        grid-column-start: span 2;
    }

    & div:not(:not(:last-child) ~ div) {
        background-color: #81B2CA;
    }
`

export const ExtraInfoFieldsGroup = styled(FieldsGroup)`
    display: flex;
    flex-direction: column;
    grid-row-start: span 2;
    background-color: #117c3c42;


    & div:not(:not(:last-child) ~ div) {
        background-color: #065e29a3;
    }
`

export const PasswordFieldsGroup = styled(FieldsGroup)`
    display: flex;
    flex-direction: column;
    grid-row-start: span 1;
    background-color: #e2c3c3;

    & div:not(:not(:last-child) ~ div) {
        background-color: #BA6E6E;
    }
`

export const ButtonsGroup = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
`

