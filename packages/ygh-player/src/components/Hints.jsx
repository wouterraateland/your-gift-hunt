import React, { useCallback, useEffect, useState } from "react"
import styled from "styled-components"

import { ProgressRing } from "your-gift-hunt/ui"

const HintsContainer = styled.div`
  position: relative;
  width: 32px;
  height: 32px;
  margin: 1em;

  text-align: center;
  line-height: 32px;

  color: ${props => (props.progress === 1 ? "gold" : "#fff4")};
`

const StyledProgressRing = styled(ProgressRing)`
  position: absolute;
  top: 0;
  left: 0;

  color: gold;
`

const Hints = () => {
  const [progress, setProgress] = useState(0)

  const onClick = useCallback(() => {
    if (progress === 1) {
      setProgress(0)
    }
  }, [progress === 1])

  const updateProgress = useCallback(() => {
    setProgress(progress => Math.min(progress + 0.01, 1))
  }, [])

  useEffect(() => {
    const i = setInterval(updateProgress, 100)

    return () => {
      clearInterval(i)
    }
  }, [])

  return (
    <HintsContainer progress={progress} onClick={onClick}>
      <StyledProgressRing
        radius={16}
        stroke={2}
        progress={progress}
        bgColor="#fff4"
      />
      ?
    </HintsContainer>
  )
}

export default Hints
