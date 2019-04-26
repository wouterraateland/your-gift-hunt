import React from "react"
import styled from "styled-components"

import Wrapper from "./Wrapper"

const Header = styled.header`
  padding: 4em 0;

  max-width: 40em;
`

export default ({ children }) => {
  return (
    <Header>
      <Wrapper xlarge>{children}</Wrapper>
    </Header>
  )
}
