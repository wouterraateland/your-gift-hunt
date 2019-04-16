import React from "react"

import { storiesOf } from "@storybook/react"

import withTheme from "./decorators/withTheme"

import Viewport from "components/Viewport"
import Scene from "components/Scene"
import Entities from "your-gift-hunt/Entities"

storiesOf("Overview", module)
  .addDecorator(withTheme)
  .add("Getting started", () => (
    <>
      <small>Your Gift Hunt</small>
      <h1>Component library</h1>
    </>
  ))
  .add("Default scene", () => (
    <Viewport>
      <Scene left={-50} top={-40} width={100} height={80}>
        <Entities.Grass left={0} top={0} width={100} height={80} />

        <Entities.Floor left={0} top={0} rotation={-5}>
          <Entities.Path left={12} top={44} />
          <Entities.Package
            left={12}
            top={40}
            rotation={-10}
            template={{ name: "Watering can" }}
          />
          <Entities.Mailbox left={6.5} top={38.5} />

          <Entities.Carpet left={21.5} top={22.5} rotation={-5} />

          <Entities.Armchair left={23.5} top={29.5} rotation={-45} />
          <Entities.Camera left={17.5} top={23.5} rotation={40} />
          <Entities.Lamp left={26.5} top={25.5} rotation={160} />

          <Entities.PlantPot left={3.5} top={12.5} />
          <Entities.WorktopWithSink left={3.25} top={24} rotation={90} />

          <Entities.SafeWithKeyhole left={23.5} top={4.5} rotation={30} />

          <Entities.DeskChair left={7} top={6.5} rotation={10} />
          <Entities.Desk left={7.5} top={4} rotation={90}>
            <Entities.Computer left={3} top={3} rotation={-80} />
            <Entities.InstructionNote left={3} top={9} rotation={-70} />
          </Entities.Desk>

          <Entities.Door left={12} top={35} />
          <Entities.Wall />
        </Entities.Floor>
      </Scene>
    </Viewport>
  ))
