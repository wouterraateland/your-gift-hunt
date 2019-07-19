import React from "react"

import * as Icons from "ygh-icons"

import useEntityFocus from "hooks/useEntityFocus"

import Action from "./Action"

const Blur = () => {
  const { blur } = useEntityFocus()

  return <Action title="Unselect" icon={Icons.Cross} onAct={blur} />
}

export default Blur
