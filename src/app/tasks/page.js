"use client";

import { useSearchParams } from "next/navigation";

import { useState, useEffect, useContext } from "react";
import TaskCard from "./components/TaskCard";
import { getAllTasks } from "../api/tasks";
import { ReRenderPageContext } from "../context/reRenderPageContext";

export default function ProjectTasks() {
    const { reRenderTasks } = useContext(ReRenderPageContext);
    const searchParams = useSearchParams();
    const projectID = searchParams.get("projectID");

    const [tasks, setTasks] = useState([]);
    useEffect(() => {
        getAllTasks()
            .then((data) => setTasks(data))
            .catch((err) => console.error(err));
    }, [, reRenderTasks]);

    return (
        <div className="m-5">
            <div className="flex">
                <div className="bg-gray-200 py-2 px-5 w-fit text-center rounded-t-xl z-20">
                    Задачи проекта
                </div>
                <div className="bg-blue-200 py-2 px-5  pl-8 w-fit text-center rounded-tr-xl -translate-x-3 z-10">
                    title
                </div>
            </div>
            <hr className="border-2 border-gray-200/75 " />
            <div className="pt-5 grid grid-cols-3 h-full">
                {/* Создано */}
                <div className="border-r-2 border-gray-200/75 px-15">
                    <div className="text-center bg-blue-200/75 p-2 rounded-t-xl">
                        Создано
                    </div>
                    {tasks
                        .filter(
                            (task) => String(task.projectData.id) === projectID
                        )
                        .map((task) => (
                            <TaskCard key={task.id} task={task} />
                        ))}
                </div>
                {/* В работе */}
                <div className="px-15">
                    <div className="text-center bg-orange-200/75 p-2 rounded-t-xl">
                        В работе
                    </div>
                </div>
                {/* Завершено */}
                <div className="border-l-2 border-gray-200/75 px-15">
                    <div className="text-center bg-green-200/75 p-2 rounded-t-xl">
                        Завершено
                    </div>
                </div>
            </div>
        </div>
    );
}
