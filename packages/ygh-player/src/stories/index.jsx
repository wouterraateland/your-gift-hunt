import React from 'react'

import { storiesOf } from '@storybook/react'

import withTheme from './decorators/withTheme'

import DefaultScene from 'scenes/default'

import Viewport from 'components/Viewport'

storiesOf('Overview', module)
  .addDecorator(withTheme)
  .add('Getting started', () => (
    <>
      <small>Your Gift Hunt</small>
      <h1>Component library</h1>
    </>
  ))
  .add('Default scene', () => (
    <Viewport>
      <DefaultScene />
    </Viewport>
  ))
