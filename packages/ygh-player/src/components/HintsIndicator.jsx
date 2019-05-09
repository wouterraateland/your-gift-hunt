import React from "react"
import styled, { css } from "styled-components"

import useHints from "hooks/useHints"

import HintIndicator from "components/HintIndicator"

const Container = styled.div`
  margin: 1em;
`

const Marker = styled.span`
  -webkit-touch-callout: none;
  user-select: none;

  ${props =>
    props.isActive &&
    css`
      color: #ffd666;
    `}
`

const HintsIndicator = () => {
  const { hints, showHints } = useHints()
  const upcomingHint =
    hints.find(({ releasedAt }) => !!releasedAt) ||
    hints.find(({ text }) => !!text) ||
    {}
  const isActive =
    hints.some(({ text }) => !!text) ||
    (upcomingHint.releasedAt && upcomingHint.releasedAt < Date.now())

  return (
    <Container>
      <HintIndicator hint={upcomingHint} onClick={showHints}>
        <Marker isActive={isActive}>?</Marker>
      </HintIndicator>
    </Container>
  )
}

export default HintsIndicator
