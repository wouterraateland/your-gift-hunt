import React from 'react'

import { storiesOf } from '@storybook/react'
import { withKnobs, radios } from '@storybook/addon-knobs'

import withTheme from './decorators/withTheme'
import withCenter from './decorators/withCenter'

import {
  Battery,
  Flashlight,
  SafeKey,
  Seeds,
  WateringCan
} from 'components/items'

storiesOf('Items', module)
  .addDecorator(withCenter(true))
  .addDecorator(withTheme)
  .addDecorator(withKnobs)
  .add('Battery', () => <Battery state={radios('state', {
    Default: 'default',
  }, 'default')} />)
  .add('Flashlight', () => <Flashlight state={radios('state', {
    Empty: 'empty',
    Off: 'off',
    On: 'on',
  }, 'empty')} />)
  .add('Safe Key', () => <SafeKey state={radios('state', {
    Default: 'default',
  }, 'default')} />)
  .add('Seeds', () => <Seeds state={radios('state', {
    Default: 'default',
  }, 'default')} />)
  .add('Watering Can', () => <WateringCan state={radios('state', {
    Empty: 'empty',
    Filled: 'filled',
  }, 'empty')} />)
