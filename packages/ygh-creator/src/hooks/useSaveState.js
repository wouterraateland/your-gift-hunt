import moment from "moment"

import { useState } from "react"

const useSaveState = () => {
  const [saveState, setSaveState] = useState({
    isSaving: false,
    isDirty: false,
    lastSaved: null
  })

  const save = f => async (...args) => {
    setSaveState(saveState => ({ ...saveState, isSaving: true }))
    const res = await f(...args)
    setSaveState({
      isDirty: false,
      isSaving: false,
      lastSaved: moment()
    })
    return res
  }

  return {
    ...saveState,
    save
  }
}

export default useSaveState
