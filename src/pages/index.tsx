import features from '../../public/data/features.json';
import Head from 'next/head'
import { FeatureSectionHeading, FeatureSectionSubHeading, HeroHeader, HeroSection, HeroText, HomeHeroImg, HomepageContainer, LeftHeroContainer, RightHeroContainer } from '@/styles/HomeStyles'
import { DefaultButton } from '@/styles/GlobalStyles';
import FeatureSection from '../components/FeatureSection/FeatureSection';


export default function Home() {

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
          <LeftHeroContainer>
            <HeroHeader>Take back control of your own money</HeroHeader>
            <HeroText>Cash Mosaic is a <span>personal finance application</span> that makes money management easy. The app is designed to streamline <span>expense tracking</span> and help you <span>save money</span>.</HeroText>
            <DefaultButton>Create your account</DefaultButton>
          </LeftHeroContainer>
          <RightHeroContainer>
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
