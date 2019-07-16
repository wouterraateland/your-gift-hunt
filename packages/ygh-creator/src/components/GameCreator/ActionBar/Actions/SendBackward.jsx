import React, { useCallback, useEffect } from "react"

import * as Icons from "ygh-icons"

import useEntityPositions from "hooks/useEntityPositions"

import Action from "./Action"

const SendBackward = ({ entity }) => {
  const { entityPositions, setEntityPosition } = useEntityPositions()

  // Z reset
  useEffect(() => {
    const zIndices = Object.values(entityPositions).map(({ z }) => z)

    if (new Set(zIndices).size !== zIndices.length) {
      Object.keys(entityPositions).forEach((entityId, i) =>
        setEntityPosition(entityId, { ...entityPositions[entityId], z: i })
      )
    }
  }, [])

  const sendBackward = useCallback(() => {
    const otherEntityId = Object.keys(entityPositions).find(
      entityId =>
        entityPositions[entityId].z === entityPositions[entity.id].z - 1
    )

    if (otherEntityId) {
      setEntityPosition(entity.id, position => ({
        ...position,
        z: position.z - 1
      }))
      setEntityPosition(otherEntityId, position => ({
        ...position,
        z: position.z + 1
      }))
    }
  }, [entityPositions, entity])

  return (
    <Action
      title="Send backward"
      icon={Icons.SendBackward}
      onAct={sendBackward}
    />
  )
}

export default SendBackward
