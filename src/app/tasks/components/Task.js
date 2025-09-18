import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { BsCardList } from "react-icons/bs";
import clsx from "clsx";
import DialogCard from "../../../components/DialogCard"
import TaskCardForm from "./TaskCardForm";

export default function Task({ task }) {
    const [showTaskCard, setShowTaskCard] = useState(false);
    const [expiredTask, setExpiredTask] = useState(false);

    useEffect(() => {
        new Date(task.endDate) < new Date()
            ? setExpiredTask(true)
            : setExpiredTask(false);
    });

    useEffect(() => {
        const html = document.documentElement;
        showTaskCard
            ? (html.style.overflow = "hidden")
            : (html.style.overflow = "");
    }, [showTaskCard]);

    return (
        <div className="shadow-lg border-1 border-gray-200 p-4 rounded-lg my-5 mx-5 overflow-auto h-fit break-words flex gap-2 flex-col">
            <div>{task.title}</div>
            <div
                className={clsx(
                    "w-fit py-1 px-3 rounded-lg flex justify-center items-center gap-3 text-sm",
                    { "bg-green-100": !expiredTask },
                    { "bg-red-100": expiredTask }
                )}
            >
                <div
                    className={clsx(
                        "size-2 bg-green-500 rounded-full",
                        { "bg-green-500": !expiredTask },
                        { "bg-red-500": expiredTask }
                    )}
                ></div>
                Дедлайн{" "}
                {new Date(task.endDate).toLocaleDateString("ru-RU", {
                    day: "2-digit",
                    month: "long",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                })}
            </div>
            <button
                title="Карточка задачи"
                onClick={() => setShowTaskCard(true)}
                className="size-10 bg-blue-100 flex items-center justify-center self-end text-blue-400 shadow-lg text-lg rounded-full hover:bg-blue-200/75 cursor-pointer"
            >
                <BsCardList />
            </button>
            {showTaskCard &&
                createPortal(
                    <DialogCard
                        title="Карточка задачи"
                        onClose={() => setShowTaskCard(false)}
                    > <TaskCardForm task={task}/></DialogCard>,
                    document.body
                )}
        </div>
    );
}
