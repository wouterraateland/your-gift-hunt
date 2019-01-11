import React from 'react'

import { storiesOf, addDecorator } from '@storybook/react'
import { withKnobs, radios } from '@storybook/addon-knobs'

import withStyle from './decorators/withStyle'

import {
  SafeWithKeyhole,
  PlantPot
} from 'components/objects'

storiesOf('Objects', module)
  .addDecorator(withStyle(false))
  .addDecorator(withKnobs)
  .add('Safe with keyhole', () => <SafeWithKeyhole state={radios('state', {
    Locked: 'locked',
    Unlocked: 'unlocked',
  }, 'locked')} />)
  .add('Plant pot', () => <PlantPot state={radios('state', {
    Empty: 'empty',
    Planted: 'planted',
    Grown: 'grown',
  }, 'empty')} />)
