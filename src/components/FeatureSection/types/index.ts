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