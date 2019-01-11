import React from 'react'
import styled, { createGlobalStyle } from 'styled-components'

import { storiesOf, addDecorator } from '@storybook/react'
import { withKnobs, radios } from '@storybook/addon-knobs'

import {
  Battery,
  Flashlight,
  SafeKey,
  Seeds,
  WateringCan
} from 'components/items'

const Center = styled.div`
  position: relative;
  width: 100vw;
  height: 100vh;

  display: flex;
  align-items: center;
  justify-content: center;

  &::before {
    content: '';

    position: absolute;
    left: 0; top: 0;
    right: 0; bottom: 0;

    margin: auto;

    width: 2em;
    height: 2em;

    background-color: #0001;
  }
`

const GlobalStyles = createGlobalStyle`
  *, *::before, *::after {
    box-sizing: border-box;
  }

  body {
    padding: 0;
    margin: 0;
  }
`

addDecorator(story => (
  <Center>
    <GlobalStyles />
    {story()}
  </Center>
))
addDecorator(withKnobs)

storiesOf('Items', module)
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
