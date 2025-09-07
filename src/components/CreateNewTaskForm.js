"use client"

import {
    Description,
    Field,
    Input,
    Label,
    Textarea,
    Checkbox,
    Listbox,
    ListboxButton,
    ListboxOption,
    ListboxOptions,
} from "@headlessui/react";

import clsx from "clsx";
import { useRef, useState, useContext } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { AppContext } from "@/app/store/appContext";

function getLocalDateTime() {
    const now = new Date();

    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");

    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");

    return `${year}-${month}-${day}T${hours}:${minutes}`;
}

export default function CreateNewTaskForm() {
    const { setTasks, projects } = useContext(AppContext);
    const today = getLocalDateTime();

    const title = useRef(null);
    const desc = useRef(null);
    const startDate = useRef(null);
    const endDate = useRef(null);
    const projectID = useRef(null);


    function handleTaskSubmit(e) {
        e.preventDefault();
        const data = {
            id: title.current.value + Date.now(),
            title: title.current.value,
            desc: desc.current.value,
            startDate: startDate.current.value,
            endDate: endDate.current.value,
            projectID: projectID.current.value,
            createdDate: today,
        };
        setTasks((prev) => [...prev, data]);
        e.target.reset();
    }

    return (
        <form
            onSubmit={handleTaskSubmit}
            className="w-full max-w-md px-4 flex flex-col self-center"
        >
            <Field className="mt-10">
                <Label className="text-lg text-gray-700 ">
                    Название задачи
                </Label>
                <Input
                    required
                    type="text"
                    className={clsx(
                        "mt-3 block w-full rounded-lg border-2 border-gray-300 bg-white px-3 py-1.5 text-sm/6 text-gray",
                        "focus:not-data-focus:outline-none data-focus:outline-2 data-focus:-outline-offset-2 data-focus:outline-gray-400/75"
                    )}
                    ref={title}
                />
            </Field>
            <Field className="mt-5">
                <Label className="text-lg text-gray-700 ">Описание</Label>
                <Textarea
                    rows={3}
                    className={clsx(
                        "mt-3 block w-full rounded-lg border-2 border-gray-300 bg-white px-3 py-1.5 text-sm/6 text-gray",
                        "focus:not-data-focus:outline-none data-focus:outline-2 data-focus:-outline-offset-2 data-focus:outline-gray-400/75"
                    )}
                    ref={desc}
                />
            </Field>
            <Field className="mt-5">
                <Label className="text-lg text-gray-700 ">Дата начала</Label>
                <Input
                    required
                    type="datetime-local"
                    defaultValue={today}
                    className={clsx(
                        "mt-3 block w-full rounded-lg border-2 border-gray-300 bg-white px-3 py-1.5 text-sm/6 text-gray",
                        "focus:not-data-focus:outline-none data-focus:outline-2 data-focus:-outline-offset-2 data-focus:outline-gray-400/75"
                    )}
                    ref={startDate}
                />
            </Field>
            <Field className="mt-5">
                <Label className="text-lg text-gray-700 ">Дата окончания</Label>
                <Input
                    required
                    type="datetime-local"
                    defaultValue={today}
                    className={clsx(
                        "mt-3 block w-full rounded-lg border-2 border-gray-300 bg-white px-3 py-1.5 text-sm/6 text-gray",
                        "focus:not-data-focus:outline-none data-focus:outline-2 data-focus:-outline-offset-2 data-focus:outline-gray-400/75"
                    )}
                    ref={endDate}
                />
            </Field>
            <Field className="mt-5">
                <Label className="text-lg text-gray-700 ">
                    Назначить проект
                </Label>
                <select
                    ref={projectID}
                    required
                    className={clsx(
                        "mt-3 block w-full rounded-lg border-2 border-gray-300 bg-white px-3 py-1.5 text-sm/6 text-gray",
                        "focus:not-data-focus:outline-none data-focus:outline-2 data-focus:-outline-offset-2 data-focus:outline-gray-400/75"
                    )}
                >
                   
                    
                        {projects.map((project) => (
                            <option 
                                key={project.id}
                                value={project.id}
                            >
                                    {project.title}
                            </option>
                        ))}
                  
                </select>
            </Field>

            <button
                type="submit"
                className={`w-50 h-12 mt-10 text-white rounded-full shadow-lg flex justify-center items-center
                            bg-blue-500 hover:bg-blue-600 cursor-pointer`}
            >
                <AiOutlinePlus />
                <span className="m-2">Создать задачу</span>
            </button>
        </form>
    );
}
