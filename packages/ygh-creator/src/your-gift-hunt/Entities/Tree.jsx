import React, { forwardRef, useMemo } from "react"
import styled from "styled-components"

import Entity from "./Entity"
import TreeStump from "./TreeStump"

const random = (min, max, d = x => x) => min + (max - min) * d(Math.random())

const createLeafs = branches =>
  branches
    .flatMap(({ rotation, scale }) =>
      Array(Math.floor(6.5 * scale))
        .fill()
        .map((_, i) => ({
          r: i + 2 + random(-0.2, 0.2),
          s: 0.5 - i / (12 * scale), //random(0, 0.5),
          c: `hsla(${random(50, 68)}, ${random(55, 65)}%, ${random(
            50,
            64
          )}%, 0.9)`,
          a:
            ((rotation + 20 * ((i % 2) * 2 - 1) * (1 - (i + 1) / (6 * scale))) *
              Math.PI) /
            180
        }))
    )
    .sort((a, b) => a.r - b.r)
    .map(
      ({ r, a, s, c }) =>
        `${6 + r * Math.cos(a)}em ${6 + r * Math.sin(a)}em 0 ${s}em ${c}`
    )
    .join(",")

const branchCount = 7
const createBranches = () =>
  Array(branchCount)
    .fill()
    .map((_, i) => ({
      rotation: random(0, 180 / branchCount) + (i * 360) / branchCount,
      scale: random(0.7, 1)
    }))

const Leafs = styled(Entity)`
  &,
  &::before {
    border-radius: 100%;
  }

  &::before {
    top: 0;
    left: 0;
    width: 1em;
    height: 1em;

    box-shadow: ${props => props.boxShadow};

    transform: translate(-50%, -50%);
  }
`
Leafs.defaultProps = {
  ...Entity.defaultProps,
  noVisual: true,
  z: 4,
  width: 12,
  height: 12
}

const Branches = styled(Entity)`
  filter: url(#fancy-goo);
`
Branches.defaultProps = {
  noVisual: true,
  width: 12,
  height: 12,
  z: 3
}

const Branch = styled(Entity)`
  border-radius: 0 100% 100% 0;
  box-shadow: inset 0 0 0.5em 0.5em #382718 !important;
  background: linear-gradient(90deg, #382718, #9a6a3b);
`
Branch.defaultProps = {
  ...Entity.defaultProps,
  origin: {
    left: 0,
    top: "50%"
  }
}

const Tree = forwardRef(({ dispatchInputAction, ...props }, ref) => {
  const branches = useMemo(createBranches, [])
  const leafs = useMemo(() => createLeafs(branches), [])
  return (
    <Entity
      noVisual
      {...props}
      onClick={() => dispatchInputAction(props.state)}
      ref={ref}
    >
      <TreeStump isCovered />
      <Branches>
        {branches.map(({ scale, rotation }, i) => (
          <Branch
            key={i}
            width={7.5 * scale}
            height={1.5 * scale}
            rotation={rotation}
          />
        ))}
      </Branches>
      <Leafs boxShadow={leafs} />
    </Entity>
  )
})
Tree.name = "Tree"
Tree.templateName = "Tree"
Tree.defaultProps = {
  ...Entity.defaultProps,
  z: 4,
  width: 4,
  height: 4
}

export default Tree
