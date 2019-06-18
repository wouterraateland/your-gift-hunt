import React from "react"
import styled from "styled-components"

import { Paper } from "your-gift-hunt/ui"

const views = ["graphic", "logic"]

const Outer = styled(Paper)`
  position: absolute;
  left: 1em;
  bottom: 1em;

  overflow: hidden;

  height: 5em;
  &:hover {
    height: 9.5em;
  }

  transition: height 0.2s ease-in-out;
`

const Inner = styled.div.attrs(({ selectedView }) => ({
  style: {
    marginTop: `${-views.indexOf(selectedView) * 4.5}em`
  }
}))`
  ${Outer}:hover & {
    margin-top: 0 !important;
  }

  transition: margin-top 0.2s ease-in-out;
`

const Container = props => (
  <Outer>
    <Inner {...props} />
  </Outer>
)

export default Container
