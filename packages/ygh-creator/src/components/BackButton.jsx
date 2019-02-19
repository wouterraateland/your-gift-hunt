import React from "react"
import styled from "styled-components"

const BackButtonContainer = styled.div`
  cursor: pointer;

  margin-left: -1em;
  margin-top: -1em;

  width: 10em;
  height: 5.75em;
  padding: 1em;
  margin-bottom: -3em;

  background-image: linear-gradient(150deg, #0001 50%, transparent 50%);
`

const BackButton = () => (
  <BackButtonContainer onClick={() => window.history.back()}>
    <span>&larr;</span> Back
  </BackButtonContainer>
)

export default BackButton
