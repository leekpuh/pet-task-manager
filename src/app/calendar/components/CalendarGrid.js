"use client";

import clsx from "clsx";
import CellButtons from "./CellButtons";
import { useState, useContext, useEffect } from "react";
import { getAllTasks } from "@/app/api/tasks";
import { ReRenderPageContext } from "@/app/context/reRenderPageContext";

export default function CalendarGrid({ currentDate, days, year, month }) {
    const { reRenderTasks } = useContext(ReRenderPageContext);

    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        getAllTasks().then((data) => setTasks(data));
    }, [reRenderTasks]);
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

                const dayTasks = tasks.filter((task) =>
                    task.allDates.includes(day.dateID) && task.status !== "done"
                );

                const dayDeadlines = tasks.filter(
                    (task) => day.dateID === task.endDate.split("T")[0] && task.status !== "done"
                );

                return (
                    <div
                        key={idx}
                        className={clsx(
                            "flex border-b-1 border-r-1 border-gray-200 rounded-xl min-h-40 flex-col justify-between group relative",
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

                        <div className="flex mt-2 flex-col gap-2">
                            {dayTasks.length > 0 && (
                                <div className="bg-purple-200/75 rounded-full w-fit px-1  text-sm ml-2 pl-3 p-1 flex items-center justify-center">
                                    Задач:
                                    <div className="text-sm size-6 bg-white rounded-full ml-1 flex items-center justify-center">
                                        {dayTasks.length}
                                    </div>
                                </div>
                            )}
                            {dayDeadlines.length > 0 && (
                                <div className="bg-orange-200/75 rounded-full w-fit px-1 text-sm ml-2 pl-3 p-1 flex items-center justify-center">
                                    Дедлайн:
                                    <div className="text-sm size-6 bg-white rounded-full ml-1 flex items-center justify-center">
                                        {dayDeadlines.length}
                                    </div>
                                </div>
                            )}
                        </div>

                            <div className="group-hover:opacity-100 opacity-0 transition-all duration-300">
                                <CellButtons dayTasks={dayTasks} dayDeadlines={dayDeadlines} day={day}/>
                            </div>
                    </div>
                );
            })}
        </div>
    );
}
