import React from "react"
import styled from "styled-components"
import _ from "ygh-utils"

import { usePanZoomGraphicContext } from "hooks/usePanZoomGraphic"
import useEntityPositions from "hooks/useEntityPositions"

const Component = styled.div`
  position: absolute;

  display: flex;

  border-radius: ${props => props.theme.borderRadius};
  box-shadow: ${props => props.theme.boxShadow.medium};

  background-color: #fff;

  transform: translate(-50%, -50%);
`

const MARGIN = 48
const WIDTH = 200

const Container = ({ entity, children }) => {
  const { pan, container } = usePanZoomGraphicContext()
  const { getAbsoluteEntityPosition } = useEntityPositions()

  const entityPosition = getAbsoluteEntityPosition(entity.id)

  const cWidth = container.current ? container.current.offsetWidth : 0
  const cHeight = container.current ? container.current.offsetHeight : 0
  const isTop = entityPosition.top * 16 + pan.y < cHeight / 2

  const a = (entityPosition.rotation * Math.PI) / 180
  const eHeight =
    entityPosition.height * Math.abs(Math.cos(a)) +
    entityPosition.width * Math.abs(Math.sin(a))
  const top = _.clamp(MARGIN, cHeight - (48 + MARGIN))(
    (entityPosition.top + (3 + eHeight / 2) * (isTop ? 1 : -1)) * 16 + pan.y
  )
  const left = _.clamp(MARGIN + WIDTH / 2, cWidth - (MARGIN + WIDTH / 2))(
    entityPosition.left * 16 + pan.x
  )

  return (
    <Component style={{ top: `${top}px`, left: `${left}px` }}>
      {children}
    </Component>
  )
}

export default Container
