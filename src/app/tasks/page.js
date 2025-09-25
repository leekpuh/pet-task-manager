"use client";

import { useSearchParams } from "next/navigation";
import { useState, useEffect, useContext } from "react";
import { useDrop } from "react-dnd";
import Task from "./components/Task";
import { getAllTasks } from "../api/tasks";
import { getAllProjects } from "../api/projects";
import { ReRenderPageContext } from "../context/reRenderPageContext";
import { patchTask } from "../api/tasks";

export default function ProjectTasks() {
  const { reRenderTasks } = useContext(ReRenderPageContext);
  const searchParams = useSearchParams();
  const projectID = searchParams.get("projectID");

  const [tasks, setTasks] = useState([]);
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    getAllTasks()
      .then((data) => setTasks(data))
      .catch(console.error);
  }, [reRenderTasks]);

  useEffect(() => {
    getAllProjects()
      .then((data) => setProjects(data))
      .catch(console.error);
  }, []);

  function onDropTask(taskId, newStatus) {
    patchTask(taskId, {status: newStatus}).then(setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, status: newStatus } : task
      )
    ))
  }

  const [{ isOverCreated }, dropCreated] = useDrop({
    accept: "TASK",
    drop: (item) => onDropTask(item.id, "created"),
    collect: (monitor) => ({ isOverCreated: monitor.isOver() }),
  });

  const [{ isOverInProcess }, dropInProcess] = useDrop({
    accept: "TASK",
    drop: (item) => onDropTask(item.id, "inProcess"),
    collect: (monitor) => ({ isOverInProcess: monitor.isOver() }),
  });

  const [{ isOverInTest }, dropInTest] = useDrop({
    accept: "TASK",
    drop: (item) => onDropTask(item.id, "inTest"),
    collect: (monitor) => ({ isOverInTest: monitor.isOver() }),
  });

  const [{ isOverDone }, dropDone] = useDrop({
    accept: "TASK",
    drop: (item) => onDropTask(item.id, "done"),
    collect: (monitor) => ({ isOverDone: monitor.isOver() }),
  });

  return (
    <div className="m-5">
      <div className="flex">
        <div className="bg-gray-200 py-2 px-5 w-fit text-center rounded-t-xl z-20">
          Задачи проекта
        </div>
        <div className="bg-blue-200 py-2 px-5 pl-8 w-fit text-center rounded-tr-xl -translate-x-3 z-10">
          {projects.find((p) => String(p.id) === projectID)?.title}
        </div>
      </div>
      <hr className="border-2 border-gray-200/75" />
      <div className="pt-5 grid grid-cols-4 min-h-screen gap-4">

        {/* Создано */}
        <div ref={dropCreated} className={`border-r-2 border-gray-200/75 px-5 ${isOverCreated ? "bg-gray-100" : ""}`}>
          <div className="text-center bg-blue-200/75 p-2 rounded-t-xl">Создано</div>
          <div  className="min-h-[300px]  p-2">
            {tasks
              .filter((t) => t.status === "created" && String(t.projectData.id) === projectID)
              .map((task) => (
                <Task key={task.id} task={task} />
              ))}
          </div>
        </div>

        {/* В работе */}
        <div ref={dropInProcess} className={`px-5 ${isOverInProcess ? "bg-gray-100" : ""}`}>
          <div className="text-center bg-orange-200/75 p-2 rounded-t-xl">В работе</div>
          <div className="min-h-[300px]  p-2">
            {tasks
              .filter((t) => t.status === "inProcess" && String(t.projectData.id) === projectID)
              .map((task) => (
                <Task key={task.id} task={task} />
              ))}
          </div>
        </div>

        {/* На проверке */}
        <div ref={dropInTest} className={`px-5 border-l-2 border-gray-200/75 ${isOverInTest ? "bg-gray-100" : ""}`}>
          <div className="text-center bg-yellow-100 p-2 rounded-t-xl">На проверке</div>
          <div  className="min-h-[300px]  p-2 
          ">
            {tasks
              .filter((t) => t.status === "inTest" && String(t.projectData.id) === projectID)
              .map((task) => (
                <Task key={task.id} task={task} />
              ))}
          </div>
        </div>

        {/* Завершено */}
        <div ref={dropDone} className={`border-l-2 border-gray-200/75 px-5 ${isOverDone? "bg-gray-100" : ""}`}>
          <div className="text-center bg-green-200/75 p-2 rounded-t-xl">Завершено</div>
          <div  className="min-h-[300px]  p-2">
            {tasks
              .filter((t) => t.status === "done" && String(t.projectData.id) === projectID)
              .map((task) => (
                <Task key={task.id} task={task} />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
