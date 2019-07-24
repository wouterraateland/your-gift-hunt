import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState
} from "react"
import styled from "styled-components"
import _ from "ygh-utils"

import { HORIZONTAL, FIRST, SECOND } from "./constants"
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
  minSize = 0,
  maxSize = Infinity,
  initialSize,
  primary = FIRST,
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

  const [paneSize, setPaneSize] = useState(initialSize || "50%")

  const getAvailableSize = useCallback(() => {
    const container = ref.current
    const containerSize =
      split === HORIZONTAL ? container.offsetHeight : container.offsetWidth
    return containerSize - 1
  }, [])

  const resolveConstraints = useCallback(
    paneSize =>
      _.clamp(minSize, maxSize)(_.clamp(0, getAvailableSize())(paneSize)),
    [minSize, maxSize]
  )

  const onDividerChange = useCallback(
    firstSize => {
      const availableSize = getAvailableSize()

      const paneSize = resolveConstraints(
        primary === FIRST ? firstSize : availableSize - firstSize
      )

      setPaneSize(paneSize)
      onResize(paneSize)
    },
    [onResize, resolveConstraints, primary]
  )

  useLayoutEffect(() => {
    if (first && second && isNaN(paneSize) && ref.current) {
      setPaneSize(resolveConstraints(initialSize || getAvailableSize() / 2))
    }
  }, [first, second, paneSize, resolveConstraints])

  const checkResize = useCallback(() => {
    const availableSize = getAvailableSize()
    if (prevAvailableSize.current !== availableSize) {
      if (prevAvailableSize.current !== null) {
        setPaneSize(resolveConstraints)
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
      {first && (!isNaN(paneSize) || !second) && (
        <PaneComponent
          size={second && primary === FIRST ? paneSize : null}
          split={split}
          {...firstPaneProps}
        >
          {first}
        </PaneComponent>
      )}
      {first && second && !isNaN(paneSize) && (
        <DividerComponent
          containerRef={ref}
          split={split}
          onChangeStart={onResizeStart}
          onChange={onDividerChange}
          onChangeEnd={onResizeEnd}
          {...dividerProps}
        />
      )}
      {second && (!isNaN(paneSize) || !first) && (
        <PaneComponent
          size={first && primary === SECOND ? paneSize : null}
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
