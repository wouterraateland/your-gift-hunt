import React from "react"
import styled from "styled-components"

import Item from "./Item"
import MapTexture from "./MapTexture"

const StyledMapPiece = styled(Item)`
  width: 2em;
  height: 2em;

  box-shadow: inset 1em 1em 1em -1em #0009;

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

  background-color: #d0c6b0;
`

const MapPiece = () => (
  <StyledMapPiece>
    <MapTexture size={2} />
  </StyledMapPiece>
)
MapPiece.displayName = "Map piece"
MapPiece.entityName = "Map piece"

export default MapPiece
