import React from 'react'
import { StatisticsChartContainer, StatisticsPieChart } from './styles';


type StatisticsChartProps = {
    type: "day" | "week" | "month" | "year" | "range";
    data: any;
}

function StatisticsChart({ data }: StatisticsChartProps) {
    data.forEach((item: { value: number; }) => {
        item.value = Math.abs(item.value);
    });
    return (
        <StatisticsChartContainer>
            <StatisticsPieChart
                series={[
                    {
                        data,
                        innerRadius: 60,
                        outerRadius: 90,
                        paddingAngle: 2,
                        cornerRadius: 2,
                        highlightScope: { faded: 'global', highlighted: 'item' },
                        faded: { innerRadius: 40, additionalRadius: -20, color: 'gray' },
                    },
                ]}
                width={500}
                height={300}

            />
        </StatisticsChartContainer>
    )
}

export default StatisticsChart

