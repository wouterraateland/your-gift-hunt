import React, { useCallback, useEffect, useState } from "react"
import styled from "styled-components"

import useDebounce from "hooks/useDebounce"

import { Paper } from "your-gift-hunt/ui"

const SectionTitle = styled.h4`
  cursor: pointer;
  position: relative;

  margin-bottom: 0.5em;

  &::after {
    content: "›";

    position: absolute;
    right: 0;
    top: 50%;

    width: 2rem;
    height: 2rem;

    text-align: center;
    vertical-align: middle;
    line-height: 0.8;
    font-size: 2rem;
    font-family: ${props => props.theme.font.copy};

    color: ${props => props.theme.color.text};

    transform: translate(0, -50%)
      scale(1, ${props => (props.isExpanded ? 1 : -1)}) rotate(90deg);
  }
`

const Section = ({
  title,
  wrapChildren = false,
  noWrapper = false,
  children,
  ...otherProps
}) => {
  const [isExpanded, setExpanded] = useState(
    (JSON.parse(window.localStorage.getItem("sectionPreferences")) || {})[title]
  )
  const toggleExpanded = useCallback(
    () => setExpanded(isExpanded => !isExpanded),
    []
  )
  const debouncedIsExpanded = useDebounce(isExpanded)

  useEffect(
    () => {
      const prefs = JSON.parse(
        window.localStorage.getItem("sectionPreferences")
      )

      window.localStorage.setItem(
        "sectionPreferences",
        JSON.stringify({
          ...prefs,
          [title]: debouncedIsExpanded
        })
      )
    },
    [title, debouncedIsExpanded]
  )

  return (
    <>
      <SectionTitle onClick={toggleExpanded} isExpanded={isExpanded}>
        {title}
      </SectionTitle>
      <Paper expanding isExpanded={isExpanded} {...otherProps}>
        {wrapChildren ? (
          children.map((child, i) => (
            <Paper.Section key={i}>{child}</Paper.Section>
          ))
        ) : noWrapper ? (
          children
        ) : (
          <Paper.Section>{children}</Paper.Section>
        )}
      </Paper>
    </>
  )
}

export default Section
