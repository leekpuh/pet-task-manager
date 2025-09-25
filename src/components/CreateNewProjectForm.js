"use client";
import { v4 as uuidv4 } from "uuid";
import { Field, Input, Label, Textarea } from "@headlessui/react";
import clsx from "clsx";
import { useRef, useContext, useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { postProject } from "@/app/api/projects";
import { ReRenderPageContext } from "@/app/context/reRenderPageContext";
import validateTaskAndprojectForm from "@/app/utils/validateTaskAndProjectForm";

export default function CreateNewProjectForm() {
    const { setReRenderProjects } = useContext(ReRenderPageContext);
    const today = new Date().toISOString().split("T");
    const [error, setError] = useState([]);

    const title = useRef(null);
    const desc = useRef(null);
    const startDate = useRef(null);
    const endDate = useRef(null);

    function handleProjectSubmit(e) {
        e.preventDefault();

        const data = {
            id: uuidv4(),
            title: title.current.value,
            desc: desc.current.value,
            startDate: startDate.current.value,
            endDate: endDate.current.value,
            createdDate: today[0],
        };

        setError([]);

        const errors = validateTaskAndprojectForm(data, "задача");

        if (errors) {
            setError(errors);
            return;
        }

        postProject(data).then(() => {
            e.target.reset();
            setReRenderProjects((prev) => !prev);
        });
    }

    return (
        <form
            onSubmit={handleProjectSubmit}
            className="w-full max-w-md px-4 flex flex-col self-center"
        >
            <div className="flex flex-col gap-2 mt-5">
                {error &&
                    error.map((err, idx) => (
                        <div
                            key={idx}
                            className="border-1 border-red-300 text-red-400 text-sm rounded-lg py-1 px-3 w-fit"
                        >
                            * {err}
                        </div>
                    ))}
            </div>
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
                <Label className="text-lg text-gray-700 ">Дата окончания</Label>
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
