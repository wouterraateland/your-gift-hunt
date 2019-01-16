import React from 'react'
import styled from 'styled-components'
import { opacify } from 'polished'

import Wrapper from './Wrapper'

const Header = styled.header`
  margin: -8em 0 4em;
  padding: 8em 0 2em;

  background: linear-gradient(#000, #000d);
  clip-path: polygon(0 0, 100% 0, 100% 80%, 0 100%);

  &, a {
    color: #fffc;
    text-decoration-color: #fff3;

    a:hover {
      color: ${opacify(.3, '#fffc')};
    }
  }

  h1, h2, h3, h4, h5, h6 {
    color: #fff;
  }
`

export default ({ children }) => {
  return (
    <Header>
      <Wrapper xlarge>
        {children}
      </Wrapper>
    </Header>
  )
}
