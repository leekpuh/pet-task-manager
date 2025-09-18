"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { BsCardList, BsList } from "react-icons/bs";
import { createPortal } from "react-dom";
import clsx from "clsx";
import DialogCard from "../../../components/DialogCard"
import ProjectCardForm from "./ProjectCardForm";

export default function Project({ project }) {
    const [showProjectCard, setShowProjectCard] = useState(false);
    const [expiredProject, setExpiredProject] = useState(false);

    useEffect(() => {
        new Date(project.endDate) < new Date()
            ? setExpiredProject(true)
            : setExpiredProject(false);
    });

    useEffect(() => {
        const html = document.documentElement;
        showProjectCard
            ? (html.style.overflow = "hidden")
            : (html.style.overflow = "");
    }, [showProjectCard]);

    return (
        <div className="w-full h-auto bg-white p-5 rounded-xl shadow-lg flex flex-col gap-4 border-2 border-gray-200">
            <div className="break-words">{project.title}</div>
            <div className="bg-gray-200 w-fit py-1 px-3 rounded-lg flex justify-center items-center gap-3 text-sm">
                <div className="size-2 bg-gray-500 rounded-full"></div>Начало{" "}
                {new Date(project.startDate).toLocaleDateString("ru-RU", {
                    day: "2-digit",
                    month: "long",
                    year: "numeric",
                })}
            </div>
            <div
                className={clsx(
                    "w-fit py-1 px-3 rounded-lg flex justify-center items-center gap-3 text-sm",
                    { "bg-green-100": !expiredProject },
                    { "bg-red-100": expiredProject }
                )}
            >
                <div
                    className={clsx(
                        "size-2 bg-green-500 rounded-full",
                        { "bg-green-500": !expiredProject },
                        { "bg-red-500": expiredProject }
                    )}
                ></div>
                Дедлайн{" "}
                {new Date(project.endDate).toLocaleDateString("ru-RU", {
                    day: "2-digit",
                    month: "long",
                    year: "numeric",
                })}
            </div>
            <div className="flex justify-end gap-2">
                <button
                    title="Карточка проекта"
                    onClick={() => setShowProjectCard(true)}
                    className="size-10 bg-blue-50 flex items-center justify-center text-blue-400 text-lg rounded-full hover:bg-blue-100/75 cursor-pointer border-2 border-blue-200"
                >
                    <BsCardList />
                </button>
                <Link
                    href={{
                        pathname: "/tasks",
                        query: { projectID: project.id },
                    }}
                    className="bg-blue-50  w-fit px-4 py-2 rounded-full flex gap-2 text-center text-blue-700 items-center border-2 border-blue-200 cursor-pointer hover:bg-blue-100/75"
                >
                    <BsList /> Список задач
                </Link>
            </div>
            {showProjectCard &&
                createPortal(
                    <DialogCard
                        title="Карточка проекта"
                        onClose={() => setShowProjectCard(false)}
                    >
                        <ProjectCardForm project={project} />
                    </DialogCard>,
                    document.body
                )}
        </div>
    );
}
