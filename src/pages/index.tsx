/* eslint-disable react-hooks/exhaustive-deps */
import features from '../../public/data/features.json';
import Head from 'next/head'
import { FeatureSectionHeading, FeatureSectionSubHeading, HeroHeader, HeroSection, HeroText, HomeHeroImg, HomepageContainer, LeftHeroContainer, RightHeroContainer } from '@/styles/HomeStyles'
import { DefaultButton } from '@/styles/GlobalStyles';
import FeatureSection from '../components/FeatureSection';
import { motionAn_toLeft, motionAn_toRight } from '../../utils/framer-motion-settings';
import * as cookie from 'cookie'
import { GetServerSideProps } from 'next';
import { useDispatch } from 'react-redux';
import { fetchisUserLogged } from '../services/homepage';
import { setLogged } from '@/store/user/actions';


type HomePageProps = {
  isLogged: boolean;
};

export default function Home({ isLogged }: HomePageProps) {
  const dispatch = useDispatch();
  if (isLogged) {
    dispatch(setLogged());
  }

  return (
    <>
      <Head>
        <title>Cash Mosaic</title>
        <meta name="description" content="A personal finance application." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <HomepageContainer>

        <HeroSection>
          <LeftHeroContainer
            {...motionAn_toRight}
          >
            <HeroHeader>Take back control of your own money</HeroHeader>
            <HeroText>Cash Mosaic is a <span>personal finance application</span> that makes money management easy. The app is designed to streamline <span>expense tracking</span> and help you <span>save money</span>.</HeroText>
            <DefaultButton onClick={() => window.location.href = "/signup"}>Create your account</DefaultButton>
          </LeftHeroContainer>
          <RightHeroContainer
            {...motionAn_toLeft}
          >
            <HomeHeroImg src="/images/ipad.png" alt="An Ipad showing a finance web app" height={771} width={899} />
          </RightHeroContainer>
        </HeroSection>

        <FeatureSectionHeading>It&apos;s all about you</FeatureSectionHeading>
        <FeatureSectionSubHeading>GET YOUR OVERVIEW BACK</FeatureSectionSubHeading>
        <div>
          {/* FEATURES */}
          {features.featureCards.map((cardInfo, index) => (
            <FeatureSection key={index} cardInfo={cardInfo} index={index} />
          ))}
        </div>

      </HomepageContainer>
    </>
  )
}

export const getServerSideProps: GetServerSideProps<HomePageProps> = async (context) => {
  try {
    const cookieHeader = context.req.headers.cookie || '';
    const parsedCookies = cookie.parse(cookieHeader!);

    await fetchisUserLogged(parsedCookies.authToken);

    return {
      props: {
        isLogged: true,
      },
    };

  } catch (error) {
    console.error("Error in getServerSideProps[profile page]: ", error);

    return {
      props: {
        isLogged: false,
      },
    };
  }
};