import React, { forwardRef, useEffect, useState } from "react"

import Entity from "../Entity"
import GameEntity from "../GameEntity"
import _ from "ygh-utils"

const options = {
  Q1: [
    "Rochefort 10",
    "Grimbergen Optimo Bruno",
    "Blauwe Chimay",
    "Maredsous 10"
  ],
  Q2: ["10kg/jaar", "14kg/jaar", "18kg/jaar", "22kg/jaar"],
  Q3: ["158m", "165m", "173m", "183m"],
  Q4: ["Gent-Wevelgem", "Luik-Bastenaken-Luik", "Ronde van Vlaanderen"],
  Q5: ["Juist", "Onjuist"],
  Q6: ["Ja"]
}

const TVGame = forwardRef(({ dispatchInputAction, ...props }, ref) => {
  const [correctnessVisibility, setCorrectnessVisibility] = useState(false)
  const hasLost = _.hasState("Lost")(props)
  const hasWon = _.hasState("Won")(props)
  const hasStarted = !_.hasState("Intro")(props)
  const isPlaying = hasStarted && !hasLost && !hasWon

  const question = props.state.name
  const text = _.getFieldValue(`Text ${question}`)(props)
  const image = _.getFieldValue(`Image ${question}`)(props)

  const correctImage =
    "https://storage.googleapis.com/your-gift-hunt/sara/quiz-question.jpg"

  useEffect(() => {
    if (["Q2", "Q3", "Q4", "Q5", "Q6"].includes(props.state.name)) {
      setCorrectnessVisibility(true)
    }
  }, [props.state.id])

  return (
    <GameEntity
      ref={ref}
      backgroundImage={correctnessVisibility ? correctImage : image}
      text={correctnessVisibility ? "Dat antwoord is correct!" : text}
      action={
        correctnessVisibility
          ? {
              type: "click",
              label: "Tik om door te gaan"
            }
          : isPlaying
          ? options[question]
            ? { type: "options", options: options[question] }
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
                : hasStarted
                ? "Tik om jouw prijs op te halen"
                : "Tik om te beginnen"
            }
      }
      act={
        correctnessVisibility
          ? () => setCorrectnessVisibility(false)
          : value =>
              dispatchInputAction(props.state, "answer", value || "click")
      }
    />
  )
})
TVGame.name = "TVGame"
TVGame.templateName = "TV Game"
TVGame.defaultProps = Entity.defaultProps

export default TVGame
