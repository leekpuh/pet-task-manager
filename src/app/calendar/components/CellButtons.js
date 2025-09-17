"use client";
import { Button } from "@headlessui/react";
import { AiOutlinePlus, AiOutlineBars } from "react-icons/ai";
import { useState } from "react";
import { createPortal } from "react-dom";
import CreateNewTask from "@/components/CreateNewTask";


export default function CellButtons({ dateID }) {

    return (
        <div className="flex gap-4 m-3 justify-end">
            <Button
               
                title="Список задач"
                className="ring-2 ring-blue-200  rounded-full px-2 cursor-pointer text-blue-400 size-8
                                hover:bg-blue-200 hover:text-blue-500"
            >
                <AiOutlineBars />
            </Button>
           
          
        </div>
    );
}
