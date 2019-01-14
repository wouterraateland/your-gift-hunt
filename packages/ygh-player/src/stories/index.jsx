import React from 'react'

import { storiesOf } from '@storybook/react'

import withTheme from './decorators/withTheme'

import Scene from 'components/Scene'
import * as Object from 'components/objects'

storiesOf('Overview', module)
  .addDecorator(withTheme)
  .add('Getting started', () => (
    <>
      <small>Your Gift Hunt</small>
      <h1>Component library</h1>
    </>
  ))
  .add('Demo scene', () => (
    <Scene width={55} height={50}>
      <Object.Grass left={-10} top={-10} />
      <Object.Grass left={10} top={-10} />
      <Object.Grass left={30} top={-10} />
      <Object.Grass left={-10} top={10} />
      <Object.Grass left={10} top={10} />
      <Object.Grass left={30} top={10} />
      <Object.Grass left={-10} top={30} />
      <Object.Grass left={10} top={30} />
      <Object.Grass left={30} top={30} />
      <Object.Path left={19.5} top={28.5} angle={-30} />
      <Object.Mailbox left={16} top={33} angle={-30} />

      <Object.Floor angle={-30}>
        <Object.Carpet left={17} top={11} angle={-5} />

        <Object.Armchair left={24} top={20} angle={-45} />
        <Object.PlantPot left={27} top={14} />
        <Object.Camera left={18} top={22} angle={20} />
        <Object.Lamp left={22} top={25} angle={-70} />

        <Object.Sink left={-4.5} top={16.5} angle={90} />

        <Object.SafeWithKeyhole left={25} top={2} angle={30} />

        <Object.DeskChair left={6} top={6} angle={10} />
        <Object.Desk left={4} top={-1} angle={80}>
          <Object.Computer left={1} top={1} angle={-80} />
          <Object.InstructionNote left={2} top={7} angle={-70} />
        </Object.Desk>

        <Object.Door left={9} top={28} />
        <Object.Wall left={-1} top={-1} />
      </Object.Floor>
    </Scene>
  ))
