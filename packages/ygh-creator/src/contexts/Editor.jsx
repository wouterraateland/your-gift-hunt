import React, { createContext } from "react"
import { useEditorProvider } from "hooks/useEditor"

const EditorContext = createContext(null)

export const EditorProvider = ({ children, ...otherProps }) => {
  const value = useEditorProvider(otherProps)
  return (
    <EditorContext.Provider value={value}>{children}</EditorContext.Provider>
  )
}

export default EditorContext
