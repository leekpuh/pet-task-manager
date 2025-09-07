"use client";

import { useState, useEffect } from "react";
import CalendarHeader from "./components/CalendarHeader";
import CalendarGrid from "./components/CalendarGrid";
import useCalendarFill from "./hooks/useCalendarFill";

export default function Calendar() {
    const currentDate = new Date();
    const [year, setYear] = useState(currentDate.getFullYear());
    const [month, setMonth] = useState(currentDate.getMonth());
    const days = useCalendarFill(year, month);
    
    const incrementMonth = () => {
        let countMonth = 0;
        countMonth = month + 1;
        if (countMonth > 11) {
            setYear(prev => prev + 1);
            setMonth(0);
            return;
        }
        return setMonth(countMonth);
    };

    const decrementMonth = () => {
        let countMonth = 0;
        countMonth = month - 1;
        if (countMonth < 0) {
            setYear(prev => prev - 1);
            setMonth(11);
            return;
        }
        return setMonth(countMonth);
    };

    return (
        <>
            <CalendarHeader
                year={year}
                setYear={setYear}
                month={month}
                incrementMonth={incrementMonth}
                decrementMonth={decrementMonth}
                currentDate={currentDate}
            />
            <CalendarGrid
                currentDate={currentDate}
                days={days}
                year={year}
                month={month}
            />
        </>
    );
}
