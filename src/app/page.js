"use client";
import { useEffect, useState } from "react";
import { getAllTasks } from "./api/tasks";

export default function Home() {
    const [tasks, setTasks] = useState([]);
    const [statusesCount, setStatusesCount] = useState({});
    useEffect(() => {
        getAllTasks().then((data) => setTasks(data));
    }, []);
    useEffect(() => {
        const created = tasks.filter((task) => task.status === "created");
        const inProcess = tasks.filter((task) => task.status === "inProcess");
        const inTest = tasks.filter((task) => task.status === "inTest");
        const outOfDeadline = tasks.filter(
            (task) =>
                new Date(task.endDate) < new Date() && task.status !== "done"
        );
        setStatusesCount({
            createdCount: created.length,
            inProcessCount: inProcess.length,
            inTestCount: inTest.length,
            outOfDeadlineCount: outOfDeadline.length,
        });
    }, [tasks]);
    return (
        <div className="flex h-full">
            <div className="p-5 shadow-xl m-5 rounded-lg h-fit w-fit bg-gray-100">
                <div className="text-center text-lg">Счетчик задач</div>
                <div className="flex">
                    <div className="w-35 bg-gray-300/75 p-4 rounded-2xl h-40 m-5 flex flex-col justify-between items-center">
                        В ожидании
                        <div className="size-17 bg-gray-100 rounded-2xl flex items-center justify-center text-2xl">
                            {statusesCount?.createdCount}
                        </div>
                    </div>
                    <div className="w-35 bg-green-300/75 p-4 rounded-2xl h-40 m-5 flex flex-col justify-between items-center">
                        В работе
                        <div className="size-17 bg-green-100 rounded-2xl flex items-center justify-center text-2xl">
                            {statusesCount?.inProcessCount}
                        </div>
                    </div>
                    <div className="w-35 bg-orange-200/75 p-4 rounded-2xl h-40 m-5 flex flex-col justify-between items-center">
                        На проверке
                        <div className="size-17 bg-orange-100 rounded-2xl flex items-center justify-center text-2xl">
                            {statusesCount?.inTestCount}
                        </div>
                    </div>
                    <div className="w-35 bg-red-300/75 p-4 rounded-2xl h-40 m-5 flex flex-col justify-between items-center">
                        Просрочены
                        <div className="size-17 bg-red-100 rounded-2xl flex items-center justify-center text-2xl">
                            {statusesCount?.outOfDeadlineCount}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
