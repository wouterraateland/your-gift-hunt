import React from "react"

import * as Icons from "ygh-icons"

import useInspector from "hooks/useInspector"

import Action from "./Action"

const Blur = ({ entity }) => {
  const { inspectEntity } = useInspector()

  return (
    <Action
      title="Inspect entity"
      icon={Icons.Loop}
      onAct={() => inspectEntity(entity.id)}
    />
  )
}

export default Blur
