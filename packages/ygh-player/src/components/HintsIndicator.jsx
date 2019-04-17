import React, { useCallback } from "react"
import styled from "styled-components"

import useHints from "hooks/useHints"

import HintIndicator from "components/HintIndicator"

const Container = styled.div`
  margin: 1em;
`

const HintsIndicator = () => {
  const { hints, showHints } = useHints()
  const upcomingHint =
    hints.find(({ releasedAt }) => !!releasedAt) ||
    hints.find(({ text }) => !!text) ||
    {}
  const isAvailable =
    !!upcomingHint.text ||
    (!!upcomingHint.releasedAt && upcomingHint.releasedAt < Date.now())
  const onClick = useCallback(() => isAvailable && showHints(), [isAvailable])

  return (
    <Container>
      <HintIndicator hint={upcomingHint} onClick={onClick}>
        ?
      </HintIndicator>
    </Container>
  )
}

export default HintsIndicator
