import React, { Children, cloneElement } from "react"
import styled from "styled-components"

const StyledAccordionSection = styled.div``
const Title = styled.strong`
  text-transform: uppercase;
`

const AccordionSection = ({ title, toggleCollapsed, collapsed, children }) => (
  <StyledAccordionSection>
    <Title collapsed={collapsed} onClick={toggleCollapsed}>
      {title}
    </Title>
    {!collapsed && children}
  </StyledAccordionSection>
)

const Accordion = ({ state, setState, children }) =>
  Children.map(children, child =>
    cloneElement(
      child,
      child.props.collapsible
        ? {
            collapsed: !state || state[child.props.title],
            toggleCollapsed: () =>
              setState(state => ({
                ...state,
                [child.props.title]: !(state || {})[child.props.title]
              }))
          }
        : { collapsed: false }
    )
  )
Accordion.Section = AccordionSection

export default Accordion
