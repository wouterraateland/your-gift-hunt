import styled from 'styled-components'

import Item from './Item'

const Battery = styled(Item)`
  width: 1em;
  height: 2em;
  border-radius: .1em;

  background-image:
    radial-gradient(ellipse 10% 40% at 30% 50%, #fffc, #fff0),
    linear-gradient(90deg, #000a, #0004, #0000 40%, #0004, #000a),
    linear-gradient(#ba6626 30%, #ccc 30%, #ccc 35%, #444 35%);

  transform: rotate(45deg);

  &::before {
    left: 50%; bottom: 100%;

    width: .5em;
    height: .25em;
    border-radius: .1em .1em 0 0;

    background-color: #999;
    background-image:
      radial-gradient(ellipse 10% 40% at 30% 50%, #fff9, #fff0),
      linear-gradient(90deg, #0005, #0002, #0000 40%, #0002, #0005);

    transform: translate(-50%, 0);
  }
`
Battery.displayName = 'Battery'
Battery.entityName = 'Battery'

export default Battery
