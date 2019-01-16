import React from 'react'
import styled from 'styled-components'

import PhysicalObject from './PhysicalObject'

const StyledCarpet = styled(PhysicalObject.Part)`
  width: 100%;
  height: 100%;
  border-radius: .5em;

  background-color: hsl(34, 53%, 82%);
  background-image:
    repeating-linear-gradient(45deg, transparent .25em, hsla(197, 62%, 11%, 0.5) .25em, hsla(197, 62%, 11%, 0.5) .5em,
      hsla(5, 53%, 63%, 0) .5em, hsla(5, 53%, 63%, 0) 1.75em, hsla(5, 53%, 63%, 0.5) 1.75em, hsla(5, 53%, 63%, 0.5) 2em,
      hsla(197, 62%, 11%, 0.5) 2em, hsla(197, 62%, 11%, 0.5) 2.5em, hsla(197, 62%, 11%, 0) 2.5em, hsla(197, 62%, 11%, 0) 3em,
      hsla(5, 53%, 63%, 0.5) 3em, hsla(5, 53%, 63%, 0.5) 3.5em, hsla(35, 91%, 65%, 0.5) 3.5em, hsla(35, 91%, 65%, 0.5) 4em,
      hsla(35, 91%, 65%, 0) 4em, hsla(35, 91%, 65%, 0) 4.5em, hsla(5, 53%, 63%, 0.5) 4.5em, hsla(5, 53%, 63%, 0.5) 5.5em,
      hsla(5, 53%, 63%, 0) 5.5em, hsla(5, 53%, 63%, 0) 6em, hsla(197, 62%, 11%, 0.5) 6em, hsla(197, 62%, 11%, 0.5) 7em
    ),
    repeating-linear-gradient(135deg, transparent .25em, hsla(197, 62%, 11%, 0.5) .25em, hsla(197, 62%, 11%, 0.5) .5em,
      hsla(5, 53%, 63%, 0) .5em, hsla(5, 53%, 63%, 0) 1.75em, hsla(5, 53%, 63%, 0.5) 1.75em, hsla(5, 53%, 63%, 0.5) 2em,
      hsla(197, 62%, 11%, 0.5) 2em, hsla(197, 62%, 11%, 0.5) 2.5em, hsla(197, 62%, 11%, 0) 2.5em, hsla(197, 62%, 11%, 0) 3em,
      hsla(5, 53%, 63%, 0.5) 3em, hsla(5, 53%, 63%, 0.5) 3.5em, hsla(35, 91%, 65%, 0.5) 3.5em, hsla(35, 91%, 65%, 0.5) 4em,
      hsla(35, 91%, 65%, 0) 4em, hsla(35, 91%, 65%, 0) 4.5em, hsla(5, 53%, 63%, 0.5) 4.5em, hsla(5, 53%, 63%, 0.5) 5.5em,
      hsla(5, 53%, 63%, 0) 5.5em, hsla(5, 53%, 63%, 0) 7em, hsla(197, 62%, 11%, 0.5) 7em, hsla(197, 62%, 11%, 0.5) 13em
    );
`
StyledCarpet.displayName = 'StyledCarpet'

const Carpet = (props) => (
  <PhysicalObject width={10} height={14} {...props}>
    <StyledCarpet z={.25} />
  </PhysicalObject>
)
Carpet.entityId = 'carpet'

export default Carpet
