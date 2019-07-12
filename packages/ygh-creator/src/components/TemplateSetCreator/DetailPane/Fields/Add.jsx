import React, { useCallback, useMemo } from "react"
import styled from "styled-components"

import { useAsync } from "ygh-hooks"
import useTemplateOptions from "hooks/useTemplateOptions"
import useTemplateSetMutations from "hooks/useTemplateSetMutations"

import { Button, Message } from "ygh-ui"

const StyledButton = styled(Button)`
  margin: -0.5em;
`

const Add = ({ template }) => {
  const [{ error, isLoading }, runAsync] = useAsync()
  const { fieldTypes } = useTemplateOptions()
  const { updateEntityTemplate } = useTemplateSetMutations()

  const defaultFieldType = useMemo(
    () => fieldTypes.find(({ type, isMulti }) => type === "STRING" && !isMulti),
    [fieldTypes]
  )

  const onClick = useCallback(
    runAsync(() => {
      updateEntityTemplate(template.id, {
        fields: {
          create: [
            {
              type: { connect: { id: defaultFieldType.id } }
            }
          ]
        }
      })
    }),
    [defaultFieldType, template.id]
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
        {isLoading ? "Loading..." : "+ Add field"}
      </StyledButton>
      {error && <Message.Error>{JSON.stringify(error.message)}</Message.Error>}
    </>
  )
}

export default Add
