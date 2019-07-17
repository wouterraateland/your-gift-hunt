import React, { forwardRef } from "react"
import styled, { css } from "styled-components"
import Entity from "../Entity"
import _ from "ygh-utils"

const CarpetInner = styled(Entity)`
  width: 100%;
  height: 100%;
  border-radius: 0.5em;

  background-color: hsl(34, 53%, 82%);
  background-image: repeating-linear-gradient(
      45deg,
      transparent 0.25em,
      hsla(197, 62%, 11%, 0.5) 0.25em,
      hsla(197, 62%, 11%, 0.5) 0.5em,
      hsla(5, 53%, 63%, 0) 0.5em,
      hsla(5, 53%, 63%, 0) 1.75em,
      hsla(5, 53%, 63%, 0.5) 1.75em,
      hsla(5, 53%, 63%, 0.5) 2em,
      hsla(197, 62%, 11%, 0.5) 2em,
      hsla(197, 62%, 11%, 0.5) 2.5em,
      hsla(197, 62%, 11%, 0) 2.5em,
      hsla(197, 62%, 11%, 0) 3em,
      hsla(5, 53%, 63%, 0.5) 3em,
      hsla(5, 53%, 63%, 0.5) 3.5em,
      hsla(35, 91%, 65%, 0.5) 3.5em,
      hsla(35, 91%, 65%, 0.5) 4em,
      hsla(35, 91%, 65%, 0) 4em,
      hsla(35, 91%, 65%, 0) 4.5em,
      hsla(5, 53%, 63%, 0.5) 4.5em,
      hsla(5, 53%, 63%, 0.5) 5.5em,
      hsla(5, 53%, 63%, 0) 5.5em,
      hsla(5, 53%, 63%, 0) 6em,
      hsla(197, 62%, 11%, 0.5) 6em,
      hsla(197, 62%, 11%, 0.5) 7em
    ),
    repeating-linear-gradient(
      135deg,
      transparent 0.25em,
      hsla(197, 62%, 11%, 0.5) 0.25em,
      hsla(197, 62%, 11%, 0.5) 0.5em,
      hsla(5, 53%, 63%, 0) 0.5em,
      hsla(5, 53%, 63%, 0) 1.75em,
      hsla(5, 53%, 63%, 0.5) 1.75em,
      hsla(5, 53%, 63%, 0.5) 2em,
      hsla(197, 62%, 11%, 0.5) 2em,
      hsla(197, 62%, 11%, 0.5) 2.5em,
      hsla(197, 62%, 11%, 0) 2.5em,
      hsla(197, 62%, 11%, 0) 3em,
      hsla(5, 53%, 63%, 0.5) 3em,
      hsla(5, 53%, 63%, 0.5) 3.5em,
      hsla(35, 91%, 65%, 0.5) 3.5em,
      hsla(35, 91%, 65%, 0.5) 4em,
      hsla(35, 91%, 65%, 0) 4em,
      hsla(35, 91%, 65%, 0) 4.5em,
      hsla(5, 53%, 63%, 0.5) 4.5em,
      hsla(5, 53%, 63%, 0.5) 5.5em,
      hsla(5, 53%, 63%, 0) 5.5em,
      hsla(5, 53%, 63%, 0) 7em,
      hsla(197, 62%, 11%, 0.5) 7em,
      hsla(197, 62%, 11%, 0.5) 13em
    );

  ${props =>
    props.isFolded &&
    css`
      clip-path: polygon(-10% 40%, 40% -10%, 110% -10%, 110% 110%, -10% 110%);

      &::after {
        width: 30%;
        height: 30%;

        border: 0.25em solid #0004;
        border-color: transparent #0004 #0004 transparent;
        border-bottom-right-radius: 0.5em;
        box-shadow: 0.25em 0.25em 0.75em -0.25em #0009;

        background: linear-gradient(120deg, #3e3935 30%, #c1ac9a 70%);
      }
    `}
`

const Carpet = forwardRef(({ dispatchInputAction, ...props }, ref) => {
  const isFolded = _.hasState("folded")(props)
  return (
    <CarpetInner
      isFolded={isFolded}
      onClick={() => dispatchInputAction(props.state, "fold", "valley")}
      ref={ref}
      {...props}
    />
  )
})
Carpet.name = "Carpet"
Carpet.templateName = "Carpet"
Carpet.defaultProps = {
  ...Entity.defaultProps,
  z: 1,
  width: 10,
  height: 14
}

export default Carpet
