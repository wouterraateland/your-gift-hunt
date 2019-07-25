import React, { useState, useEffect } from "react"
import styled, { css } from "styled-components"

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`
const Header = styled.div`
  position: relative;
  height: 2em;
  background: #f2f2f2;
  border-bottom: 1px solid #0002;
`

const Tabs = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;

  overflow-x: auto;
  white-space: nowrap;
`

const Tab = styled.div`
  cursor: pointer;

  display: inline-block;
  padding: 0.5rem;

  font-size: 1rem;
  line-height: 1rem;

  color: ${props => props.theme.color.text};

  &:hover {
    color: ${props => props.theme.color.emphasis};
  }

  ${props =>
    props.isSelected &&
    css`
      background-color: #f9f9f9;
      color: ${props.theme.color.emphasis};
    `}
`
const Main = styled.div`
  flex-grow: 1;
  position: relative;
`

const TabPane = ({ children, actions, placeholder, ...otherProps }) => {
  const labeledChildren = children.filter(child => child.props.label)
  const getInitialState = () =>
    labeledChildren.length ? labeledChildren[0].props.label : null
  const [_selectedTab, selectTab] = useState(getInitialState())

  useEffect(() => {
    if (
      labeledChildren.every(
        ({ props: { label } }) => !label || label !== _selectedTab
      )
    ) {
      selectTab(getInitialState())
    }
  }, [labeledChildren])

  const selectedTab = _selectedTab
    ? labeledChildren.find(({ props: { label } }) => label === _selectedTab)
    : null

  return (
    <Container {...otherProps}>
      <Header>
        <Tabs>
          {labeledChildren.map((tab, i) => (
            <Tab
              key={i}
              onClick={
                tab.props.label ? () => selectTab(tab.props.label) : undefined
              }
              isSelected={
                selectedTab && selectedTab.props.label === tab.props.label
              }
            >
              {tab.props.label}
            </Tab>
          ))}
        </Tabs>
      </Header>
      <Main>
        {selectedTab ? selectedTab.props.children : <em>{placeholder}</em>}
      </Main>
    </Container>
  )
}

TabPane.Tab = ({ children }) => children

export default TabPane
