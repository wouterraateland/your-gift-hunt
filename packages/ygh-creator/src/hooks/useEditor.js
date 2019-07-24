import { useCallback, useContext, useState } from "react"
import EditorContext from "contexts/Editor"

const INFO_TYPES = {
  EXPLORE: "EXPLORE",
  INFO: "INFO"
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

  const selectTab = useCallback(v => {
    _selectTab(selectedTab => {
      const newSelectedTab = typeof v === "function" ? v(selectedTab) : v

      window.localStorage.setItem("tabPreference", newSelectedTab)

      return newSelectedTab
    })
  }, [])

  const [selectedView, _selectView] = useState(
    window.localStorage.getItem("viewPreference") || VIEW_TYPES.GRAPHIC
  )

  const selectView = useCallback(v => {
    _selectView(v)
    window.localStorage.setItem("viewPreference", v)
  }, [])

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
