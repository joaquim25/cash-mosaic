import { CardsContainer, FeatureContainer, FeatureHeading, FeatureImg, FeatureSubHeading, FeatureText, SectionInfoCol } from "@/styles/FeatureSectionStyles";
import CardBasic from "./CardBasic";

type FeatureCard = {
  title: string;
  subHeading: string;
  heading: string;
  text: string;
  image: {
    src: string;
    alt: string;
    height: number;
    width: number;
  };
  sidePanels?: {
    size: string;
    icon: string;
    color: string;
    content: string[] | string;
  }[];
};

function FeatureSection({ cardInfo, index }: { cardInfo: FeatureCard, index: number }) {


  return (
    <FeatureContainer isInverted={index % 2 === 1}>
      <SectionInfoCol>
        <FeatureSubHeading>{cardInfo.subHeading}</FeatureSubHeading>
        <FeatureHeading>{cardInfo.heading}</FeatureHeading>
        <FeatureText>{cardInfo.text}</FeatureText>
      </SectionInfoCol>
      <FeatureImg isInverted={index % 2 === 1} src={cardInfo.image.src} alt={cardInfo.image.alt} height={cardInfo.image.height} width={cardInfo.image.width} />
      <CardsContainer>
        {cardInfo.sidePanels && cardInfo.sidePanels.map((card, index) => (
          <CardBasic card={card} key={index} />
        ))}
      </CardsContainer>
    </FeatureContainer>
  );
}

export default FeatureSection;