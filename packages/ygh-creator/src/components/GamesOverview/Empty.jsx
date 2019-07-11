import React from "react"
import styled from "styled-components"
import { Align } from "ygh-ui"

import Present from "components/Present"

const Outer = styled(Align.Center)`
  padding: 2em 0;
`

const Inner = styled.div`
  position: relative;

  width: 12em;
  height: 7em;
  margin: 4em auto 0;

  border-radius: 100%;

  background: #0001;

  & > * {
    position: absolute;

    transform: translate(-50%, 0);

    &:nth-child(1) {
      width: 6em;

      left: calc(50% + 0.5em);
      bottom: calc(50% - 0.5em);
    }

    &:nth-child(2) {
      width: 4em;

      left: calc(50% - 2.5em);
      bottom: calc(50% - 2em);
    }

    &:nth-child(3) {
      width: 3em;

      left: calc(50% + 3em);
      bottom: calc(50% - 1.5em);
    }
  }
`

const EmptyGamesOverview = () => (
  <Outer>
    <Inner>
      <Present boxColor="#f12" ribbonColor="#fff" />
      <Present boxColor="#ffcb11" ribbonColor="#3d9d29" />
      <Present boxColor="#fff" ribbonColor="#1484ec" />
    </Inner>
    <h2>No games here yet.</h2>
    <p>Click the "New game" button to get started.</p>
  </Outer>
)

export default EmptyGamesOverview
