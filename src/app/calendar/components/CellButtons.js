"use client";
import { Button } from "@headlessui/react";
import { AiOutlinePlus, AiOutlineBars } from "react-icons/ai";
import { useState } from "react";
import { createPortal } from "react-dom";
import CreateNewTask from "@/components/CreateNewTask";


export default function CellButtons({ dateID }) {
    const [showCreateTask, setShowCreateTask] = useState(false);
    return (
        <div className="flex gap-4 m-3 justify-end">
            <Button
               
                title="Список задач"
                className="ring-2 ring-blue-200  rounded-full px-2 cursor-pointer text-blue-400 
                                hover:bg-blue-200 hover:text-blue-500"
            >
                <AiOutlineBars />
            </Button>
            <Button
                title="Добавить событие"
                onClick={() => setShowCreateTask(true)}
            >
                <AiOutlinePlus
                    className="ring-2 ring-blue-200 size-6 rounded-full text-blue-300 cursor-pointer
                                            hover:bg-blue-200 hover:text-blue-300"
                />
            </Button>
            {showCreateTask &&
                createPortal(
                    <CreateNewTask onClose={() => setShowCreateTask(false)} />,
                    document.body
                )}
        </div>
    );
}
