import React, { Children, cloneElement } from "react"
import styled from "styled-components"
import Icons from "ygh-icons"

import ActionButton from "./ActionButton"

const StyledAccordionSection = styled.div`
  border-bottom: 1px solid #0002;
`
const Title = styled.strong`
  position: relative;

  display: block;
  padding: 0.5rem;
`

const StyledActionButton = styled(ActionButton)`
  position: absolute;
  right: 0.25rem;
  top: 0.25rem;
`

const AccordionSection = ({
  title,
  toggleCollapsed,
  collapsed,
  collapsible = true,
  children,
  ...otherProps
}) => (
  <StyledAccordionSection collapsed={collapsed} {...otherProps}>
    {title && (
      <Title onClick={toggleCollapsed}>
        {title}
        {collapsible && (
          <StyledActionButton>
            <Icons.Caret direction={collapsed ? "right" : "down"} />
          </StyledActionButton>
        )}
      </Title>
    )}
    {!collapsed && children}
  </StyledAccordionSection>
)

const Accordion = ({ state, setState, children }) =>
  Children.map(children, child =>
    cloneElement(
      child,
      child.props.collapsible !== false
        ? {
            collapsed: !state || state[child.props.title] !== false,
            toggleCollapsed: () =>
              setState(state => ({
                ...state,
                [child.props.title]:
                  state && state[child.props.title] !== undefined
                    ? !state[child.props.title]
                    : false
              }))
          }
        : { collapsed: false, toggleCollapsed: () => {} }
    )
  )
Accordion.Section = AccordionSection

export default Accordion
