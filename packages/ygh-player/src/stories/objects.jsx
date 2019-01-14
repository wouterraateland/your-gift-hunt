import React from 'react'

import { storiesOf } from '@storybook/react'
import { withKnobs, radios } from '@storybook/addon-knobs'

import withTheme from './decorators/withTheme'
import withCenter from './decorators/withCenter'

import Armchair from 'components/objects/Armchair'
import Camera from 'components/objects/Camera'
import Carpet from 'components/objects/Carpet'
import Computer from 'components/objects/Computer'
import Desk from 'components/objects/Desk'
import DeskChair from 'components/objects/DeskChair'
import Door from 'components/objects/Door'
import Floor from 'components/objects/Floor'
import Grass from 'components/objects/Grass'
import InstructionNote from 'components/objects/InstructionNote'
import Lamp from 'components/objects/Lamp'
import Mailbox from 'components/objects/Mailbox'
import Package from 'components/objects/Package'
import Path from 'components/objects/Path'
import PlantPot from 'components/objects/PlantPot'
import SafeWithKeyhole from 'components/objects/SafeWithKeyhole'
import Sink from 'components/objects/Sink'
import Wall from 'components/objects/Wall'

storiesOf('Objects', module)
  .addDecorator(withCenter(false))
  .addDecorator(withTheme)
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
    Closed: 'closed',
    Open: 'open',
  }, 'closed')} />)
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
