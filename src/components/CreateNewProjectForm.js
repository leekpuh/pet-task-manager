"use client"

import {
    Description,
    Field,
    Input,
    Label,
    Textarea,
    Checkbox,
} from "@headlessui/react";
import clsx from "clsx";
import { useRef, useState, useContext } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { AppContext } from "@/app/store/appContext";



export default function CreateNewProjectForm() {
    const {projects, setProjects} = useContext(AppContext)
    const today = new Date().toISOString().split("T");

    const title = useRef(null);
    const desc = useRef(null);
    const startDate = useRef(null);
    const endDate = useRef(null);

    function handleProjectSubmit(e) {
        e.preventDefault();
        const data = {
            id: title.current.value + Date.now(),
            title: title.current.value,
            desc: desc.current.value,
            startDate: startDate.current.value,
            endDate: endDate.current.value,
            createdDate: today[0]
        };


        setProjects((prev) => [...prev, data]);
        e.target.reset();
    }

    return (
        <form
            onSubmit={handleProjectSubmit}
            className="w-full max-w-md px-4 flex flex-col self-center"
        >
            <Field className="mt-10">
                <Label className="text-lg text-gray-700 ">
                    Название проекта
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
                <Label className="text-lg text-gray-700 ">
                    Описание
                </Label>
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
                <Label className="text-lg text-gray-700 ">
                    Дата начала 
                </Label>
                <Input
                    required
                    type="date"
                    defaultValue={today[0]}
                    className={clsx(
                        "mt-3 block w-full rounded-lg border-2 border-gray-300 bg-white px-3 py-1.5 text-sm/6 text-gray",
                        "focus:not-data-focus:outline-none data-focus:outline-2 data-focus:-outline-offset-2 data-focus:outline-gray-400/75"
                    )}
                    ref={startDate}
                />
            </Field>
            <Field className="mt-5">
                <Label className="text-lg text-gray-700 ">
                    Дата окончания 
                </Label>
                <Input
                    required
                    type="date"
                    defaultValue={today[0]}
                    className={clsx(
                        "mt-3 block w-full rounded-lg border-2 border-gray-300 bg-white px-3 py-1.5 text-sm/6 text-gray",
                        "focus:not-data-focus:outline-none data-focus:outline-2 data-focus:-outline-offset-2 data-focus:outline-gray-400/75"
                    )}
                    ref={endDate}
                />
            </Field>
            <button
                type="submit"
                className={`w-50 h-12 mt-10 text-white rounded-full shadow-lg flex justify-center items-center
                            bg-blue-500 hover:bg-blue-600 cursor-pointer`}
            >
                <AiOutlinePlus />
                <span className="m-2">Создать проект</span>
            </button>
        </form>
    );
}

