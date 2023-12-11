import { CardsContainer, FeatureContainer, FeatureHeading, FeatureImg, FeatureSubHeading, FeatureText, SectionInfoCol } from "@/components/FeatureSection/styles";
import FeatureCard from "../FeatureCard";
import { motionAn_toLeft, motionAn_toRight } from "../../../utils/framer-motion-settings";

type FeatureSectionProps = {
  cardInfo: {
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
  },
  index: number;
};

function FeatureSection({ cardInfo, index }: FeatureSectionProps) {


  return (
    <FeatureContainer
      $isInverted={index % 2 === 1}
    >
      <SectionInfoCol
        {...index % 2 === 1 ? motionAn_toLeft : motionAn_toRight}
      >
        <FeatureSubHeading>{cardInfo.subHeading}</FeatureSubHeading>
        <FeatureHeading>{cardInfo.heading}</FeatureHeading>
        <FeatureText>{cardInfo.text}</FeatureText>
      </SectionInfoCol>
      <FeatureImg
        $isInverted={index % 2 === 1}
        src={cardInfo.image.src}
        alt={cardInfo.image.alt}
        height={cardInfo.image.height}
        width={cardInfo.image.width}
        {...index % 2 === 1 ? motionAn_toRight : motionAn_toLeft}
      />
      <CardsContainer
        {...index % 2 === 1 ? motionAn_toLeft : motionAn_toRight}
      >
        {cardInfo.sidePanels && cardInfo.sidePanels.map((card, index) => (
          <FeatureCard card={card} key={index} />
        ))}
      </CardsContainer>
    </FeatureContainer>
  );
}

export default FeatureSection;