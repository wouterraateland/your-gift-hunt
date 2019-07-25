import { useCallback, useContext, useState } from "react"
import EditorContext from "contexts/Editor"

const INFO_TYPES = {
  EXPLORE: "EXPLORE",
  INFO: "INFO",
  NEW_ENTITY: "NEW_ENTITY"
}

const VIEW_TYPES = {
  GRAPHIC: "graphic",
  LOGIC: "logic"
}

const ACTION_TYPES = {
  DELETE_NODE: "DELETE_NODE",
  PUBLISH_GAME: "PUBLISH_GAME",
  SHARE_GAME: "SHARE_GAME"
}

export const useEditorProvider = () => {
  const [upcomingAction, setUpcomingAction] = useState(null)

  const [selectedTab, _selectTab] = useState(
    window.localStorage.getItem("tabPreference") || INFO_TYPES.INFO
  )

  const selectTab = useCallback(
    v =>
      _selectTab(current => {
        const next = typeof v === "function" ? v(current) : v
        window.localStorage.setItem("tabPreference", next)
        return next
      }),
    []
  )

  const [selectedView, _selectView] = useState(
    window.localStorage.getItem("viewPreference") || VIEW_TYPES.GRAPHIC
  )

  const selectView = useCallback(
    v =>
      _selectView(current => {
        const next = typeof v === "function" ? v(current) : v
        window.localStorage.setItem("viewPreference", next)
        return next
      }),
    []
  )

  return {
    INFO_TYPES,
    VIEW_TYPES,
    ACTION_TYPES,
    upcomingAction,
    setUpcomingAction,
    selectedTab,
    selectTab,
    selectedView,
    selectView
  }
}

const useEditor = () => useContext(EditorContext)
export default useEditor
