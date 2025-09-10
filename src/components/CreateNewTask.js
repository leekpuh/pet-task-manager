import { IoClose } from "react-icons/io5";
import CreateNewTaskForm from "./CreateNewTaskForm";


export default function CreateNewTask({onClose}) {
    

    return (
        <div className="h-full w-full z-40 flex justify-center fixed backdrop-blur-md bg-black/30">
            <div className=" bg-gray-100  flex flex-col rounded-2xl w-2/6 h-6/7 shadow-2xl border-1 border-gray-200 overflow-y-auto p-10 self-center ">
                <div className="flex w-full">
                    <div className="text-lg w-full">
                        <button
                            className="bg-blue-200/75 mr-2 px-4 py-2 rounded-t-2xl cursor-pointer "
                            
                        >
                            Новая задача
                        </button>
                        
                    </div>
                    <div className="flex justify-end">
                        <IoClose
                            className="ring-3 ring-gray-400 rounded-full size-7 text-gray-400 hover:ring-gray-500 hover:text-gray-500 cursor-pointer"
                            onClick={onClose}
                        ></IoClose>
                    </div>
                </div>
               
                    <div className="flex flex-col">
                        <hr className="border-3 border-blue-200/75 rounded-full" />
                        <CreateNewTaskForm />
                    </div>
                
             
            </div>
        </div>
    );
}
