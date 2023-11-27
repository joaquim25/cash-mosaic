import dayjs from "dayjs"

export const getCurrentDate = () => {
    return dayjs()
}

export const get7DaysPriorDate = () => {
    const currentDate = dayjs();
    return currentDate.subtract(7, 'day');
}

export const getPriorMonthDate = () => {
    const currentDate = dayjs();
    return currentDate.subtract(1, 'month');
}

export const getPriorYearDate = () => {
    const currentDate = dayjs();
    return currentDate.subtract(1, 'year');
}