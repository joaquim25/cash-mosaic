import { THEME_COLORS } from "@/styles/GlobalStyles";
import { styled } from 'styled-components';

export const AuthContainer = styled.div`
    height: 100vh;

    @media (min-width: 768px) {
        display: grid;
        grid-template-columns: 55% 45%;
    }
`

export const FormImageContainer = styled.div`
    display: none;

    @media (min-width: 768px) {
        display: flex;

        & img {
            border-left: 2px solid ${THEME_COLORS.grey_border};
            top: 0;
            right: 0;
            position: absolute;
            object-fit: cover;
            width: 45%;
            height: calc(100% + 70px);
            z-index: -1;
        }

    }
`

export const FormContainer = styled.div`
    display: flex;
    gap: 1rem;
    flex-direction: column;
    align-items: center;
`;

export const FormTitle = styled.h1`
    font-size: 3rem;
    font-weight: 400;
`

export const StyledAuthForm = styled.form`
    margin-top: 10%;
    padding: 2rem 1rem;
    display: grid;
    grid-template-columns: repeat(2,1fr);
    row-gap: 20px;
    column-gap: 10px;
    width: 100%;
    max-width: 380px;

    & button {
        grid-column-start: span 2
    }
`

export const FieldContainer = styled.div<{ name: string }>`
    ${({ name }) => name === "firstname" ? `grid-column-start: 1;
    grid-column-end: 2;` : name === "lastname" ? `grid-column-start: 2;
    grid-column-end: 3;` : `grid-column-start: span 2`}
`

export const FormInput = styled.input`
    margin-top: 5px;
    padding: 0.5rem;
    border-radius: 5px;
    background-color: #D9D9D9;
    color: rgb(100, 100, 100);
    border: 2px solid rgba(200, 200, 200, 0.2);
    transition: 0.2s all ease-in-out;
    width: 100%;
    outline: none;

    :hover {
        border: 2px solid ${THEME_COLORS.grey_border};
    }
`

export const ExtraFormLinks = styled.div`
    color: ${THEME_COLORS.grey_text};
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    font-size: 0.9rem;
    position: relative;
    top: 40px;
    grid-column-start: span 2;

    & a {
        text-decoration: underline;
        font-weight: 600;

        :hover {
            opacity: .8;
        }
    }
`;