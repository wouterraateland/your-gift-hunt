import { useState, useRef, useEffect } from 'react'

import fetchLambda from 'utils/api'

const useGameState = () => {
  const playerToken = useRef(localStorage.getItem('playerToken'))
  const [isLoading, setIsLoading] = useState(true)
  const [instances, setInstances] = useState([])
  const [triggers, setTriggers] = useState([])
  const huntId = 'pioneer'

  async function dispatchAction(action) {
    try {
      const nextState = await fetchLambda('dispatchAction', {
        method: 'POST',
        body: {
          huntId,
          playerToken: playerToken.current,
          action
        }
      })
      return updateState(nextState)
    } catch (err) {
      console.error(err)
    }

    return null
  }

  async function load() {
    if (!playerToken.current) {
      try {
        playerToken.current = await fetchLambda('createPlayerToken', {
          method: 'POST',
          body: { huntId },
        })
        localStorage.setItem('playerToken', playerToken.current)
      } catch (e) {
        console.error(e)
      }
    }

    try {
      const { instances, triggers } = await fetchLambda('getHuntState', {
        method: 'POST',
        body: { huntId, playerToken: playerToken.current }
      })
      setInstances(instances)
      setTriggers(triggers)
      for (let trigger of triggers) {
        if (trigger.state) {
          await dispatchAction({
            type: 'trigger',
            payload: {
              instanceId: trigger.id,
            }
          })
        }
      }
      setIsLoading(false)
    } catch (e) {
      console.error(e)
    }
  }

  function updateState(newState) {
    setInstances(instances => instances
      .filter(instance => !newState.instances
        .some(newInstance => newInstance.id === instance.id)
      )
      .concat(newState.instances)
    )
    setTriggers(triggers => triggers
      .filter(trigger => !newState.triggers
        .some(newTrigger => newTrigger.id === trigger.id)
      )
      .concat(newState.triggers)
    )
  }

  useEffect(() => { load() }, [])

  const activeInstances = instances
    .filter(({ state }) => state !== null)

  return {
    isLoading,
    dispatchAction,
    triggers: {
      all: triggers.filter(({ state }) => state),
    },
    instances: {
      all: activeInstances,
      items: activeInstances
        .filter(instance => instance.entity.isItem),
      objects: activeInstances
        .filter(instance => instance.entity.isObject),
      questions: activeInstances
        .filter(instance => instance.entity.id === 'question'),
      codes: activeInstances
        .filter(instance => instance.entity.id === 'code'),
      inputs: activeInstances
        .filter(instance => instance.entity.id === 'input'),
      notes: activeInstances
        .filter(instance => instance.entity.id === 'note'),
    }
  }
}

export default useGameState
