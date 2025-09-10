"use client"

import { createContext, useState } from "react"

export const ReRenderPageContext = createContext()

export function ReRenderPageProvider({children}) {
    const [ reRenderTasks , setReRenderTasks] = useState(false)
    const [ reRenderProjects , setReRenderProjects] = useState(false)

    return <ReRenderPageContext value={{reRenderTasks, setReRenderTasks, reRenderProjects, setReRenderProjects}}>
        {children}
    </ReRenderPageContext>
}
