import React from "react"
import styled from "styled-components"

import { OutboundLink } from "gatsby-plugin-google-analytics"

const Container = styled.span`
  position: relative;
`

const SignupLink = styled(OutboundLink)`
  margin: 1.2em 0 0 1em;

  line-height: 1.58;
  text-decoration: none;
`

const SignInLink = styled.small`
  position: absolute;
  right: 0;
  white-space: nowrap;
`

const Account = () => (
  <Container>
    <SignInLink>
      Already have an account?{" "}
      <OutboundLink href="https://create.yourgifthunt.com/auth/login">
        Log in
      </OutboundLink>
    </SignInLink>
    <SignupLink href="https://create.yourgifthunt.com/auth/signup">
      Sign up
    </SignupLink>
  </Container>
)

export default Account
