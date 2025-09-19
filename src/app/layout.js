"use client"

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import AddNewTaskButton from "@/components/AddNewTaskButton";
import SideBar from "@/components/SideBar";
import { ReRenderPageProvider } from "./context/reRenderPageContext";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body className="flex min-h-screen">
            <DndProvider backend={HTML5Backend}>
                    <SideBar />
                    <ReRenderPageProvider>
                        <main className="w-full">{children}</main>
                        <AddNewTaskButton />
                    </ReRenderPageProvider>
                </DndProvider>
            </body>
        </html>
    );
}
