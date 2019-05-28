import React, { useCallback } from "react"
import styled from "styled-components"

import useTemplateSetMutations from "hooks/useTemplateSetMutations"

import Form from "components/TemplateSetCreator/DetailPane/Form"

import StateTag from "components/Primitives/StateTag"
import ExitState from "components/Primitives/ExitState"

import ActionRequirements from "./ActionRequirements"

const StyledExitState = styled(ExitState)`
  width: 1em;
  height: 1em;
`

const TransitionForm = ({ template, transition }) => {
  const {
    updateEntityTemplate,
    updateStateTransitionTemplate
  } = useTemplateSetMutations()

  const getInitialValues = useCallback(
    () => ({
      from: transition.from.id,
      to: transition.to ? transition.to.id : null
    }),
    [transition]
  )

  const onFlush = useCallback(
    async values => {
      await updateStateTransitionTemplate(transition.id, {
        from: { connect: { id: values.from } },
        to: values.to
          ? { connect: { id: values.to } }
          : transition.to
          ? { disconnect: true }
          : null
      })
      await updateEntityTemplate(template.id, {})
    },
    [transition.id]
  )

  const onDelete = useCallback(
    () => {
      updateEntityTemplate(template.id, {
        states: {
          update: [
            {
              where: { id: transition.from.id },
              data: {
                outgoingTransitions: {
                  delete: { id: transition.id }
                }
              }
            }
          ]
        }
      })
    },
    [transition.id, transition.from.id]
  )

  return (
    <>
      <Form
        getInitialValues={getInitialValues}
        onFlush={onFlush}
        onDelete={onDelete}
        fields={[
          {
            name: "from",
            type: "select",
            label: "Source state",
            options: template.states
              .filter(({ id }) => !transition.to || id !== transition.to.id)
              .map(state => ({
                label: <StateTag entity={template} state={state} />,
                value: state.id
              }))
          },
          {
            name: "to",
            type: "select",
            label: "Destination state",
            isClearable: true,
            options: template.states
              .filter(({ id }) => id !== transition.from.id)
              .map(state => ({
                label: <StateTag entity={template} state={state} />,
                value: state.id
              })),
            placeholder: <StyledExitState />
          }
        ]}
      />
      <ActionRequirements template={template} transition={transition} />
    </>
  )
}

export default TransitionForm
