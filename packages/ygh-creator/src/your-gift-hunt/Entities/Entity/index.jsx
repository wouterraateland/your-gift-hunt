import React, {
  forwardRef,
  Children,
  cloneElement,
  isValidElement
} from "react"
import Container from "./Container"
import Component from "./Component"

const Entity = forwardRef((props, ref) => {
  const { children, ...otherProps } = props
  const rotation = otherProps.parentRotation + otherProps.rotation
  const {
    width,
    height,
    top,
    left,
    bottom,
    right,
    isInteractive,
    ...componentProps
  } = otherProps

  const childrenWithParentRotation = Children.map(children, child =>
    isValidElement(child)
      ? cloneElement(child, { parentRotation: rotation })
      : child
  )

  return (
    <Container
      top={top}
      left={left}
      bottom={bottom}
      right={right}
      width={width}
      height={height}
      rotation={otherProps.rotation}
      origin={otherProps.origin}
      z={otherProps.z}
      isInteractive={isInteractive}
    >
      <Component ref={ref} rotation={rotation} {...componentProps}>
        {childrenWithParentRotation}
      </Component>
    </Container>
  )
})
Entity.defaultProps = {
  rotation: 0,
  parentRotation: 0,
  z: 0,
  origin: { left: "50%", top: "50%" },
  isReachable: true,
  containedEntities: [],
  dispatchInputAction: () => {},
  inspect: () => {}
}

export default Entity
