import React, { forwardRef } from "react"
import styled from "styled-components"

import Entity from "./Entity"
import MapTexture from "./MapTexture"

const StyledMapPiece = styled(Entity)`
  &::before {
    width: 100%;
    height: 100%;
    box-shadow: inset 1em 1em 1em -1em #0009;
  }

  &,
  &::before {
    clip-path: polygon(
      50% 10%,
      56% 24%,
      36% 20%,
      40% 4%,
      24% 6%,
      10% 20%,
      3% 100%,
      40% 90%,
      90% 95%,
      100% 80%,
      90% 50%,
      95% 10%
    );
  }

  background-color: #d0c6b0;
`

const MapPiece = forwardRef(({ children, ...props }, ref) => (
  <StyledMapPiece ref={ref} {...props}>
    <MapTexture size={2} />
    {children}
  </StyledMapPiece>
))
MapPiece.name = "MapPiece"
MapPiece.displayName = "Map piece"
MapPiece.templateName = "Map piece"
MapPiece.defaultProps = {
  ...Entity.defaultProps,
  z: 0.25,
  width: 2,
  height: 2
}

export default MapPiece
