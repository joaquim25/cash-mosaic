import { styled } from 'styled-components';

export const FormContainer = styled.div`
    margin: 0 auto;
    padding: 0 2rem;
    max-width: 900px;
    display: grid;
    grid-template-columns: repeat(2,1fr);
    gap: 20px;
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
    padding: 6rem 1rem 1rem 1rem;
    border-radius: 24px;
`

export const NameFieldsGroup = styled(FieldsGroup)`
    grid-column-start: span 2;
    background-color: #BAC2CD;

    ${FieldsIcon} {
        background-color: #81B2CA;
    }
`

export const ExtraInfoFieldsGroup = styled(FieldsGroup)`
    display: flex;
    flex-direction: column;
    grid-row-start: span 2;
    background-color: #E5CB93;

    ${FieldsIcon} {
        background-color: #E1AE42;
    }
`

export const PasswordFieldsGroup = styled(FieldsGroup)`
    display: flex;
    flex-direction: column;
    grid-row-start: span 1;
    background-color: #D1AAAA;

    ${FieldsIcon} {
        background-color: #BA6E6E;
    }
`

export const ButtonsGroup = styled.div`
    display: flex;
    flex-direction: column;
`

