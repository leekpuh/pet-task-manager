"use client";

import { useEffect, useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import DialogCard from "./DialogCard";
import { createPortal } from "react-dom";
import clsx from "clsx";
import CreateNewTaskForm from "./CreateNewTaskForm";
import CreateNewProjectForm from "./CreateNewProjectForm";

export default function AddNewTaskButton() {
    const [showCreateOptions, setShowCreateOptions] = useState({
        list: false,
        project: false,
        task: false,
    });

    useEffect(() => {
        showCreateOptions.task || showCreateOptions.project
            ? (document.body.style.overflow = "hidden")
            : (document.body.style.overflow = "");
    }, [showCreateOptions.task, showCreateOptions.project]);

    return (
        <div className="fixed bottom-8 right-10 z-50 flex flex-col items-end">
            <div
                className={`transition-all duration-300 ease-in-out ${
                    !showCreateOptions.list ? "opacity-0" : "opacity-100"
                }`}
            >
                {showCreateOptions.list && (
                    <>
                        <button
                            className="text-white rounded-full shadow-xl flex justify-center items-center bg-blue-500 hover:bg-blue-600 cursor-pointer py-2 px-4 mb-3"
                            onClick={() =>
                                setShowCreateOptions((prev) => ({
                                    ...prev,
                                    list: false,
                                    project: true,
                                }))
                            }
                        >
                            Создать проект
                        </button>
                        <button
                            className="text-white rounded-full shadow-xl flex justify-center items-center bg-blue-500 hover:bg-blue-600 cursor-pointer py-2 px-4 mb-3"
                            onClick={() =>
                                setShowCreateOptions((prev) => ({
                                    ...prev,
                                    list: false,
                                    task: true,
                                }))
                            }
                        >
                            Создать задачу
                        </button>
                    </>
                )}
            </div>
            {!showCreateOptions.task && !showCreateOptions.project && (
                <button
                    className={clsx(
                        "size-12  text-white rounded-full shadow-xl flex justify-center items-center bg-blue-500 hover:bg-blue-600 cursor-pointer",
                        {
                            "bg-gray-400/75 hover:bg-gray-400":
                                showCreateOptions.list,
                        }
                    )}
                    onClick={() =>
                        setShowCreateOptions((prev) => ({
                            ...prev,
                            list: !prev.list,
                        }))
                    }
                >
                    <AiOutlinePlus
                        className={clsx({
                            "rotate-45 size-5": showCreateOptions.list,
                        })}
                    />
                </button>
            )}

            {showCreateOptions.task &&
                createPortal(
                    <DialogCard
                        title="Новая задача"
                        onClose={() =>
                            setShowCreateOptions((prev) => ({
                                ...prev,
                                task: false,
                            }))
                        }
                    >
                        <CreateNewTaskForm />
                    </DialogCard>,
                    document.body
                )}
            {showCreateOptions.project &&
                createPortal(
                    <DialogCard
                        title="Новый проект"
                        onClose={() =>
                            setShowCreateOptions((prev) => ({
                                ...prev,
                                project: false,
                            }))
                        }
                    >
                        <CreateNewProjectForm />
                    </DialogCard>,
                    document.body
                )}
        </div>
    );
}
