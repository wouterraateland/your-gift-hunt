import React from 'react'

import { storiesOf } from '@storybook/react'
import { withKnobs, boolean } from '@storybook/addon-knobs'

import withStyle from './decorators/withStyle'

import {
  Camera,
  Computer,
  Mailbox,
  SafeWithCode,
  SafeWithKeyhole
} from 'components/screens'

storiesOf('Screens', module)
  .addDecorator(withStyle(false))
  .addDecorator(withKnobs)
  .add('Camera', () => <Camera isOpen={boolean('Open')} />)
  .add('Computer', () => <Computer isOpen={boolean('Open')} />)
  .add('Mailbox', () => <Mailbox isOpen={boolean('Open')} />)
  .add('SafeWithCode', () => <SafeWithCode isOpen={boolean('Open')} />)
  .add('SafeWithKeyhole', () => <SafeWithKeyhole isOpen={boolean('Open')} />)
