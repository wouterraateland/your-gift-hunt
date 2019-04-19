import styled, { css } from "styled-components"
import hexagon from "images/hexagon.svg"

const Body = styled.div`
  position: relative;
  flex-grow: 1;

  ${props =>
    props.index &&
    css`
      background: url(${hexagon}) no-repeat right -10% top 60% / 20em,
        url(${hexagon}) no-repeat left -10% top 90% / 14em;
    `}
`

export default Body
