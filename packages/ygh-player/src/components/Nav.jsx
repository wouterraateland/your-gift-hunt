import React from "react"
import styled from "styled-components"
import { Link } from "@reach/router"

import Account from "components/Account"

const Container = styled.nav`
  display: flex;
  justify-content: space-between;
`

const Title = styled.h2`
  margin: 0;
`

const Nav = ({ title, ...otherProps }) => (
  <Container>
    {otherProps.href ? (
      <a {...otherProps}>
        <Title>{title}</Title>
      </a>
    ) : (
      <Link {...otherProps}>
        <Title>{title}</Title>
      </Link>
    )}
    <Account />
  </Container>
)

export default Nav
