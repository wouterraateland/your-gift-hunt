import moment from "moment"

import { useState } from "react"

// TODO: Implement real saving
async function saveGame(game) {
  return new Promise(resolve => setTimeout(() => resolve(game), 1000))
}

const useGameSave = game => {
  const [saveState, setSaveState] = useState({
    isSaving: false,
    isDirty: false,
    lastSaved: null
  })

  async function save() {
    setSaveState(saveState => ({ ...saveState, isSaving: true }))
    await saveGame(game)
    setSaveState({
      isDirty: false,
      isSaving: false,
      lastSaved: moment()
    })
  }

  return {
    ...saveState,
    save
  }
}

export default useGameSave
