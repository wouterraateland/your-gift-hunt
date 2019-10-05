import React from "react"
import styled from "styled-components"
import moment from "moment"

import { Wrapper } from "ygh-ui"

const StyledFooter = styled.footer`
  padding: 2em 0;

  background-color: ${props => props.theme.color.emphasis};
  color: #fff;

  a {
    margin-right: 1em;
    color: #fff;
    text-decoration-color: #fff1;
  }

  @media (min-width: 25em) {
    margin-top: 2em;
  }
`

const Footer = () => (
  <StyledFooter>
    <Wrapper.Medium>
      <p>
        <a href="/contact">Support</a>
        <a href="/terms">Terms</a>
        <a href="/privacy">Privacy</a>
      </p>
      <p>
        <small>© {moment().format("YYYY")} Escape Room Creator</small>
      </p>
    </Wrapper.Medium>
  </StyledFooter>
)

export default Footer
