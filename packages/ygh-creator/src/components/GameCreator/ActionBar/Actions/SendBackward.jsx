import React, { useCallback, useEffect } from "react"

import * as Icons from "ygh-icons"

import useEntityPositions from "hooks/useEntityPositions"

import Action from "./Action"

const SendBackward = ({ entity }) => {
  const { entityPositions, setManyEntityPositions } = useEntityPositions()

  // Z reset
  useEffect(() => {
    setManyEntityPositions(
      Object.entries(entityPositions)
        .map(([id, { z }]) => ({ id, z }))
        .sort((a, b) => a.z - b.z)
        .map((x, i) => ({ ...x, z: i }))
        .filter(({ id, z }) => entityPositions[id].z !== z)
        .map(({ id, z }) => ({ entityId: id, position: p => ({ ...p, z }) }))
    )
  }, [])

  const sendBackward = useCallback(() => {
    const otherEntityId = Object.keys(entityPositions).find(
      entityId =>
        entityPositions[entityId].z === entityPositions[entity.id].z - 1
    )

    if (otherEntityId) {
      setManyEntityPositions([
        { entityId: entity.id, position: p => ({ ...p, z: p.z - 1 }) },
        { entityId: otherEntityId, position: p => ({ ...p, z: p.z + 1 }) }
      ])
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
