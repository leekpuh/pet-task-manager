"use client";

import { useState, useEffect, useContext } from "react";
import ProjectCard from "./components/ProjectCard";
import { getAllProjects } from "../api/projects";
import { ReRenderPageContext } from "../context/reRenderPageContext";

export default function Projects() {
    const { reRenderProjects } = useContext(ReRenderPageContext);
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        getAllProjects()
            .then((data) => setProjects(data))
            .catch((err) => console.error(err));
    }, [, reRenderProjects]);

    return (
        <div className="flex flex-col p-5 h-full">
            <div className="bg-gray-200/75 p-2 w-35 text-center rounded-t-xl">
                Проекты
            </div>
            <hr className="border-2 border-gray-200/75 " />
            <div className="pt-5 grid grid-cols-3 h-fit gap-5">
                {projects.map((project) => (
                    <ProjectCard key={project.id} project={project} />
                ))}
            </div>
        </div>
    );
}
