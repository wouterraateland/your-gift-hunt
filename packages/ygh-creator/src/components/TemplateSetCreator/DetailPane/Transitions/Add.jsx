import React, { useCallback } from "react"
import styled from "styled-components"

import useAsync from "hooks/useAsync"
import useTemplateSetMutations from "hooks/useTemplateSetMutations"

import { Button, Message } from "your-gift-hunt/ui"

const StyledButton = styled(Button)`
  margin: -0.5em;
`

const Add = ({ template }) => {
  const [{ error, isLoading }, runAsync] = useAsync()
  const { updateEntityTemplate } = useTemplateSetMutations()

  const onClick = useCallback(
    runAsync(() => {
      updateEntityTemplate(template.id, {
        states: {
          update: [
            {
              where: { id: template.states[0].id },
              data: {
                outgoingTransitions: {
                  create: [{}]
                }
              }
            }
          ]
        }
      })
    }),
    [template.id, template.states[0].id]
  )

  return (
    <>
      <StyledButton
        size="small"
        color="primary"
        importance="primary"
        disabled={isLoading}
        onClick={onClick}
      >
        {isLoading ? "Loading..." : "+ Add transition"}
      </StyledButton>
      {error && <Message.Error>{JSON.stringify(error.message)}</Message.Error>}
    </>
  )
}

export default Add