import React from "react"
import styled, { css } from "styled-components"

const Center = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;

  transform: translate(-50%, -50%);
`

const withCenter = story => <Center>{story()}</Center>

export default withCenter
