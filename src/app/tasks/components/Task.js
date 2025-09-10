import { useState } from "react";
import { createPortal } from "react-dom";
import { BsCardList } from "react-icons/bs";
import TaskCard from "./TaskCard";

export default function Task({ task }) {
    const [showTaskCard, setShowTaskCard] = useState(false);
    return (
        <div className="shadow-lg border-1 border-gray-200 p-4 rounded-lg my-5 mx-5 overflow-auto h-fit break-words">
            <div>{task.title}</div>
            <div className="w-full flex justify-between mt-2">
                 <div className="bg-green-100 w-fit py-1 px-3 rounded-lg flex justify-center items-center gap-3 text-sm">
                <div className="size-2 bg-green-500 rounded-full"></div>Дедлайн{" "}
                {new Date(task.endDate).toLocaleDateString("RU-ru", {
                    day: "2-digit",
                    month: "long",
                    year: "numeric",
                })}
            </div>
                <button
                    title="Карточка задачи"
                    onClick={() => setShowTaskCard(true)}
                    className="size-10 bg-blue-100 flex items-center justify-center text-blue-400 shadow-lg text-lg rounded-full hover:bg-blue-200/75 cursor-pointer"
                >
                    <BsCardList />
                </button>
            </div>
            {showTaskCard &&
                createPortal(
                    <TaskCard
                        task={task}
                        onClose={() => setShowTaskCard(false)}
                    />,
                    document.body
                )}
        </div>
    );
}
