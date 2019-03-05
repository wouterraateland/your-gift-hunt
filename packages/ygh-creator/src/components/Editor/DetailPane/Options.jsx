import React, { useRef } from "react"
import styled from "styled-components"

import useClickOutside from "hooks/useClickOutside"

import { Paper } from "your-gift-hunt/ui"

const OptionsContainer = styled(Paper)`
  display: ${props => (props.isVisible ? "block" : "none")};

  position: absolute;
  left: 0;
  bottom: calc(100% + 1em);

  overflow-y: auto;

  min-width: 21em;
  height: 15em;

  line-height: 1.3;
  text-align: left;

  background: #fff;
`

const OptionContainer = styled.div`
  padding: 0.5em;
  &:hover {
    background-color: #0001;
  }
  &:not(:last-child) {
    border-bottom: 1px solid #0001;
  }

  & > * {
    pointer-events: none;
  }
`

const OptionsLocation = styled.div`
  position: relative;
`

const Option = ({ data }) => JSON.stringify(data)

const defaultComponents = {
  OptionsLocation,
  OptionsContainer,
  OptionContainer,
  Option
}

const customizableComponentNames = [
  "OptionsLocation",
  "OptionsContainer",
  "OptionContainer",
  "Option"
]

const Options = ({
  options,
  onOptionClick,
  onClose,
  isVisible,
  closeOnClick = false,
  components
}) => {
  const C = components
    ? customizableComponentNames.reduce(
        (acc, componentName) => ({
          ...acc,
          [componentName]:
            components[componentName] || defaultComponents[componentName]
        }),
        {}
      )
    : defaultComponents

  const ref = useRef(null)
  useClickOutside({ ref, onClickOutside: onClose })

  return (
    <C.OptionsLocation>
      <C.OptionsContainer ref={ref} isVisible={isVisible}>
        {options.map(option => (
          <C.OptionContainer
            key={option.id}
            onClick={() => {
              onOptionClick(option.id)
              if (closeOnClick) {
                onClose()
              }
            }}
          >
            <C.Option data={option} />
          </C.OptionContainer>
        ))}
      </C.OptionsContainer>
    </C.OptionsLocation>
  )
}

Options.components = defaultComponents

export default Options
