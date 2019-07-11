import React, { useRef } from "react"
import styled, { css } from "styled-components"

import { useClickOutside } from "ygh-hooks"

import Paper from "./Paper"

const OptionsLocation = styled.div`
  position: relative;

  ${props =>
    props.isVisible &&
    css`
      &::after {
        content: "";

        position: absolute;
        left: 2em;
        bottom: -0.65em;
        z-index: 1;

        width: 1em;
        height: 1em;

        border-bottom-right-radius: 0.25em;
        border: 0.1em solid ${props => props.theme.color.primary};
        border-top-color: transparent;
        border-left-color: transparent;

        transform: translate(-50%, -50%) rotate(45deg);

        background: linear-gradient(-45deg, #fff 50%, transparent 50%) no-repeat
          center / 1em 1em;
      }
    `}
`

const OptionsContainer = styled(Paper.Container)`
  display: ${props => (props.isVisible ? "block" : "none")};

  position: absolute;
  left: 0;
  bottom: calc(100% + 0.25em);

  overflow-y: auto;

  min-width: 21em;
  max-height: 15em;
  padding: 0.25em 0;
  border: 0.1em solid ${props => props.theme.color.primary};

  line-height: 1.3;
  text-align: left;

  background: #fff;
`

const OptionContainer = styled.div`
  cursor: pointer;

  padding: 0.5em;

  &:nth-child(2n) {
    background-color: #00000009;
  }
  &:hover {
    background-color: #0001;
  }

  & > * {
    pointer-events: none;
  }
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
    <C.OptionsLocation isVisible={isVisible}>
      <C.OptionsContainer ref={ref} isVisible={isVisible}>
        {options.length ? (
          options.map(option => (
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
          ))
        ) : (
          <C.OptionContainer>No options available</C.OptionContainer>
        )}
      </C.OptionsContainer>
    </C.OptionsLocation>
  )
}

Options.components = defaultComponents

export default Options
