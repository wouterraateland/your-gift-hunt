import React from 'react'

import { storiesOf, addDecorator } from '@storybook/react'
import { withKnobs, radios } from '@storybook/addon-knobs'

import withStyle from './decorators/withStyle'

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
  SafeWithKeyhole,
  Sink,
  Wall
} from 'components/objects'

storiesOf('Objects', module)
  .addDecorator(withStyle(false))
  .addDecorator(withKnobs)
  .add('Armchair', () => <Armchair state={radios('state', {
    Default: 'default',
  }, 'default')} />)
  .add('Camera', () => <Camera state={radios('state', {
    Default: 'default',
  }, 'default')} />)
  .add('Carpet', () => <Carpet state={radios('state', {
    Default: 'default',
  }, 'default')} />)
  .add('Computer', () => <Computer state={radios('state', {
    Off: 'off',
    On: 'on',
  }, 'off')} />)
  .add('Desk', () => <Desk state={radios('state', {
    Default: 'default',
  }, 'default')} />)
  .add('Desk chair', () => <DeskChair state={radios('state', {
    Default: 'default',
  }, 'default')} />)
  .add('Door', () => <Door state={radios('state', {
    Default: 'default',
  }, 'default')} />)
  .add('Floor', () => <Floor state={radios('state', {
    Default: 'default',
  }, 'default')} />)
  .add('Grass', () => <Grass state={radios('state', {
    Default: 'default',
  }, 'default')} />)
  .add('Instruction note', () => <InstructionNote state={radios('state', {
    Default: 'default',
  }, 'default')} />)
  .add('Lamp', () => <Lamp state={radios('state', {
    Off: 'off',
    On: 'on',
  }, 'off')} />)
  .add('Mailbox', () => <Mailbox state={radios('state', {
    Closed: 'closed',
    Open: 'open',
  }, 'closed')} />)
  .add('Package', () => <Package state={radios('state', {
    Closed: 'closed',
    Open: 'open'
  }, 'closed')} />)
  .add('Path', () => <Path state={radios('state', {
    Default: 'default',
  }, 'default')} />)
  .add('Plant pot', () => <PlantPot state={radios('state', {
    Empty: 'empty',
    Planted: 'planted',
    Grown: 'grown',
  }, 'empty')} />)
  .add('Safe with keyhole', () => <SafeWithKeyhole state={radios('state', {
    Locked: 'locked',
    Unlocked: 'unlocked',
  }, 'locked')} />)
  .add('Sink', () => <Sink state={radios('state', {
    Disconnected: 'disconnected',
    Connected: 'connected',
  }, 'disconnected')} />)
  .add('Wall', () => <Wall state={radios('state', {
    Default: 'default',
  }, 'default')} />)
