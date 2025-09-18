"use client";
import { Button } from "@headlessui/react";
import { AiOutlineBars } from "react-icons/ai";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import DialogCard from "../../../components/DialogCard";
import AllDayTasks from "./AllDayTasks";

export default function CellButtons({ date, dayTasks, dayDeadlines }) {
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const html = document.documentElement;
        isOpen
            ? (html.style.overflow = "hidden")
            : (html.style.overflow = "");
    }, [isOpen]);

    return (
        <div className="flex gap-4 m-3 justify-end">
            <Button
                onClick={() => setIsOpen(true)}
                title="Список задач"
                className="ring-2 ring-blue-200  rounded-full px-2 cursor-pointer text-blue-400 size-8
                                hover:bg-blue-200 hover:text-blue-500"
            >
                <AiOutlineBars />
            </Button>
            {isOpen &&
                createPortal(
                    <DialogCard
                        title={`Задачи на ${date}`}
                        onClose={() => setIsOpen(false)}
                    ><AllDayTasks dayTasks={dayTasks} dayDeadlines={dayDeadlines}/></DialogCard>,
                    document.body
                )}
        </div>
    );
}
