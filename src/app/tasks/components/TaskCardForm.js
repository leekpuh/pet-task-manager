"use client";

import { Field, Input, Label, Textarea } from "@headlessui/react";
import clsx from "clsx";
import { useState } from "react";
import { BsPencil, BsTrash } from "react-icons/bs";

export default function TaskCardForm({ task }) {
    const [editOn, setEditOn] = useState(false);

    return (
        <div className="w-full">
            <Field className="mt-10">
                <Label className="text-lg text-gray-700 ">Задача</Label>
                <Input
                    required
                    disabled={!editOn}
                    type="text"
                    defaultValue={task.title}
                    className={clsx(
                        "mt-3 block w-full rounded-lg border-2 border-gray-300 bg-white px-3 py-1.5 text-sm/6 text-gray",
                        "focus:not-data-focus:outline-none data-focus:outline-2 data-focus:-outline-offset-2 data-focus:outline-gray-400/75",
                        "disabled:bg-gray-100 disabled:border-gray-200"
                    )}
                />
            </Field>
            <Field className="mt-2">
                <Label className="text-lg text-gray-700 ">Описание</Label>
                <Textarea
                    rows={5}
                    disabled={!editOn}
                    defaultValue={task.desc}
                    className={clsx(
                        "mt-3 block w-full rounded-lg border-2 border-gray-300 bg-white px-3 py-1.5 text-sm/6 text-gray",
                        "focus:not-data-focus:outline-none data-focus:outline-2 data-focus:-outline-offset-2 data-focus:outline-gray-400/75",
                        "disabled:bg-gray-100 disabled:border-gray-200"
                    )}
                />
            </Field>
            <Field className="mt-5">
                <Label className="text-lg text-gray-700 ">Дата начала</Label>
                <Input
                    required
                    type="datetime-local"
                    disabled={!editOn}
                    defaultValue={task.startDate}
                    className={clsx(
                        "mt-3 block w-full rounded-lg border-2 border-gray-300 bg-white px-3 py-1.5 text-sm/6 text-gray",
                        "focus:not-data-focus:outline-none data-focus:outline-2 data-focus:-outline-offset-2 data-focus:outline-gray-400/75",
                        "disabled:bg-gray-100 disabled:border-gray-200"
                    )}
                />
            </Field>
            <Field className="mt-5">
                <Label className="text-lg text-gray-700 ">Дата окончания</Label>
                <Input
                    required
                    type="datetime-local"
                    disabled={!editOn}
                    defaultValue={task.endDate}
                    className={clsx(
                        "mt-3 block w-full rounded-lg border-2 border-gray-300 bg-white px-3 py-1.5 text-sm/6 text-gray",
                        "focus:not-data-focus:outline-none data-focus:outline-2 data-focus:-outline-offset-2 data-focus:outline-gray-400/75",
                        "disabled:bg-gray-100 disabled:border-gray-200"
                    )}
                />
            </Field>
            <div className="flex w-full justify-end gap-3 mt-5">
                <button
                    title="Редактировать задачу"
                    onClick={() => setEditOn((prev) => !prev)}
                    className="size-10 rounded-full bg-orange-200 text-xl flex items-center justify-center shadow-lg hover:bg-orange-300/75 cursor-pointer"
                >
                    <BsPencil />
                </button>
                <button
                    title="Удалить задачу"
                    className="size-10 rounded-full bg-red-400 text-xl flex items-center justify-center shadow-lg hover:bg-red-500/75 cursor-pointer"
                >
                    <BsTrash />
                </button>
            </div>
        </div>
    );
}
