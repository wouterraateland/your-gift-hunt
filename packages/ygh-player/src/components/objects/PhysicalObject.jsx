import styled from 'styled-components'

const PhysicalObject = styled.div`
  position: relative;

  width: ${props => props.width};
  height: ${props => props.height};

  background: #0001;
`

const ObjectPart = styled.div`
  position: absolute;

  box-shadow: ${({ angle=0, z=1 }) =>
    `${Math.cos(-angle * Math.PI / 180) * z/3}em ${Math.cos(-angle * Math.PI / 180) * z/3}em ${z/2}em ${-z / 8}em #0009;`
  }

  &::before,
  &::after {
    content: '';

    position: absolute;
  }
`

PhysicalObject.Part = ObjectPart

export default PhysicalObject
