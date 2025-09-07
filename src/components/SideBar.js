"use client";

import { useState } from "react";
import {
    BsArrowLeftCircle,
    BsArrowRightCircle,
    BsCalendarPlus,
    BsHouse,
    BsCardChecklist,
} from "react-icons/bs";
import Link from "next/link";

export default function SideBar() {
    const [barOpened, setBarOpened] = useState(true);

    return (
        <div
            className={` text-white  ${
                barOpened ? "w-1/7" : "w-20"
            } transition-all duration-300 ease-in-out `}
        >
            <div className="bg-gray-700 rounded-r-3xl h-full">
                <div className="w-full flex justify-end p-4">
                    {barOpened ? (
                        <BsArrowLeftCircle
                            className="size-9 hover:text-gray-300 cursor-pointer"
                            onClick={() => setBarOpened(!barOpened)}
                        />
                    ) : (
                        <BsArrowRightCircle
                            className="size-9 hover:text-gray-300 cursor-pointer"
                            onClick={() => setBarOpened(!barOpened)}
                        />
                    )}
                </div>
                <ol>
                    {[
                        {
                            name: "Главная",
                            link: "/",
                            Icon: BsHouse,
                        },
                        {
                            name: "Календарь задач",
                            link: "/calendar",
                            Icon: BsCalendarPlus,
                        },
                        {
                            name: "Проекты",
                            link: "/projects",
                            Icon: BsCardChecklist,
                        },
                    ].map(({ name, link, Icon }, idx) => (
                        <li key={idx}>
                            <Link
                                href={link}
                                className="cursor-pointer py-5 flex items-center"
                            >
                                <Icon className="size-7 mx-3" />
                                {barOpened && <span>{name}</span>}
                            </Link>
                        </li>
                    ))}
                </ol>
            </div>
        </div>
    );
}
