import React, { useEffect, useRef } from "react"
import styled, { css } from "styled-components"

export const PaperTitle = styled.h2`
  margin: 0 0 1em;
  line-height: 1;
`

export const PaperSection = styled.div`
  padding: 1em;

  & + & {
    border-top: 1px solid #0002;
  }

  &::after {
    content: "";
    display: block;
    clear: both;
  }
`

export const PaperContainer = styled.div`
  position: relative;
  margin: 0;

  & + & {
    margin-top: 1em;
  }

  border-radius: ${props => props.theme.borderRadius};

  ${props =>
    props.isFlat
      ? css`
          border: 1px solid #0002;
        `
      : css`
          box-shadow: ${props.theme.boxShadow.medium};
        `}

  background: #fff;

  ${props =>
    props.fullWidthOnMobile &&
    css`
      @media (max-width: 25em) {
        margin-left: -2em;
        margin-right: -2em;
        border-radius: 0;
      }
    `}
`

export const PaperHeader = styled.div`
  display: flex;
  justify-content: space-between;

  border-bottom: 1px solid #0002;
`

export const PaperTabs = styled.div`
  overflow-x: auto;
  overflow-y: hidden;

  white-space: nowrap;
`

export const PaperActions = styled.div`
  flex-shrink: 0;
`

export const PaperTab = styled.strong`
  cursor: pointer;

  display: inline-block;
  padding: 1em;

  background-clip: padding-box;

  &:not(:first-of-type) {
    border-left: 1px solid #0002;
  }

  ${props =>
    props.isSelected
      ? css`
          background-color: #0002;
        `
      : css`
          &:hover {
            background-color: #0001;
          }
        `}
`

export const ExpandingPaperContainer = styled(PaperContainer)`
  ${PaperSection} {
    transition: opacity 0.2s ease-out;
  }

  ${props =>
    !props.isExpanded &&
    css`
      overflow: hidden;

      ${PaperSection} {
        opacity: 0;
      }
    `}
`

const ExpandingPaper = ({ isExpanded, ...otherProps }) => {
  const ref = useRef(null)

  useEffect(() => {
    if (!ref.current) {
      return
    }

    const el = ref.current
    const start = Date.now()
    const duration = 200

    el.style.height = "0"
    const offset = el.offsetHeight
    const maxHeight = Math.max(offset, el.scrollHeight)

    const update = () => {
      const p = (Date.now() - start) / duration

      if (p < 1) {
        el.style.height = `${maxHeight * (isExpanded ? p : 1 - p)}px`
        requestAnimationFrame(update)
      } else {
        el.style.height = isExpanded ? "" : "0"
      }
    }

    update()
  }, [isExpanded])

  return (
    <ExpandingPaperContainer
      ref={ref}
      isExpanded={isExpanded}
      {...otherProps}
    />
  )
}

const Paper = ({ expanding, ...otherProps }) =>
  expanding ? (
    <ExpandingPaper {...otherProps} />
  ) : (
    <PaperContainer {...otherProps} />
  )

Paper.Container = PaperContainer
Paper.Section = PaperSection
Paper.Title = ({ size, ...otherProps }) => (
  <PaperTitle as={`h${size}`} {...otherProps} />
)
Paper.Header = PaperHeader
Paper.Tabs = PaperTabs
Paper.Actions = PaperActions
Paper.Tab = PaperTab

export default Paper
