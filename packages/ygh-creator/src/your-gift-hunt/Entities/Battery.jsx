import styled from "styled-components"
import Entity from "./Entity"

const Battery = styled(Entity)`
  border-radius: 0.1em;

  background-image: radial-gradient(ellipse 10% 40% at 30% 50%, #fffc, #fff0),
    linear-gradient(90deg, #000a, #0004, #0000 40%, #0004, #000a),
    linear-gradient(#ba6626 30%, #ccc 30%, #ccc 35%, #444 35%);

  &::before {
    left: 50%;
    bottom: 100%;

    width: 0.5em;
    height: 0.25em;
    border-radius: 0.1em 0.1em 0 0;

    background-color: #999;
    background-image: radial-gradient(ellipse 10% 40% at 30% 50%, #fff9, #fff0),
      linear-gradient(90deg, #0005, #0002, #0000 40%, #0002, #0005);

    transform: translate(-50%, 0);
  }
`
Battery.name = "Battery"
Battery.templateName = "Battery"
Battery.defaultProps = {
  ...Entity.defaultProps,
  width: 1,
  height: 1.5,
  rotation: 45,
  z: 0.5
}

export default Battery
