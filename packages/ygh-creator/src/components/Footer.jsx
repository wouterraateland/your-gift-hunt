import React from "react"
import styled from "styled-components"
import moment from "moment"

import { Wrapper } from "your-gift-hunt/ui"

const StyledFooter = styled.footer`
  padding: 2em 0;
  margin-top: 2em;

  background-color: ${props => props.theme.color.emphasis};
  color: #fff;

  a {
    margin-right: 1em;
    color: #fff;
    text-decoration-color: #fff1;
  }
`

const Footer = () => (
  <StyledFooter>
    <Wrapper>
      <p>
        <a href="https://yourgifthunt.com/contact">Support</a>
        <a href="https://yourgifthunt.com/terms">Terms</a>
      </p>
      <p>
        <small>© {moment().format("YYYY")} Your Gift Hunt</small>
      </p>
    </Wrapper>
  </StyledFooter>
)

export default Footer
