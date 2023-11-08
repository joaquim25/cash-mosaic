import { CardContainer, CardIcon, CardText, CardUnList } from "@/styles/CardBasicStyles"
import Image from "next/image"

type Card = {
    size: string;
    icon: string;
    color: string;
    content: string | string[];
}

function CardBasic({ card }: { card: Card }) {
    return (
        <CardContainer size={card.size} bgColor={card.color}>
            <CardIcon bgColor={card.color}>
                <Image src={card.icon} alt="sada" height={20} width={20} />
            </CardIcon>
            {
                typeof card.content === "object" ?
                    <CardUnList>
                        {card.content.map((item: string, index: number) => (
                            <li key={index}>{item}</li>
                        ))}
                    </CardUnList>
                    : <CardText>{card.content}</CardText>
            }
        </CardContainer>
    )
}

export default CardBasic