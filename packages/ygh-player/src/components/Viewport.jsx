import React, { useLayoutEffect } from "react"
import styled from "styled-components"

import useViewport from "hooks/useViewport"

const Viewport = styled.div`
  position: relative;
  flex-grow: 1;

  overflow: auto;
`

const scrollToCenter = el => {
  el &&
    el.scrollTo(
      (el.scrollWidth - el.offsetWidth) / 2,
      (el.scrollHeight - el.offsetHeight) / 2
    )
}

export default props => {
  const { viewportRef } = useViewport()

  useLayoutEffect(() => {
    scrollToCenter(viewportRef.current)
  }, [])

  return <Viewport ref={viewportRef} {...props} />
}
