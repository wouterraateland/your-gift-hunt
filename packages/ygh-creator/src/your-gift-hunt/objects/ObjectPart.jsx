import styled from "styled-components"

const ObjectPart = styled.div.attrs(({ parentAngle, angle, z }) => ({
  style: {
    boxShadow: `
      ${(Math.cos((-(-45 + parentAngle + angle) * Math.PI) / 180) * z) / 3}em
      ${(Math.sin((-(-45 + parentAngle + angle) * Math.PI) / 180) * z) / 3}em
      ${z / 2}em ${-z / 8}em
      #0009`
  }
}))`
  position: absolute;

  &::before,
  &::after {
    content: "";

    position: absolute;
  }
`

ObjectPart.defaultProps = {
  parentAngle: 0,
  angle: 0,
  z: 1
}

export default ObjectPart
