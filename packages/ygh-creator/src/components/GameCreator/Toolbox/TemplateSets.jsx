import React from "react"

import useGame from "hooks/useGame"

import TemplateSet from "./TemplateSet"

const TemplateSets = () => {
  const { game } = useGame()

  return game.entityTemplateSets.map(set => (
    <TemplateSet key={set.id} templateSet={set} />
  ))
}

export default TemplateSets
