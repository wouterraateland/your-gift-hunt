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
    questions: entities.filter(entity => entity.entity === '/entities/question'),
    codes: entities.filter(entity => entity.entity === '/entities/code'),
    inputs: entities.filter(entity => entity.entity === '/entities/input'),
    notes: entities.filter(entity => entity.entity === '/entities/note'),
  }
}

export default useGameState
