import { useState, useEffect } from 'react'

import fetchLambda from 'utils/api'

const useGameState = () => {
  const [entities, setEntities] = useState([])

  useEffect(() => {
    fetchLambda('entities', {})
      .then(setEntities)
      .catch(console.error)
  }, [])

  return {
    items: entities.filter(entity => entity.isItem),
    objects: entities.filter(entity => entity.isObject),
    currentScreen: null,
  }
}

export default useGameState
