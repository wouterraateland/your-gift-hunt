import React from "react"

import * as Icon from "your-gift-hunt/icons"

import Container from "./Container"
import Entry from "./Entry"

const Toolbox = () => (
  <Container>
    <Entry icon={Icon.Challenge} label="Add challenge" />
    <Entry icon={Icon.Object} label="Add object" />
    <Entry icon={Icon.Item} label="Add item" />
    <Entry icon={Icon.Trigger} label="add trigger" />
  </Container>
)

export default Toolbox
