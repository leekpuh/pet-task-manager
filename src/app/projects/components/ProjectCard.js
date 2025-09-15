import { IoClose } from "react-icons/io5";
import ProjectCardForm from "./ProjectCardForm";

export default function ProjectCard({ project, onClose }) {
    return (
        <div
            onClick={onClose}
            className="h-full w-full z-40 flex justify-center fixed backdrop-blur-md bg-black/30"
        >
            <div
                onClick={(e) => e.stopPropagation()}
                className=" bg-gray-100  flex flex-col rounded-2xl w-2/6 shadow-2xl border-1 border-gray-200 overflow-y-auto p-10 self-center h-fit max-h-screen"
            >
                <div className="flex w-full">
                    <div className="text-lg w-full">
                        <button className="bg-blue-200/75 mr-2 px-4 py-2 rounded-t-2xl cursor-pointer ">
                            Карточка проекта
                        </button>
                    </div>
                    <div className="flex justify-end">
                        <IoClose
                            className="ring-3 ring-gray-400 rounded-full size-7 text-gray-400 hover:ring-gray-500 hover:text-gray-500 cursor-pointer"
                            onClick={onClose}
                        ></IoClose>
                    </div>
                </div>

                <div className="flex flex-col h-full bg">
                    <hr className="border-3 border-blue-200/75 rounded-full" />
                    <ProjectCardForm project={project} />
                </div>
            </div>
        </div>
    );
}
