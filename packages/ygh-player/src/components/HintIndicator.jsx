import React, { useCallback, useEffect, useState } from "react"
import styled from "styled-components"
import _ from "ygh-utils"

import { ProgressRing } from "ygh-ui"

const Container = styled.div`
  position: relative;
  width: 32px;
  height: 32px;

  text-align: center;
  line-height: 32px;

  cursor: ${props => (props.isAvailable ? "pointer" : "initial")};
  color: ${props => (props.isAvailable ? "#ffd666" : "#fff4")};
`

const StyledProgressRing = styled(ProgressRing)`
  position: absolute;
  top: 0;
  left: 0;

  color: #ffd666;
`

const HintIndicator = ({ hint, children, ...props }) => {
  const [progress, setProgress] = useState(0)
  const isAvailable = !!hint.text || hint.releasedAt < Date.now()

  const updateProgress = useCallback(() => {
    setProgress(
      hint.releasedAt
        ? _.clamp(0, 1)(
            1 + (Date.now() - hint.releasedAt) / (hint.delay * 1000)
          )
        : isAvailable
        ? 1
        : 0
    )
  }, [isAvailable, hint])

  useEffect(() => {
    const i = setInterval(updateProgress, 100)

    return () => {
      clearInterval(i)
    }
  }, [isAvailable, hint])

  return (
    <Container isAvailable={isAvailable} {...props}>
      <StyledProgressRing
        radius={16}
        stroke={2}
        progress={progress}
        bgColor="#fff4"
      />
      {children}
    </Container>
  )
}

export default HintIndicator
