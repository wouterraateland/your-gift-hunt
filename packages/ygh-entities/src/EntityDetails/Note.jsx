import React, { forwardRef, useEffect, useMemo } from "react"
import styled, { css } from "styled-components"
import _ from "ygh-utils"
import Entity from "../Entity"

export const NoteContainer = styled(Entity)`
  position: relative;
  padding: 2em;

  background-color: #f5f0d7;

  ${"" /* transform: translate(0, ${props => (props.isVisible ? 0 : 100)}vh); */}

  transition: transform 0.2s 0.2s ease-out;

  ${props =>
    props.isNew &&
    css`
      &::after {
        content: "New";

        position: absolute;
        left: 2em;
        top: 1.5em;

        text-transform: uppercase;
        font-weight: bold;

        color: #f129;
      }
    `}

  p {
    font-size: 1.5em;
    line-height: 1.58;
    word-wrap: break-word;
  }
`

const Note = forwardRef(({ dispatchInputAction, ...props }, ref) => {
  const isNew = useMemo(() => _.hasState("unread")(props), [props.id])
  const text = _.getFieldValue("Text")(props)

  useEffect(() => {
    if (isNew) {
      dispatchInputAction(props.state)
    }
  }, [props.state])

  return (
    <NoteContainer ref={ref} isNew={isNew} {...props}>
      <p>{text}</p>
    </NoteContainer>
  )
})
Note.name = "Note"
Note.templateName = "Note"
Note.defaultProps = {
  ...Entity.defaultProps,
  width: 30,
  height: 40
}

export default Note
