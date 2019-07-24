import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState
} from "react"
import styled from "styled-components"
import _ from "ygh-utils"

import { HORIZONTAL } from "./constants"
import Pane from "./Pane"
import Divider from "./Divider"

const Container = styled.div`
  position: relative;

  display: flex;
  flex-direction: ${props => (props.split === HORIZONTAL ? "column" : "row")};
  width: 100%;
  height: 100%;
`

const SplitPane = ({
  split,
  children,
  minSizeFirst = 0,
  maxSizeFirst = Infinity,
  initialSizeFirst,
  minSizeSecond = 0,
  maxSizeSecond = Infinity,
  initialSizeSecond,
  onResizeStart = _.noop,
  onResize = _.noop,
  onResizeEnd = _.noop,
  firstPaneProps,
  secondPaneProps,
  dividerProps,
  ContainerComponent = Container,
  PaneComponent = Pane,
  DividerComponent = Divider,
  ...otherProps
}) => {
  if (children.length !== 2) {
    throw Error("SplitPane should have 2 children")
  }

  const first = children[0]
  const second = children[1]

  const ref = useRef(null)
  const prevAvailableSize = useRef(null)

  const [paneSizes, setPaneSizes] = useState([null, null])
  const sizeSet = paneSizes[0] !== null && paneSizes[1] !== null

  const getAvailableSize = useCallback(() => {
    const container = ref.current
    const containerSize =
      split === HORIZONTAL ? container.offsetHeight : container.offsetWidth
    return containerSize - 1
  }, [])

  const resolveConstraints = useCallback(
    ([firstSize, secondSize]) => {
      if (firstSize < minSizeFirst) {
        return [minSizeFirst, secondSize - (minSizeFirst - firstSize)]
      }
      if (secondSize < minSizeSecond) {
        return [firstSize - (minSizeSecond - secondSize), minSizeSecond]
      }
      if (firstSize > maxSizeFirst) {
        return [maxSizeFirst, secondSize + (firstSize - maxSizeFirst)]
      }
      if (secondSize > maxSizeSecond) {
        return [firstSize + (secondSize - maxSizeSecond), maxSizeSecond]
      }
      return [Math.round(firstSize), Math.round(secondSize)]
    },
    [minSizeFirst, maxSizeFirst, minSizeSecond, maxSizeSecond]
  )

  const onDividerChange = useCallback(
    firstSize => {
      const availableSize = getAvailableSize()

      const paneSizes = resolveConstraints([
        firstSize,
        availableSize - firstSize
      ])

      setPaneSizes(paneSizes)
      onResize(paneSizes)
    },
    [onResize, resolveConstraints]
  )

  useLayoutEffect(() => {
    if (first && second && !sizeSet) {
      const availableSize = getAvailableSize()

      setPaneSizes(
        resolveConstraints(
          initialSizeFirst && initialSizeSecond
            ? [initialSizeFirst && initialSizeSecond]
            : initialSizeFirst
            ? [initialSizeFirst, availableSize - initialSizeFirst]
            : initialSizeSecond
            ? [availableSize - initialSizeSecond, initialSizeSecond]
            : [availableSize / 2, availableSize / 2]
        )
      )
    }
  }, [first, second, sizeSet, resolveConstraints])

  const checkResize = useCallback(() => {
    const availableSize = getAvailableSize()
    if (prevAvailableSize.current !== availableSize) {
      if (prevAvailableSize.current !== null) {
        const scale = availableSize / prevAvailableSize.current
        setPaneSizes(paneSizes =>
          resolveConstraints([paneSizes[0] * scale, paneSizes[1] * scale])
        )
      }
      prevAvailableSize.current = availableSize
    }
  }, [resolveConstraints])

  useEffect(() => {
    const i = setInterval(checkResize, 500)
    return () => {
      clearInterval(i)
    }
  }, [checkResize])

  return (
    <ContainerComponent ref={ref} split={split} {...otherProps}>
      {first && (sizeSet || !second) && (
        <PaneComponent
          size={second ? paneSizes[0] : "100%"}
          split={split}
          {...firstPaneProps}
        >
          {first}
        </PaneComponent>
      )}
      {first && second && sizeSet && (
        <DividerComponent
          containerRef={ref}
          split={split}
          onChangeStart={onResizeStart}
          onChange={onDividerChange}
          onChangeEnd={onResizeEnd}
          {...dividerProps}
        />
      )}
      {second && (sizeSet || !first) && (
        <PaneComponent
          size={first ? paneSizes[1] : "100%"}
          split={split}
          {...secondPaneProps}
        >
          {second}
        </PaneComponent>
      )}
    </ContainerComponent>
  )
}

export default SplitPane
