import { styled } from 'styled-components';
import { THEME_COLORS } from "../../../styles/GlobalStyles";
import { motion } from "framer-motion";

export const FeatureContainer = styled.div<{ $isInverted: boolean }>`
    display: grid;
    align-items: center;
    max-width: 1000px;
    margin: 0 auto;
    padding: 0 2rem 2rem 2rem;
    row-gap: 30px;
    column-gap: 10px;
    grid-template-columns: repeat(2,1fr);
    grid-template-areas:
        "header header"
        "img cards";

    ${({ $isInverted }) => $isInverted && `
        padding-top: 20px;
        border-top: 2px solid ${THEME_COLORS.green_normal};
        grid-template-areas:
        "header header"
        "cards img";
    `}

    @media (min-width: 1024px){
        grid-template-columns: 60% 40%;
        grid-template-areas:
                "header img"
                "cards img";

        ${({ $isInverted }) => $isInverted && `
        grid-template-columns: 40% 60%;
            grid-template-areas:
            "img header"
            "img cards";
        `}
    }
`

export const SectionInfoCol = styled(motion.div)`
    grid-area: header;
`

export const FeatureHeading = styled.h2`
    text-align: center;
    margin-top: 0;
    margin-bottom: 3rem;
    font-size: 1.8rem;
    font-weight: 600;
`

export const FeatureSubHeading = styled.h3`
    text-align: center;
    margin-top: 0;
    margin-bottom: 0;
    color: ${THEME_COLORS.success};
    opacity: .8;
    font-weight: 500;
`

export const FeatureText = styled.p`
    text-align: center;
    font-size: 1.1rem;
    color: ${THEME_COLORS.text_prim};
    max-width: 400px;
    margin: 0 auto;
`

export const FeatureImg = styled(motion.img) <{ $isInverted: boolean }>`
    width: 100%;
    height: 100%;
    max-width: 300px;
    object-fit: contain;
    grid-area: img;
    margin-left: auto;

    ${({ $isInverted }) => $isInverted && `
    margin-left: 0; margin-right: auto;
    `}

    @media (min-width: 1024px){
        margin: auto;
    }
`

//Features Cards

export const CardsContainer = styled(motion.div)`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 30px;
    flex-direction: column;
    height: 100%;
    grid-area: cards;

    @media (min-width: 1024px){
        flex-direction: row;
        align-items: start;
    }
`