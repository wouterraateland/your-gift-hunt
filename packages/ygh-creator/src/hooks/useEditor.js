import { useCallback, useContext, useState } from "react"
import EditorContext from "contexts/Editor"

const ACTION_TYPES = {
  DELETE_NODE: "DELETE_NODE"
}

export const useEditorProvider = () => {
  const [selectedView, _selectView] = useState(
    window.localStorage.getItem("viewPreference") || "graphic"
  )
  const [upcomingAction, setUpcomingAction] = useState(null)

  const selectView = useCallback(v => {
    _selectView(v)
    window.localStorage.setItem("viewPreference", v)
  }, [])

  return {
    ACTION_TYPES,
    upcomingAction,
    setUpcomingAction,
    selectedView,
    selectView
  }
}

const useEditor = () => useContext(EditorContext)
export default useEditor
