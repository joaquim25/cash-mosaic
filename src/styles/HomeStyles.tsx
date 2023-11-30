import { styled } from 'styled-components';
import { THEME_COLORS } from "./GlobalStyles";
import { motion } from "framer-motion";

export const HomepageContainer = styled.div`
    width: 100vw;
`

// Hero Section
export const HeroSection = styled.div`
    border-top: 2px solid ${THEME_COLORS.grey_border};
    border-bottom: 2px solid ${THEME_COLORS.grey_border};
    display: flex;
    flex-direction: column;
    gap: 20px;
    background-color: ${THEME_COLORS.green_light};
    padding: 2rem 2rem;

    @media (min-width: 1024px){
        flex-direction: row;
        justify-content: center;
        gap: 120px;
        padding: 5rem 2rem;
    }
`

export const LeftHeroContainer = styled(motion.div)`
    order: 1;
    display: flex;
    flex-direction: column;
    margin: 0 auto;
    max-width: 400px;

    & a{
        color: white;
    }

    @media (min-width: 1024px){
        order: 0;
        max-width: 500px;
        margin: 0 0 0 auto;
        padding: 0 60px;
    }
`

export const HeroHeader = styled.h1`
    text-align: center;
    padding: 0 2rem;

    @media (min-width: 1024px){
        font-size: 3rem;
        padding: 0;
    }
`

export const HeroText = styled.p`
    margin-top: 10px;
    margin-bottom: 40px;
    text-align: center;
    font-size: 1.1rem;
    color: ${THEME_COLORS.text_prim};

    & span{
        font-weight: 600;
        color: black;
    }
`

export const RightHeroContainer = styled(motion.div)`
    display: flex;
    justify-content: center;
    align-items: center;
    order: 0;

    @media (min-width: 1024px){
        max-width: 500px;
        margin-right: auto;
    }
`

export const HomeHeroImg = styled.img`
    width: 50%;
    height: 50%;
    max-width: 300px;
    object-fit: contain;

    @media (min-width: 1024px){
        width: 100%;
        height: 100%;
        max-width: 500px;
    }
`


//Features Sections
export const FeatureSectionHeading = styled.h2`
    margin-top: 4rem;
    margin-bottom: 0;
    text-align: center;
`

export const FeatureSectionSubHeading = styled.h3`
    margin: 0 auto 4rem auto;
    padding-bottom: 20px;
    width: 80%;
    max-width: 850px;
    text-align: center;
    color: ${THEME_COLORS.green_normal};
    border-bottom: 3px solid ${THEME_COLORS.green_normal};
`