import { useState, useRef, useEffect } from "react"
import { createInputAction } from "actions/creators"
import useStore, { localStorageStoreCreator } from "./useStore"

import fetchLambda from "utils/api"

const useGameState = (creatorSlug, gameSlug) => {
  const { read, write } = useStore(
    localStorageStoreCreator({ name: `${creatorSlug}/${gameSlug}` })
  )

  const gameId = useRef(null)
  const playerToken = useRef(read("playerToken"))
  const [isLoading, setIsLoading] = useState(true)
  const [instances, setInstances] = useState([])

  async function load() {
    gameId.current = await fetchLambda("getGameIdBySlug", {
      method: "POST",
      body: { creatorSlug, gameSlug }
    })

    const isPlayerTokenValid = await fetchLambda("isPlayerTokenValid", {
      method: "POST",
      body: { playerToken: playerToken.current }
    })

    if (!isPlayerTokenValid) {
      try {
        playerToken.current = await fetchLambda("createPlayerToken", {
          method: "POST",
          body: { gameId: gameId.current }
        })
        write("playerToken", playerToken.current)
      } catch (e) {
        console.error(e)
      }
    }

    try {
      const instances = await fetchLambda("getGameState", {
        method: "POST",
        body: { playerToken: playerToken.current }
      })
      setInstances(instances)

      const triggerInstances = instances.filter(
        instance => instance.entity.isTrigger
      )

      for (let instance of triggerInstances) {
        if (instance.state !== null) {
          await dispatchAction(createInputAction(instance.id))
        }
      }
      setIsLoading(false)
    } catch (e) {
      console.error(e)
    }
  }

  async function dispatchAction(action) {
    try {
      const nextState = await fetchLambda("dispatchAction", {
        method: "POST",
        body: {
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

  function pickupItem(instanceId) {
    write("inventoryItems", inventoryItems => [
      ...(inventoryItems || []),
      instanceId
    ])
  }

  function updateState(updatedInstances) {
    setInstances(instances =>
      instances
        .filter(
          instance =>
            !updatedInstances.some(
              newInstance => newInstance.id === instance.id
            )
        )
        .concat(updatedInstances)
    )
    return updatedInstances
  }

  useEffect(() => {
    load()
  }, [])

  const activeInstances = instances.filter(({ state }) => state !== null)

  return {
    isLoading,
    dispatchAction,
    pickupItem,
    instances: {
      all: activeInstances,
      items: activeInstances.filter(instance => instance.entity.isItem),
      inventoryItems: activeInstances.filter(
        instance =>
          instance.entity.isItem &&
          read("inventoryItems", []).includes(instance.id)
      ),
      nonInventoryItems: activeInstances.filter(
        instance =>
          instance.entity.isItem &&
          !read("inventoryItems", []).includes(instance.id)
      ),
      objects: activeInstances.filter(instance => instance.entity.isObject),
      triggers: activeInstances.filter(instance => instance.entity.isTrigger),
      questions: activeInstances.filter(
        instance => instance.entity.name === "Question"
      ),
      codes: activeInstances.filter(
        instance => instance.entity.name === "Code"
      ),
      inputs: activeInstances.filter(
        instance => instance.entity.name === "Input"
      ),
      notes: activeInstances.filter(instance => instance.entity.name === "Note")
    }
  }
}

export default useGameState
