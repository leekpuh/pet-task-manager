"use client";

import { useSearchParams } from "next/navigation";
import { AppContext } from "../store/appContext";
import { useContext } from "react";
import TaskCard from "./components/TaskCard";

export default function ProjectTasks() {
    const searchParams = useSearchParams();
    const projectID = searchParams.get("projectID");
    const projectTitle = searchParams.get("projectTitle");

    const { tasks, setTasks } = useContext(AppContext);

    return (
        <div className="m-5">
            <div className="flex">
                <div className="bg-gray-200 py-2 px-5 w-fit text-center rounded-t-xl z-20">
                    Задачи проекта
                </div>
                <div className="bg-blue-200 py-2 px-5  pl-8 w-fit text-center rounded-tr-xl -translate-x-3 z-10">
                    {projectTitle}
                </div>
            </div>
            <hr className="border-2 border-gray-200/75 " />
            {tasks
                .filter((task) => String(task.projectID) === projectID)
                .map((task) => (
                    <TaskCard key={task.id} task={task}/>
                ))}
        </div>
    );
}
