"use client";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { BsCardList } from "react-icons/bs";
import DialogCard from "../../../components/DialogCard";
import TaskCardForm from "@/app/tasks/components/TaskCardForm";

export default function AllDayTasks({ dayTasks, dayDeadlines }) {
    const [selectedTask, setSelectedTask] = useState(null);

    useEffect(() => {
        selectedTask
            ? (document.body.style.overflow = "hidden")
            : (document.body.style.overflow = "");
    }, [selectedTask]);

    return (
        <div className="my-5 ">
            <div className="w-full bg-green-200 p-2 rounded-t-xl">
                Все задачи
            </div>
            <div className="flex flex-col gap-5">
                {dayTasks
                    .filter((task) => task.status !== "done")
                    .map((task) => (
                        <div
                            key={task.id}
                            className="w-full h-fit bg-white shadow-lg p-2 flex justify-between gap-2 items-center min-h-25"
                        >
                            <div className="flex flex-col gap-2">
                                <div className="break-all w-3/4 text-sm">
                                    {task.title}
                                </div>

                                <div className="bg-green-100 p-1 px-2 rounded-xl w-fit text-sm">
                                    Дедлайн{" "}
                                    {new Date(task.endDate).toLocaleDateString(
                                        "ru-RU",
                                        {
                                            day: "2-digit",
                                            month: "long",
                                            year: "numeric",
                                            hour: "2-digit",
                                            minute: "2-digit",
                                        }
                                    )}
                                </div>
                            </div>
                            <div className="flex  self-end">
                                <button
                                    title="Карточка задачи"
                                    onClick={() => setSelectedTask(task)}
                                    className="size-10 bg-blue-100 flex items-center justify-center self-end text-blue-400 shadow-lg text-lg rounded-full hover:bg-blue-200/75 cursor-pointer"
                                >
                                    <BsCardList />
                                </button>
                            </div>
                        </div>
                    ))}
            </div>

            <div className="w-full bg-orange-200 p-2 rounded-t-xl mt-5">
                Дедлайн сегодня
            </div>
            <div className="flex flex-col gap-5">
                {dayDeadlines.map((task) => (
                    <div
                        key={task.id}
                        className="w-full h-fit bg-white shadow-lg p-2 flex justify-between gap-2"
                    >
                        <div className="flex flex-col gap-2">
                            <div className="break-all w-3/4 text-sm">
                                {task.title}
                            </div>

                            <div className="bg-orange-100 p-1 px-2 rounded-xl w-fit text-sm">
                                Дедлайн{" "}
                                {new Date(task.endDate).toLocaleDateString(
                                    "ru-RU",
                                    {
                                        day: "2-digit",
                                        month: "long",
                                        year: "numeric",
                                        hour: "2-digit",
                                        minute: "2-digit",
                                    }
                                )}
                            </div>
                        </div>
                        <div className="flex  self-end">
                            <button
                                title="Карточка задачи"
                                onClick={() => setSelectedTask(task)}
                                className="size-10 bg-blue-100 flex items-center justify-center text-blue-400 shadow-lg text-lg rounded-full hover:bg-blue-200/75 cursor-pointer"
                            >
                                <BsCardList />
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {selectedTask &&
                createPortal(
                    <DialogCard
                        title="Карточка задачи"
                        onClose={() => setSelectedTask(null)}
                    >
                        <TaskCardForm task={selectedTask} />
                    </DialogCard>,
                    document.body
                )}
        </div>
    );
}
