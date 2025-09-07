"use client";

import { createContext, useEffect, useState } from "react";

export const AppContext = createContext();

export function AppProvider({ children }) {
    const [tasks, setTasks] = useState([]);
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        const tasksData = JSON.stringify(tasks);
        localStorage.setItem("allTasks", tasksData);
    }, [tasks]);

    useEffect(() => {
        const projectsData = JSON.stringify(projects);
        localStorage.setItem("allProjects", projectsData);
    }, [projects]);

    useEffect(() => {
        try {
            const localTasksData = localStorage.getItem("allTasks");
            const localProjectsData = localStorage.getItem("allProjects");
            localTasksData
                ? setTasks(JSON.parse(localTasksData))
                : setTasks([]);
            localProjectsData
                ? setProjects(JSON.parse(localProjectsData))
                : setProjects([]);
        } catch {
            console.error("Ошибка получения данных");
        }
    }, []);

    return (
        <AppContext value={{ tasks, setTasks, projects, setProjects }}>
            {children}
        </AppContext>
    );
}
