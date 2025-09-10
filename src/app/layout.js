import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import AddNewTaskButton from "@/components/AddNewTaskButton";
import SideBar from "@/components/SideBar";
import { ReRenderPageProvider } from "./context/reRenderPageContext";
export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body className="flex min-h-screen">
                <SideBar />
                <ReRenderPageProvider>
                    <main className="w-full">{children}</main>
                    <AddNewTaskButton />
                </ReRenderPageProvider>
            </body>
        </html>
    );
}
