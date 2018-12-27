import React from 'react'

import styled from 'styled-components'
import { Wrapper } from 'components/ui'

import trail from 'images/trail.svg'

const Trail = styled.img`
  position: relative;
  z-index: -2;

  width: 100%;
  padding: 0 8em;
  margin-top: -15%;
  margin-bottom: -15%;

  mask: linear-gradient(transparent, #fff6, transparent);

  transform: scale(${props => props.ltr ? -1 : 1}, 1);
`

export default ({ ltr, ...props }) => (
  <Wrapper {...props}>
    <Trail src={trail} ltr={ltr} />
  </Wrapper>
)
