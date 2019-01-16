import { useState, useEffect } from 'react'

import fetchLambda from 'utils/api'

const useGameState = () => {
  const [instances, setInstances] = useState([])

  useEffect(() => {
    fetchLambda('instances', {})
      .then(setInstances)
      .catch(console.error)
  }, [])

  return {
    all: instances,
    items: instances
      .filter(instance => instance.entity.isItem),
    objects: instances
      .filter(instance => instance.entity.isObject),
    questions: instances
      .filter(instance => instance.entity.id === '/entities/question'),
    codes: instances
      .filter(instance => instance.entity.id === '/entities/code'),
    inputs: instances
      .filter(instance => instance.entity.id === '/entities/input'),
    notes: instances
      .filter(instance => instance.entity.id === '/entities/note'),
  }
}

export default useGameState
