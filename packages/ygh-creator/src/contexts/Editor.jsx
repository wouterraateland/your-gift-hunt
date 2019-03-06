import React, { createContext } from "react"
import useEditor from "hooks/useEditor"

const EditorContext = createContext(null)

export const EditorProvider = ({ children, ...otherProps }) => {
  const value = useEditor(otherProps)
  return (
    <EditorContext.Provider value={value}>{children}</EditorContext.Provider>
  )
}

export default EditorContext
