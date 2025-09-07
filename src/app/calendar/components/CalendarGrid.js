"use client";

import clsx from "clsx";
import CellButtons from "./CellButtons";
import { useState, useContext } from "react";

export default function CalendarGrid({ currentDate, days, year, month }) {
    const [hoveredCell, setHoveredCell] = useState({
        index: null,
        isOpen: false,
    });

    return (
        <div className="grid grid-cols-7 gap-3 text-center w-full px-10 mb-22">
            {["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"].map((day, idx) => (
                <div
                    key={day}
                    className={`flex items-center justify-center text-lg border-r-2 border-b-2 border-gray-300 rounded-lg h-10  ${
                        idx >= 5
                            ? "text-red-400 bg-red-100/65"
                            : "text-blue-500 bg-blue-100/65"
                    }`}
                >
                    {day}
                </div>
            ))}

            {days.map((day, idx) => {
                const dayOfWeek = new Date(
                    year,
                    month + day.monthOffset,
                    day.dayNum
                ).getDay();
                const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
                const isToday =
                    day.currentMonth &&
                    day.dayNum === currentDate.getDate() &&
                    month === currentDate.getMonth() &&
                    year === currentDate.getFullYear();

                return (
                    <div
                        key={idx}
                        onMouseEnter={() =>
                            setHoveredCell({ index: idx, isOpen: true })
                        }
                        onMouseLeave={() =>
                            setHoveredCell({ index: null, isOpen: false })
                        }
                        className={clsx(
                            "flex border-b-1 border-r-1 border-gray-200 rounded-xl min-h-40 flex-col justify-between",
                            {
                                "bg-gray-100 cursor-not-allowed":
                                    !day.currentMonth,
                                "bg-white hover:ring-2 hover:ring-blue-200":
                                    day.currentMonth,
                                "ring-2 ring-green-300 ": isToday,
                            }
                        )}
                    >
                        <div
                            className={clsx(
                                "size-8 m-2 rounded-full flex items-center justify-center",
                                {
                                    "bg-red-100 text-red-800":
                                        isWeekend && day.currentMonth,
                                    "bg-blue-100 text-blue-800":
                                        !isWeekend && day.currentMonth,
                                    "bg-gray-200 text-gray-400":
                                        !day.currentMonth,
                                    "bg-green-200 font-bold ": isToday,
                                }
                            )}
                        >
                            {day.dayNum}
                        </div> 
                        {/* IIFE
                        {(() => {
                            const countMatch = newCalendarOcc.filter(
                                (item) => item.startDate === day.dateID
                            ).length;
                            return countMatch > 0 ? (
                                <div className="text-sm px-4 gap-2 bottom-0 bg-green-50 rounded-full p-1 m-2 flex shadow-lg ">
                                    <p className="text-gray-600">Количество задач:</p>
                                    <p className="bg-green-200 size-5 p-3 text-center rounded-full flex items-center justify-center ">
                                        {countMatch}
                                    </p>
                                </div>
                            ) : null;
                        })()} */}

                        <div
                            className={`transition-all duration-300 ${
                                hoveredCell.isOpen && hoveredCell.index === idx
                                    ? "opacity-100 translate-y-0"
                                    : "opacity-0 translate-y-8"
                            }`}
                        >
                            {day.currentMonth && <CellButtons dateID={day.dateID}/>}
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
