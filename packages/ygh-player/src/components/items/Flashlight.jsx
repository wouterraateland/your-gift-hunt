import React, { useRef, useEffect, useContext } from "react"
import _ from "utils"
import { createInputAction } from "actions/creators"

import { Flashlight } from "your-gift-hunt/items"

import acceptDrop from "hooks/acceptDrop"
import GameContext from "contexts/Game"

export default props => {
  const powerButton = useRef(null)
  const body = useRef(null)

  const { dispatchAction } = useContext(GameContext)

  function handleClickPowerButton() {
    dispatchAction(
      createInputAction(props.id, {
        power: _.hasState("off")(props) ? "on" : "off"
      })
    )
  }

  useEffect(() => {
    powerButton.current.addEventListener("click", handleClickPowerButton)

    return () => {
      powerButton.current.removeEventListener("click", handleClickPowerButton)
    }
  }, [])

  acceptDrop({
    element: body,
    instance: props,
    items: [
      {
        item: { entityName: "Battery", stateName: null },
        target: { entityName: "Flashlight", stateName: "empty" }
      }
    ]
  })

  return (
    <Flashlight
      {...props}
      ref={{
        body,
        powerButton
      }}
    />
  )
}
