import React from "react"

import { storiesOf } from "@storybook/react"
import { withKnobs, radios, number } from "@storybook/addon-knobs"

import withTheme from "./decorators/withTheme"
import withCenter from "./decorators/withCenter"

import {
  Armchair,
  Camera,
  Carpet,
  Computer,
  Desk,
  DeskChair,
  Door,
  Floor,
  Grass,
  InstructionNote,
  Lamp,
  Mailbox,
  Package,
  Path,
  PlantPot,
  SafeWithCode,
  SafeWithKeyhole,
  Tree,
  WorktopWithSink,
  Wall
} from "your-gift-hunt/Entities"

storiesOf("Objects", module)
  .addDecorator(withCenter(false))
  .addDecorator(withTheme)
  .addDecorator(withKnobs)
  .add("Armchair", () => (
    <Armchair
      state={radios(
        "state",
        {
          Default: ""
        },
        ""
      )}
      width={number("width", Armchair.defaultProps.width)}
      height={number("height", Armchair.defaultProps.height)}
      rotation={number("rotation", Armchair.defaultProps.rotation)}
    />
  ))
  .add("Camera", () => (
    <Camera
      state={radios(
        "state",
        {
          Default: ""
        },
        ""
      )}
    />
  ))
  .add("Carpet", () => (
    <Carpet
      state={radios(
        "state",
        {
          Default: ""
        },
        ""
      )}
    />
  ))
  .add("Computer", () => (
    <Computer
      state={radios(
        "state",
        {
          Off: "off",
          On: "on"
        },
        "off"
      )}
    />
  ))
  .add("Desk", () => (
    <Desk
      state={radios(
        "state",
        {
          Default: ""
        },
        ""
      )}
    />
  ))
  .add("Desk chair", () => (
    <DeskChair
      state={radios(
        "state",
        {
          Default: ""
        },
        ""
      )}
    />
  ))
  .add("Door", () => (
    <Door
      state={radios(
        "state",
        {
          Closed: "closed",
          Open: "open"
        },
        "closed"
      )}
    />
  ))
  .add("Floor", () => (
    <Floor
      state={radios(
        "state",
        {
          Default: ""
        },
        ""
      )}
    />
  ))
  .add("Grass", () => (
    <Grass
      state={radios(
        "state",
        {
          Default: ""
        },
        ""
      )}
    />
  ))
  .add("Instruction note", () => (
    <InstructionNote
      state={radios(
        "state",
        {
          Default: ""
        },
        ""
      )}
    />
  ))
  .add("Lamp", () => (
    <Lamp
      state={radios(
        "state",
        {
          Off: "off",
          On: "on"
        },
        "off"
      )}
    />
  ))
  .add("Mailbox", () => (
    <Mailbox
      state={radios(
        "state",
        {
          Closed: "closed",
          Open: "open"
        },
        "closed"
      )}
    />
  ))
  .add("Package", () => (
    <Package
      state={radios(
        "state",
        {
          Closed: "closed",
          Open: "open"
        },
        "closed"
      )}
      width={number("width", Package.defaultProps.width)}
      height={number("height", Package.defaultProps.height)}
      template={{ name: "Flashlight" }}
    />
  ))
  .add("Path", () => (
    <Path
      state={radios(
        "state",
        {
          Default: ""
        },
        ""
      )}
    />
  ))
  .add("Plant pot", () => (
    <PlantPot
      state={radios(
        "state",
        {
          Empty: "empty",
          Planted: "planted",
          Grown: "grown"
        },
        "empty"
      )}
    />
  ))
  .add("Safe with code", () => (
    <SafeWithCode
      state={radios(
        "state",
        {
          Locked: "locked",
          Unlocked: "unlocked"
        },
        "locked"
      )}
    />
  ))
  .add("Safe with keyhole", () => (
    <SafeWithKeyhole
      state={radios(
        "state",
        {
          Locked: "locked",
          Unlocked: "unlocked"
        },
        "locked"
      )}
    />
  ))
  .add("Tree", () => (
    <Tree
      state={radios(
        "state",
        {
          Default: ""
        },
        ""
      )}
    />
  ))
  .add("Worktop with sink", () => (
    <WorktopWithSink
      state={radios(
        "state",
        {
          Disconnected: "disconnected",
          Connected: "connected"
        },
        "disconnected"
      )}
    />
  ))
  .add("Wall", () => (
    <Wall
      state={radios(
        "state",
        {
          Default: ""
        },
        ""
      )}
    />
  ))
