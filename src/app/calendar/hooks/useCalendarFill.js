import { useMemo } from "react";

export default function useCalendarFill(year, month) {
    return useMemo(() => {
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        const lastDayPrevMonth = new Date(year, month, 0);
        const daysArray = [];

        let dayInWeek = firstDay.getDay();
        if (dayInWeek === 0) dayInWeek = 7; // Воскресенье — в конец

        // Предыдущий месяц (хвост слева)
        for (
            let i = lastDayPrevMonth.getDate() - (dayInWeek - 2);
            i <= lastDayPrevMonth.getDate();
            i++
        ) {
            daysArray.push({
                dayNum: i,
                currentMonth: false,
                monthOffset: -1,
            });
        }
        // Текущий месяц
        for (let i = 1; i <= lastDay.getDate(); i++) {
            daysArray.push({
                dayNum: i,
                currentMonth: true,
                monthOffset: 0,
                dateID: formatDate(year, month, i)
            });
        }

        // Следующий месяц (хвост справа)
        const totalSlots = 42;
        const currentLength = daysArray.length;
        for (let i = 1; i <= totalSlots - currentLength; i++) {
            daysArray.push({
                dayNum: i,
                currentMonth: false,
                monthOffset: 1,
            });
        }

        return daysArray;
    }, [year, month]);
}

function formatDate(year, month, day) {
     return `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
}