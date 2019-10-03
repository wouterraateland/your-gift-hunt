import React, { forwardRef } from "react"
import styled from "styled-components"
import Entity from "../Entity"
import _ from "ygh-utils"

const Container = styled(Entity)`
  padding: 0.25em;
  border-radius: ${props => props.theme.borderRadius};
  box-shadow: inset 0 0 0 0.1em ${props => props.theme.color.primary};

  background-color: #fff;
  color: ${props => props.theme.color.text};
`

const Name = styled.span`
  font-size: smaller;

  ${_.unselectableStyles}
`

const DefaultEntity = forwardRef(
  ({ children, name, state, inspect, ...otherProps }, ref) =>
    otherProps.isGame ? null : (
      <Container
        {...otherProps}
        ref={ref}
        onClick={
          otherProps.isReachable
            ? event => {
                event.stopPropagation()
                inspect()
              }
            : undefined
        }
        noVisual
      >
        <Name>
          {name}
          {state.name ? ` <${state.name}>` : null}
        </Name>
        {children}
      </Container>
    )
)
DefaultEntity.defaultProps = {
  ...Entity.defaultProps,
  width: 4,
  height: 4
}

export default DefaultEntity
