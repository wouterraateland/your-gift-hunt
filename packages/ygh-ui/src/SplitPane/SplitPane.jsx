import React, { cloneElement, useLayoutEffect, useRef, useState } from "react"
import styled from "styled-components"
import _ from "ygh-utils"

import { HORIZONTAL } from "./constants"
import Resizer from "./Resizer"

const SplitPaneContainer = styled.div`
  position: relative;
  display: flex;
  width: 100%;
  height: 100%;
`

const HorizontalSplitPaneContainer = styled(SplitPaneContainer)`
  flex-direction: column;
`

const VerticalSplitPaneContainer = styled(SplitPaneContainer)`
  flex-direction: row;
`

const arrayReplace = (i, x) => xs => [...xs.slice(0, i), x, ...xs.slice(i + 1)]

const SplitPane = ({
  split,
  children,
  onResizeStart = _.noop,
  onResize = _.noop,
  onResizeEnd = _.noop,
  ...otherProps
}) => {
  const ref = useRef(null)
  const paneProps = children.map(child =>
    _.keep(["initialSize", "minSize", "maxSize"])(child.props)
  )
  const [paneSizes, setPaneSizes] = useState([])

  const getAvailableSize = () => {
    const container = ref.current
    const containerSize =
      split === HORIZONTAL ? container.offsetHeight : container.offsetWidth
    return containerSize - (paneProps.length - 1)
  }

  const handleResize = i => ({ dx, dy }) =>
    setPaneSizes(paneSizes => {
      const ds = split === HORIZONTAL ? dy : dx

      const ls = paneSizes[i - 1]
      const rs = paneSizes[i]
      let dds = ds

      if (ds < 0) {
        const ml = paneProps[i - 1].minSize || 0
        if (ls + dds < ml) {
          dds = _.clamp(dds, 0)(ml - ls)
        }
        const Mr = paneProps[i].maxSize || Infinity
        if (rs - dds > Mr) {
          dds = _.clamp(dds, 0)(rs - Mr)
        }
      }

      if (ds > 0) {
        const Ml = paneProps[i - 1].maxSize || Infinity
        if (ls + dds > Ml) {
          dds = _.clamp(0, dds)(Ml - ls)
        }
        const mr = paneProps[i].minSize || 0
        if (rs - dds < mr) {
          dds = _.clamp(0, dds)(rs - mr)
        }
      }

      return arrayReplace(i - 1, ls + dds)(arrayReplace(i, rs - dds)(paneSizes))
    })

  const createResizer = i => (
    <Resizer
      key={`Resizer-${i}`}
      split={split}
      onResizeStart={onResizeStart}
      onResize={handleResize(i)}
      onResizeEnd={onResizeEnd}
    />
  )
  const enhanceChild = (child, i) =>
    cloneElement(child, {
      key: `Pane-${i}`,
      size: paneSizes[i],
      constraintFailed:
        paneSizes[i] < child.props.minSize ||
        paneSizes[i] > child.props.maxSize,
      split
    })

  const panesWithResizers = children.reduce(
    (acc, child, i) =>
      acc.length
        ? [...acc, createResizer(i), enhanceChild(child, i)]
        : [enhanceChild(child, i)],
    []
  )

  const Container =
    split === HORIZONTAL
      ? HorizontalSplitPaneContainer
      : VerticalSplitPaneContainer

  useLayoutEffect(() => {
    const availableSize = getAvailableSize()

    const initialSizes = paneProps.map(({ initialSize }) => initialSize)
    const initialSizeSum = initialSizes.reduce(
      (acc, x) => (isNaN(x) ? acc : acc + x),
      0
    )
    const undefinedInitialSizes = initialSizes.reduce(
      (acc, x) => (isNaN(x) ? acc + 1 : acc),
      0
    )

    const actualInitialSizes =
      initialSizeSum < availableSize && undefinedInitialSizes
        ? initialSizes.map(size =>
            isNaN(size)
              ? (availableSize - initialSizeSum) / undefinedInitialSizes
              : size
          )
        : initialSizes.map(size =>
            isNaN(size) ? 0 : (size * availableSize) / initialSizeSum
          )

    setPaneSizes(actualInitialSizes)
  }, [])

  return (
    <Container ref={ref} {...otherProps}>
      {panesWithResizers}
    </Container>
  )
}

export default SplitPane
