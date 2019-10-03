import React, { forwardRef, useEffect } from "react"

import Entity from "../Entity"
import GameEntity from "../GameEntity"
import _ from "ygh-utils"

const PartyGame = forwardRef(({ dispatchInputAction, ...props }, ref) => {
  const image = _.getFieldValue(`Image`)(props)

  useEffect(() => {
    const date = new Date().getDate()
    if (date > 11) {
      dispatchInputAction(props.state, "date", date)
    }
  }, [props, dispatchInputAction])

  return <GameEntity ref={ref} backgroundImage={image} />
})
PartyGame.name = "PartyGame"
PartyGame.templateName = "Party Game"
PartyGame.defaultProps = Entity.defaultProps

export default PartyGame
