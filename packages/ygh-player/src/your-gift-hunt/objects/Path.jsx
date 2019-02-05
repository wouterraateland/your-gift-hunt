import React from 'react'
import styled from 'styled-components'

import PhysicalObject from './PhysicalObject'

const stones = [
  { l: 0.7, t:  2.6, w: 2.5, h: 3.0, a:   5 },
  { l: 3.1, t:  7.0, w: 4.0, h: 3.0, a: 235 },
  { l: 1.0, t: 11.0, w: 2.5, h: 4.0, a:  38 },
  { l: 4.0, t:  2.0, w: 3.0, h: 2.0, a:  59 },
  { l: 0.0, t:  8.0, w: 3.0, h: 2.0, a:  20 },
  { l: 5.0, t: 12.0, w: 2.5, h: 3.5, a: 250 },
  { l: 3.0, t: 14.1, w: 1.5, h: 1.5, a:  80 },
  { l: 3.8, t: 11.2, w: 2.0, h: 1.5, a: 110 },
  { l: 3.6, t: 13.0, w: 1.0, h: 0.8, a: 294 },
  { l: 3.3, t: 13.7, w: 0.4, h: 0.3, a: 190 },
  { l: 1.5, t: 15.0, w: 1.5, h: 1.0, a: 350 },
  { l: 3.0, t:  9.6, w: 1.3, h: 1.8, a: 330 },
  { l: 0.3, t: 10.0, w: 1.5, h: 2.0, a:  80 },
  { l: 0.2, t: 12.0, w: 0.8, h: 0.7, a: 320 },
  { l: 6.0, t:  9.8, w: 1.5, h: 2.5, a:  30 },
  { l: 4.6, t: 10.5, w: 1.2, h: 0.4, a: 185 },
  { l: 2.1, t: 10.2, w: 0.7, h: 0.8, a: 170 },
  { l: 0.1, t:  9.7, w: 0.7, h: 0.5, a:  10 },
  { l: 1.7, t:  5.7, w: 1.5, h: 2.5, a: 355 },
  { l: 0.5, t:  5.5, w: 1.0, h: 1.6, a:  25 },
  { l: 0.8, t:  7.1, w: 0.8, h: 0.6, a: 330 },
  { l: 3.0, t:  8.2, w: 0.4, h: 1.3, a: 160 },
  { l: 5.6, t: 12.0, w: 0.4, h: 0.5, a: 150 },
  { l: 3.3, t:  4.2, w: 2.4, h: 2.0, a:  40 },
  { l: 3.1, t:  6.0, w: 1.0, h: 0.6, a:  48 },
  { l: 2.9, t:  5.3, w: 0.4, h: 0.5, a:   0 },
  { l: 3.3, t:  3.0, w: 1.2, h: 1.0, a: 150 },
  { l: 4.5, t: 15.2, w: 1.0, h: 0.8, a:  15 },
  { l: 6.1, t: 14.9, w: 0.8, h: 1.4, a:  80 },
  { l: 7.2, t: 14.8, w: 0.7, h: 0.8, a: 170 },
  { l: 3.7, t: 15.6, w: 0.5, h: 0.4, a: 160 },
  { l: 7.2, t: 11.8, w: 0.9, h: 0.7, a:  40 },
  { l: 5.4, t:  5.9, w: 1.0, h: 1.0, a:  60 },
  { l: 5.8, t:  4.5, w: 0.9, h: 1.3, a:  10 },
  { l: 6.2, t:  6.9, w: 0.7, h: 0.6, a:  30 },
  { l: 7.0, t:  8.8, w: 0.5, h: 0.9, a: 170 },
  { l: 7.3, t: 15.7, w: 0.7, h: 0.3, a: 165 },
  { l: 2.5, t:  1.3, w: 1.8, h: 1.5, a:  80 },
  { l: 4.2, t:  0.4, w: 1.0, h: 1.3, a:  60 },
  { l: 5.6, t:  0.2, w: 1.7, h: 1.6, a: 132 },
  { l: 6.5, t:  1.9, w: 0.7, h: 1.1, a: 170 },
  { l: 7.1, t:  1.4, w: 0.6, h: 0.7, a:  45 },
  { l: 7.4, t:  0.5, w: 0.5, h: 0.9, a:  10 },
  { l: 7.1, t:  0.0, w: 0.5, h: 0.5, a: 244 },
  { l: 1.2, t:  0.2, w: 1.4, h: 1.2, a: 187 },
  { l: 2.7, t:  0.1, w: 1.4, h: 0.9, a: 198 },
  { l: 4.1, t:  0.0, w: 0.7, h: 0.5, a: 166 },
  { l: 5.2, t: -0.1, w: 0.5, h: 0.7, a: 291 },
  { l: 0.1, t:  0.5, w: 0.9, h: 0.8, a:  51 },
  { l: 0.8, t:  0.1, w: 0.5, h: 0.5, a: 116 },
  { l: 0.0, t:  0.1, w: 0.6, h: 0.4, a: 337 },
  { l: 0.4, t:  1.4, w: 1.2, h: 1.3, a:  47 },
  { l: 0.2, t:  2.7, w: 0.6, h: 0.8, a:  12 },
  { l: 1.7, t:  1.7, w: 1.0, h: 0.7, a:  64 },
]

const Stone = styled(PhysicalObject.Part)
  .attrs(props => ({
    style: {
      left: `${props.l}em`,
      top: `${props.t}em`,

      width: `${props.w}em`,
      height: `${props.h}em`,
      transform: `rotate(${props.a}deg)`,
    }
  }))`
  border-radius: 80% 110% 90% 120% / 120% 110% 90% 80%;

  &::before {
    width: 100%;
    height: 100%;

    border-radius: 80% 90% 110% 120% / 120% 110% 90% 80%;

    box-shadow: inset
      ${props => Math.cos((270 - props.a - props.parentAngle) * Math.PI /180) * props.s}em
      ${props => Math.sin((270 - props.a - props.parentAngle) * Math.PI /180) * props.s}em
      ${props => props.s}em
      #0004;

    background: #777;
  }
`
Stone.displayName = 'Path.Stone'

const Path = ({ state, ...props }) => (
  <PhysicalObject width={8} height={16} {...props}>
    {stones.map((stone, i) => (
      <Stone
        key={i}
        {...stone}
        s={Math.min(stone.w, stone.h) / 3}
        angle={stone.a}
        z={.25}
      />
    ))}
  </PhysicalObject>
)
Path.entityName = 'Path'

export default Path
