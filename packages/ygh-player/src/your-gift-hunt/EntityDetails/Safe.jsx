import styled from "styled-components"
import { Entity } from "../Entities"

const Safe = styled(Entity)`
  position: relative;

  border-radius: 1em;

  box-shadow: inset 0.25em 0.25em 0.5em 0 #fff4,
    inset -0.25em -0.25em 0.5em 0 #0004 !important;

  background-image: linear-gradient(
    #263238,
    #263238 1em,
    transparent 1em,
    transparent 15em,
    #263238 15em,
    #263238
  );
  background-color: #37474f;
  color: #fff;
`
Safe.defaultProps = {
  ...Entity.defaultProps,
  width: 16,
  height: 16
}

export default Safe
