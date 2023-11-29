import { styled } from 'styled-components';
import { THEME_COLORS } from "@/styles/GlobalStyles";

export const FieldContainer = styled.div`
    position: relative;
    margin-bottom: 15px;
    width: 100%;
    background-color: #E7E7E7;
    border-radius: 5px;
    padding: 5px 10px;
`;

export const Label = styled.label`
    display: block;
    color: ${THEME_COLORS.grey_text}
`;

export const Input = styled.input`
    width: 100%;
    padding: 8px;
    box-sizing: border-box;
    border: none;
    border-radius: 5px;
    background-color: transparent;
    outline: none;
    font-size: 1.1rem;

    :focus {
        background-color: #B7B7B740;
    }
`;

export const TextArea = styled.textarea`
    width: 100%;
    padding: 8px;
    box-sizing: border-box;
    resize: none;
    border: none;
    border-radius: 5px;
    background-color: transparent;
    outline: none;
    font-size: 1.1rem;

    :focus {
        background-color: #B7B7B740;
    }
`

export const EditIconContainer = styled.div<{ $isEditing: boolean }>`
    display: ${props => props.$isEditing ? "none" : "flex"};
    position: absolute;
    right: 5px;
    top: 5px;

    & svg{
        cursor: pointer;
        transition: all .2s ease-in-out;
    }

    & svg:hover {
        transform: scale(1.1);
    }
`

export const EditingIconsContainer = styled.div < { $isEditing: boolean }> `
    position: absolute;
    display: ${props => props.$isEditing ? "flex" : "none"};
    top: 5px;
    right: 5px;
    gap: 5px;

    & svg{
        width: 20px;
        height: 20px;
        cursor: pointer;
        transition: all .2s ease-in-out;
    }

    & svg:hover {
        transform: scale(1.1);
    }
`

export const CheckIconContainer = styled.div`
    color: green;
`

export const DismissIconContainer = styled.div`
    color: red;
`