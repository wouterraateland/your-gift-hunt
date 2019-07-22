import React, { Children, cloneElement } from "react"
import styled, { css } from "styled-components"
import Icons from "ygh-icons"

const StyledAccordionSection = styled.div`
  border-bottom: 1px solid #0002;
`
const Title = styled.strong`
  position: relative;

  display: block;
  padding: 0.5em;

  text-transform: uppercase;
`

const StyledCaret = styled(Icons.Caret)`
  position: absolute;
  right: 0.5em;
  top: 0.5em;
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
          <StyledCaret direction={collapsed ? "right" : "down"} />
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
