import React from "react"

import { storiesOf } from "@storybook/react"
import { withKnobs, radios } from "@storybook/addon-knobs"

import withTheme from "./decorators/withTheme"
import withCenter from "./decorators/withCenter"

import {
  Battery,
  Flashlight,
  Map,
  MapPiece,
  SafeKey,
  Seeds,
  WateringCan
} from "your-gift-hunt/entities"

storiesOf("Items", module)
  .addDecorator(withCenter(true))
  .addDecorator(withTheme)
  .addDecorator(withKnobs)
  .add("Battery", () => (
    <Battery
      state={radios(
        "state",
        {
          Default: ""
        },
        ""
      )}
    />
  ))
  .add("Flashlight", () => (
    <Flashlight
      state={radios(
        "state",
        {
          Empty: "empty",
          Off: "off",
          On: "on"
        },
        "empty"
      )}
    />
  ))
  .add("Map", () => (
    <Map
      state={radios(
        "state",
        {
          Incomplete: "incomplete",
          Dirty: "dirty",
          Clean: "clean"
        },
        "incomplete"
      )}
    />
  ))
  .add("Map Piece", () => (
    <MapPiece
      state={radios(
        "state",
        {
          Default: ""
        },
        ""
      )}
    />
  ))
  .add("Safe key", () => (
    <SafeKey
      state={radios(
        "state",
        {
          Default: ""
        },
        ""
      )}
    />
  ))
  .add("Seeds", () => (
    <Seeds
      state={radios(
        "state",
        {
          Default: ""
        },
        ""
      )}
    />
  ))
  .add("Watering Can", () => (
    <WateringCan
      state={radios(
        "state",
        {
          Empty: "empty",
          Filled: "filled"
        },
        "empty"
      )}
    />
  ))
