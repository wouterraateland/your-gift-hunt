import React from 'react'
import styled from 'styled-components'

import { Wrapper } from 'your-gift-hunt/ui'

const StyledFooter = styled.footer`
  padding: 2em 0;
  margin-top: 2em;

  background-color: ${props => props.theme.color.text};
  color: #fff;
`

const Footer = () => (
  <StyledFooter>
    <Wrapper>
      Footer content
    </Wrapper>
  </StyledFooter>
)

export default Footer
