import { useContext, useState } from "react"
import moment from "moment"

import SaveStateContext from "contexts/SaveState"

export const useSaveStateProvider = () => {
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

const useSaveState = () => useContext(SaveStateContext)
export default useSaveState
