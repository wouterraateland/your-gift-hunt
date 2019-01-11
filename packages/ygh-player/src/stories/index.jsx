import React from 'react'
import styled from 'styled-components'

import { addDecorator } from '@storybook/react'

const Center = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  align-items: center;
  justify-content: center;
`

addDecorator(story => <Center>{story()}</Center>)
