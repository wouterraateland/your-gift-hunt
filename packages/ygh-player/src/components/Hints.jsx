import React, { useCallback, useEffect, useRef, useState } from "react"
import styled from "styled-components"

import useHints from "hooks/useHints"
import { useClickOutside } from "ygh-hooks"

import HintIndicator from "components/HintIndicator"

const Container = styled.div`
  position: fixed;
  z-index: 4;
  top: 0;
  left: 0;
  right: 0;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  padding: 1em;

  @media (orientation: landscape) {
    left: 5.5em;
  }

  opacity: ${props => (props.isVisible ? 1 : 0)};
  pointer-events: ${props => (props.isVisible ? "auto" : "none")};

  &::after {
    content: "";

    position: absolute;
    top: 4em;
    left: 5em;
    right: 5em;
    z-index: -1;

    box-shadow: 0 0 6em 6em #000;
  }
`

const Message = styled.p`
  color: #fff;
`

const Navigation = styled.div`
  display: flex;

  & > * {
    margin: 1em;
  }
`

const StyledHintIndicator = styled(HintIndicator)`
  transform: scale(${props => (props.isSelected ? 1.2 : 1)});
`

const Hints = () => {
  const ref = useRef(null)
  const { hints, hideHints, requestHints, isVisible } = useHints()
  const [hintIndex, setHintIndex] = useState(0)

  useClickOutside({
    ref,
    onClickOutside: () => isVisible && hideHints(),
    inputs: [isVisible]
  })

  useEffect(() => {
    const nonAvailableIndex = hints.findIndex(({ text }) => !text)
    setHintIndex(
      nonAvailableIndex === -1 ? hints.length - 1 : nonAvailableIndex - 1
    )
  }, [isVisible])

  const onHintClick = useCallback(async (hint, i) => {
    if (hint.text) {
      setHintIndex(i)
    } else if (hint.releasedAt && hint.releasedAt < Date.now()) {
      await requestHints()
      setHintIndex(i)
    }
  })

  return (
    <Container ref={ref} isVisible={isVisible}>
      <Message>
        {hints && hints[hintIndex] ? hints[hintIndex].text : null}
      </Message>
      <Navigation>
        {hints.map((hint, i) => (
          <StyledHintIndicator
            key={i}
            onClick={() => onHintClick(hint, i)}
            hint={hint}
            isSelected={hintIndex === i}
          >
            {i + 1}
          </StyledHintIndicator>
        ))}
      </Navigation>
    </Container>
  )
}

export default Hints
