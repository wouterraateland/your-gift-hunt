import React, { useCallback } from "react"
import styled from "styled-components"

import useAsync from "hooks/useAsync"
import useTemplateSetMutations from "hooks/useTemplateSetMutations"

import { Button, Message } from "your-gift-hunt/ui"

const StyledButton = styled(Button)`
  margin: -0.5em;
`

const Add = ({ template, transition }) => {
  const [{ error, isLoading }, runAsync] = useAsync()
  const { updateEntityTemplate } = useTemplateSetMutations()

  const onClick = useCallback(
    runAsync(() => {
      updateEntityTemplate(template.id, {
        states: {
          update: [
            {
              where: { id: transition.from.id },
              data: {
                outgoingTransitions: {
                  update: {
                    where: { id: transition.id },
                    data: {
                      requiredActions: {
                        create: [{ payload: { create: {} } }]
                      }
                    }
                  }
                }
              }
            }
          ]
        }
      })
    }),
    [template.id, transition.from.id, transition.id]
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
        {isLoading ? "Loading..." : "+ Add action requirement"}
      </StyledButton>
      {error && <Message.Error>{JSON.stringify(error.message)}</Message.Error>}
    </>
  )
}

export default Add
