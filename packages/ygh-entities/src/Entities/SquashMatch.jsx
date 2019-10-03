import React, { forwardRef, useEffect, useState } from "react"

import Entity from "../Entity"
import GameEntity from "../GameEntity"
import _ from "ygh-utils"

const SquashMatch = forwardRef(({ dispatchInputAction, ...props }, ref) => {
  const [step, setStep] = useState(0)
  const hasLost = _.hasState("Lost")(props)
  const hasWon = _.hasState("Won")(props)
  const isPlaying = !hasLost && !hasWon
  const score = props.state.name.split("-").map(x => parseInt(x, 10))

  const texts = isPlaying
    ? _.getFieldValue(`Texts ${props.state.name}`)(props)
    : [_.getFieldValue(`Text ${props.state.name}`)(props)]

  const images = isPlaying
    ? _.getFieldValue(`Images ${props.state.name}`)(props)
    : [_.getFieldValue(`Image ${props.state.name}`)(props)]

  useEffect(() => {
    setStep(0)
  }, [props.state.id])

  return (
    <GameEntity
      ref={ref}
      backgroundImage={images[step]}
      text={texts[step]}
      action={
        step < texts.length - 1
          ? { type: "click", label: "Tik om door te gaan" }
          : isPlaying
          ? {
              type: "options",
              options: [
                `${score[0] + 1}-${score[1]}`,
                `${score[0]}-${score[1] + 1}`,
                "Ik ben de tel kwijt"
              ]
            }
          : {
              type: "click",
              label: hasWon
                ? "Tik om naar de toko te gaan"
                : "Tik om opnieuw te proberen"
            }
      }
      act={
        step < texts.length - 1
          ? () => setStep(step => step + 1)
          : value => dispatchInputAction(props.state, "score", value || "click")
      }
    />
  )
})
SquashMatch.name = "SquashMatch"
SquashMatch.templateName = "Squash Match"
SquashMatch.defaultProps = Entity.defaultProps

export default SquashMatch
