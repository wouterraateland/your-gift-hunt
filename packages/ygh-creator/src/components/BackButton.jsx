import React from "react"
import styled from "styled-components"

const BackButtonOuter = styled.div`
  width: 10em;
  height: 5.75em;
  padding: 0.5em;
  margin: -1em 0 -3em -1em;

  background-image: linear-gradient(150deg, #0001 50%, transparent 50%);
`

const Inner = styled.span`
  cursor: pointer;

  display: inline-block;
  padding: 0.5em;
`

const goBack = () => window.history.back()

const BackButton = () => (
  <BackButtonOuter>
    <Inner onClick={goBack} onKeyPress={goBack} tabIndex={0}>
      &larr; Back
    </Inner>
  </BackButtonOuter>
)

export default BackButton
