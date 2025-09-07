"use client";

import { useContext } from "react";
import { AppContext } from "../store/appContext";
import ProjectCard from "./components/ProjectCard";

export default function Projects() {
    const { projects, setProjects } = useContext(AppContext);

    return (
        <div className="flex flex-col p-5 h-full">
            <div className="bg-gray-200/75 p-2 w-35 text-center rounded-t-xl">
                Проекты
            </div>
            <hr className="border-2 border-gray-200/75 " />
            <div className="pt-5 grid grid-cols-3 h-full">
                {/* Создано */}
                <div className="border-r-2 border-gray-200/75 px-15">
                    <div className="text-center bg-blue-200/75 p-2 rounded-t-xl">Создано</div>
                    {projects.map((project) => (
                        <ProjectCard key={project.id} project={project}/>
                    ))}
                </div>
                {/* В работе */}
                <div className="px-15">
                    <div className="text-center bg-orange-200/75 p-2 rounded-t-xl">В работе</div>
                </div>
                {/* Завершено */}
                <div className="border-l-2 border-gray-200/75 px-15">
                    <div className="text-center bg-green-200/75 p-2 rounded-t-xl">Завершено</div>
                </div>
            </div>
        </div>
    );
}
