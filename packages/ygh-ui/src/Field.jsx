import React, { forwardRef } from "react"
import styled from "styled-components"
import _ from "ygh-utils"

import DefaultInput from "./Input/DefaultInput"

const LabelText = styled.span`
  display: block;
  color: ${props => props.theme.color[props.hasError ? "error" : "caption"]};
  font-size: 0.75rem;
  padding-bottom: 0.25rem;
`
LabelText.displayName = "LabelText"

const Label = styled.label`
  display: inline-block;
  max-width: 100%;

  line-height: 1;
  vertical-align: top;

  ${_.blockStyles}

  &:focus-within {
    ${LabelText} {
      color: ${props => props.theme.color.primary};
    }
  }
`
Label.displayName = "Label"

const Message = styled.small`
  display: block;
  word-break: break-word;
`
Message.displayName = "Message"

const ErrorMessage = styled(Message)`
  color: ${props => props.theme.color.error};
`
ErrorMessage.displayName = "ErrorMessage"

const Field = forwardRef(
  (
    {
      label,
      info,
      component: Component = DefaultInput,
      className,
      ...otherProps
    },
    ref
  ) => (
    <Label
      ref={ref}
      disabled={otherProps.disabled}
      block={otherProps.block}
      className={className}
    >
      {label && <LabelText hasError={otherProps.error}>{label}</LabelText>}
      <Component {...otherProps} />
      {otherProps.error ? (
        <ErrorMessage>
          {typeof otherProps.error === "string"
            ? otherProps.error
            : JSON.stringify(otherProps.error)}
        </ErrorMessage>
      ) : (
        info && <Message>{info}</Message>
      )}
    </Label>
  )
)

export default Field
