import styled from 'styled-components'

const PhysicalObject = styled.div`
  position: relative;

  width: ${props => props.width};
  height: ${props => props.height};
`

const ObjectPart = styled.div`
  position: absolute;
`

PhysicalObject.Part = ObjectPart

export default PhysicalObject
