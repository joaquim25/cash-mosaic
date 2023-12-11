/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import categories from "../../../public/data/categories.json";
import React from 'react'
import { CategorieCard, CategoriesGridContainer } from "./styles";

type CategoriesGridProps = {
    type: "income" | "expenses";
    onCategorySelection: (name: string) => void;
    category: string | undefined;
}

type CategoriesData = {
    label: string,
    src: string,
    bgColor: string,
}[]

function CategoriesGrid({ type, onCategorySelection, category }: CategoriesGridProps) {
    const categoriesData = categories[type]

    return (
        <CategoriesGridContainer>
            {categoriesData.map((categoryInfo, index) => (
                <CategorieCard
                    key={index}
                    $squareColor={categoryInfo.bgColor}
                    onClick={() => onCategorySelection(categoryInfo.label)}
                    $isSelected={category == categoryInfo.label}
                >
                    <img src={categoryInfo.src} />
                    <p>{categoryInfo.label}</p>
                </CategorieCard>
            ))}
        </CategoriesGridContainer>
    )
}

export default CategoriesGrid