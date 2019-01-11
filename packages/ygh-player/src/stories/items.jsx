import React from 'react'

import { storiesOf, addDecorator } from '@storybook/react'
import { withKnobs, radios } from '@storybook/addon-knobs'

import withStyle from './decorators/withStyle'

import {
  Battery,
  Flashlight,
  SafeKey,
  Seeds,
  WateringCan
} from 'components/items'

storiesOf('Items', module)
  .addDecorator(withStyle(true))
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
