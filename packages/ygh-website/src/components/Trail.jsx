import styled from 'styled-components'
import { Wrapper } from 'components/ui'

import trail from 'images/trail.svg'

const Trail = styled(Wrapper)`
  position: relative;
  z-index: -2;

  padding-top: 50%;
  margin-top: -15%;
  margin-bottom: -15%;

  opacity: .5;

  background: url(${trail}) no-repeat center / 100%;


  transform: scale(${props => props.ltr ? -1 : 1}, 1);
`

export default Trail
