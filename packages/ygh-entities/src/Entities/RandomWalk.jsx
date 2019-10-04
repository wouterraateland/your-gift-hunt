import React, { forwardRef } from "react"

import Entity from "../Entity"
import GameEntity from "../GameEntity"
import _ from "ygh-utils"

const options = {
  Koornmarkt: [
    "De Toko",
    "De Nieuwe Kerk",
    "De Porceleyne Fles",
    "Het Stadhuis"
  ],
  Stadhuis: [
    "maandag",
    "dinsdag",
    "woensdag",
    "donderdag",
    "vrijdag",
    "zaterdag",
    "zondag"
  ],
  "Voor Cafe Zondag": ["ja", "nee"]
}

const RandomWalk = forwardRef(({ dispatchInputAction, ...props }, ref) => {
  const hasLost = _.hasState("Verdwaald")(props)
  const hasWon = _.hasState("OD 147")(props)
  const isPlaying = !_.hasState("In Huis")(props) && !hasLost && !hasWon

  const location = props.state.name
  const text = _.getFieldValue(`Text ${location}`)(props)
  const image = _.getFieldValue(`Image ${location}`)(props)

  return (
    <GameEntity
      ref={ref}
      backgroundImage={image}
      text={text}
      action={
        isPlaying
          ? options[location]
            ? { type: "options", options: options[location] }
            : {
                type: "input",
                input: {
                  placeholder: "Jouw antwoord"
                }
              }
          : {
              type: "click",
              label: hasLost
                ? "Tik om opnieuw te proberen"
                : "Tik om door te gaan"
            }
      }
      act={value =>
        dispatchInputAction(props.state, "location", value || "click")
      }
    />
  )
})
RandomWalk.name = "RandomWalk"
RandomWalk.templateName = "Random Walk"
RandomWalk.defaultProps = Entity.defaultProps

export default RandomWalk
