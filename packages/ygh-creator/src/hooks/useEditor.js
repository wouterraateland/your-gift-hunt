import { useState } from "react"

const ACTION_TYPES = {
  DELETE_NODE: "DELETE_NODE"
}

const useEditor = () => {
  const [upcomingAction, setUpcomingAction] = useState(null)

  return {
    ACTION_TYPES,
    upcomingAction,
    setUpcomingAction
  }
}

export default useEditor
