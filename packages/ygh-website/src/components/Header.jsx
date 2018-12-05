import React from 'react'
import styled from 'styled-components'

import Wrapper from 'components/ui/Wrapper'

import background from 'images/background.jpg'

const Header = styled.header`
  display: flex;
  flex-direction: column;
  justify-content: center;

  min-height: 80vh;

  background:
    linear-gradient(#0009 80%, #000),
    url(${background}) no-repeat center bottom 25% / cover;

  color: #fffc;

  h1 {
    color: #fff;
  }

  @media (min-width: 721px) {
    ${'' /* font-size: 1.2rem; */}
  }
`

export default ({ children }) => {
  return (
    <Header>
      <Wrapper small>
        {children}
      </Wrapper>
    </Header>
  )
}
