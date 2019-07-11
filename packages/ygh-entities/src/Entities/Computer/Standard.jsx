import styled from "styled-components"
import Entity from "../../Entity"

const Standard = styled(Entity)`
  border-radius: 40% 40% 20% 20% / 80% 80% 20% 20%;

  background: linear-gradient(#ccc, #eee);

  &::before,
  &::after {
    left: 0;
    top: 0;
    right: 0;
  }

  &::before {
    bottom: 0;

    border-radius: 40% 40% 20% 20% / 80% 80% 20% 20%;

    box-shadow: inset 0 0 0.4em #0004;
  }

  &::after {
    width: 0.5em;
    height: 0.5em;
    margin: auto;
    border-radius: 10% 10% 30% 30% / 10% 10% 80% 80%;

    background: linear-gradient(#ccc, #eee);
  }
`
Standard.defaultProps = {
  ...Entity.defaultProps,
  width: 1.5,
  height: 1.5,
  z: 1
}

export default Standard
