import { useContext, useState } from "react"
import EditorContext from "contexts/Editor"

const ACTION_TYPES = {
  DELETE_NODE: "DELETE_NODE"
}

export const useEditorProvider = () => {
  const [upcomingAction, setUpcomingAction] = useState(null)

  return {
    ACTION_TYPES,
    upcomingAction,
    setUpcomingAction
  }
}

const useEditor = () => useContext(EditorContext)
export default useEditor
