import Link from "next/link";
import { BsList } from "react-icons/bs";

export default function ProjectCard({ project }) {
    return (
        <div className="w-full h-auto bg-white p-5 rounded-xl shadow-lg my-5 flex flex-col gap-4 border-2 border-gray-200">
            <div className="break-words">{project.title}</div>
            <div className="bg-gray-200 w-fit py-1 px-3 rounded-lg flex justify-center items-center gap-3">
                <div className="size-2 bg-gray-500 rounded-full"></div>Начало{" "}
                {new Date(project.startDate).toLocaleDateString("RU-ru", {
                    day: "2-digit",
                    month: "long",
                    year: "numeric",
                })}
            </div>
            <div className="bg-green-100 w-fit py-1 px-3 rounded-lg flex justify-center items-center gap-3">
                <div className="size-2 bg-green-500 rounded-full"></div>Дедлайн{" "}
                {new Date(project.endDate).toLocaleDateString("RU-ru", {
                    day: "2-digit",
                    month: "long",
                    year: "numeric",
                })}
            </div>
            <Link href={{pathname: "/tasks", query: {projectID: project.id, projectTitle: project.title}}} className="bg-blue-50  w-fit px-4 py-2 rounded-full flex gap-2 text-center text-blue-700 items-center border-2 border-blue-200 self-end cursor-pointer hover:bg-blue-100/75"><BsList /> Список задач</Link>
        </div>
    );
}
