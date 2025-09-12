"use client";

import { deleteProject, patchProject } from "@/app/api/projects";
import { deleteTask, getAllTasks } from "@/app/api/tasks";
import { ReRenderPageContext } from "@/app/context/reRenderPageContext";
import { Field, Input, Label, Textarea } from "@headlessui/react";
import clsx from "clsx";
import { useState, useRef, useContext } from "react";
import { BsPencil, BsSave, BsTrash } from "react-icons/bs";

export default function ProjectCardForm({ project }) {
    const { setReRenderProjects } = useContext(ReRenderPageContext);
    const [editOn, setEditOn] = useState(false);

    const title = useRef(null);
    const desc = useRef(null);
    const startDate = useRef(null);
    const endDate = useRef(null);

    function handleProjectSubmit(e) {
        e.preventDefault();
        const data = {
            title: title.current.value,
            desc: desc.current.value,
            startDate: startDate.current.value,
            endDate: endDate.current.value,
        };
        patchProject(project.id, data).then(() => {
            setReRenderProjects((prev) => !prev);
        });
    }

    function handleDeleteProject() {
        deleteProject(project.id)
            .then(
                getAllTasks().then((tasks) =>
                    tasks.map((task) => {
                        if (task.projectData.id === project.id) {
                            deleteTask(task.id);
                        }
                    })
                )
            )
            .then(() => {
                setReRenderProjects((prev) => !prev);
            });
    }

    return (
        <form onSubmit={handleProjectSubmit} className="w-full">
            <Field className="mt-10">
                <Label className="text-lg text-gray-700 ">Проект</Label>
                <Input
                    ref={title}
                    required
                    disabled={!editOn}
                    type="text"
                    defaultValue={project.title}
                    className={clsx(
                        "mt-3 block w-full rounded-lg border-2 border-gray-300 bg-white px-3 py-1.5 text-sm/6 text-gray",
                        "focus:not-data-focus:outline-none data-focus:outline-2 data-focus:-outline-offset-2 data-focus:outline-gray-400/75",
                        "disabled:bg-gray-50 disabled:border-gray-200 disabled:border-double disabled:border-7"
                    )}
                />
            </Field>
            <Field className="mt-2">
                <Label className="text-lg text-gray-700 ">Описание</Label>
                <Textarea
                    ref={desc}
                    rows={5}
                    disabled={!editOn}
                    defaultValue={project.desc}
                    className={clsx(
                        "mt-3 block w-full rounded-lg border-2 border-gray-300 bg-white px-3 py-1.5 text-sm/6 text-gray",
                        "focus:not-data-focus:outline-none data-focus:outline-2 data-focus:-outline-offset-2 data-focus:outline-gray-400/75",
                        "disabled:bg-gray-50 disabled:border-gray-200 disabled:border-double disabled:border-7"
                    )}
                />
            </Field>
            <Field className="mt-5">
                <Label className="text-lg text-gray-700 ">Дата начала</Label>
                <Input
                    ref={startDate}
                    required
                    type="date"
                    disabled={!editOn}
                    defaultValue={project.startDate}
                    className={clsx(
                        "mt-3 block w-full rounded-lg border-2 border-gray-300 bg-white px-3 py-1.5 text-sm/6 text-gray",
                        "focus:not-data-focus:outline-none data-focus:outline-2 data-focus:-outline-offset-2 data-focus:outline-gray-400/75",
                        "disabled:bg-gray-50 disabled:border-gray-200 disabled:border-double disabled:border-7"
                    )}
                />
            </Field>
            <Field className="mt-5">
                <Label className="text-lg text-gray-700 ">Дата окончания</Label>
                <Input
                    required
                    ref={endDate}
                    type="date"
                    disabled={!editOn}
                    defaultValue={project.endDate}
                    className={clsx(
                        "mt-3 block w-full rounded-lg border-2 border-gray-300 bg-white px-3 py-1.5 text-sm/6 text-gray",
                        "focus:not-data-focus:outline-none data-focus:outline-2 data-focus:-outline-offset-2 data-focus:outline-gray-400/75",
                        "disabled:bg-gray-50 disabled:border-gray-200 disabled:border-double disabled:border-7"
                    )}
                />
            </Field>
            <div className="flex w-full justify-between gap-3 mt-10">
                <button
                    type="button"
                    title="Удалить проект"
                    onClick={handleDeleteProject}
                    className="w-fit py-2 px-5  rounded-full bg-red-400 text-lg flex items-center justify-center gap-2 shadow-lg hover:bg-red-500/75 cursor-pointer"
                >
                    <BsTrash /> Удалить
                </button>
                <div className="flex gap-2">
                    <button
                        title="Сохранить изменения"
                        type="submit"
                        onClick={() => setEditOn((prev) => !prev)}
                        hidden={!editOn}
                        className="w-fit py-2 px-5 rounded-full bg-green-200 text-lg flex items-center justify-center gap-2 shadow-lg hover:bg-green-300/75 cursor-pointer"
                    >
                        <BsSave /> Сохранить
                    </button>
                    {!editOn && (
                        <button
                            type="button"
                            title="Редактировать проект"
                            onClick={() => setEditOn((prev) => !prev)}
                            className="w-fit py-2 px-5  rounded-full bg-orange-200 text-lg flex items-center justify-center gap-2 shadow-lg hover:bg-orange-300/75 cursor-pointer"
                        >
                            <BsPencil /> Изменить
                        </button>
                    )}
                    {editOn && (
                        <button
                            type="button"
                            title="Отменить редактирование"
                            onClick={() => setEditOn((prev) => !prev)}
                            className="w-fit py-2 px-5  rounded-full bg-gray-200 text-lg flex items-center justify-center gap-2 shadow-lg hover:bg-gray-300/75 cursor-pointer"
                        >
                            <BsPencil /> Отмена
                        </button>
                    )}
                </div>
            </div>
        </form>
    );
}
