import styled from "styled-components"
import { lighten, darken } from "polished"
import _ from "ygh-utils"

import Entity from "../Entity"

const PhotoFrame = styled(Entity)`
  border: 1.5em solid;
  border-color: ${({ color }) =>
    `${darken(0.1)(color)} ${color} ${lighten(0.1)(color)}`};

  background: linear-gradient(
      -45deg,
      transparent,
      transparent,
      transparent,
      #fff6,
      transparent,
      transparent,
      #fff6,
      transparent,
      transparent
    ),
    #ddd url(${props => _.getFieldValue("Photo")(props)}) no-repeat center /
      cover;
  background-clip: padding-box;
`
PhotoFrame.name = "PhotoFrame"
PhotoFrame.templateName = "Photo Frame"
PhotoFrame.defaultProps = {
  ...Entity.defaultProps,
  width: 12,
  height: 16,
  color: "#242221"
}

export default PhotoFrame
