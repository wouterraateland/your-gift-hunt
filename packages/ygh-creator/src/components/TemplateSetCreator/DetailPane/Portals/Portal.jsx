import React, { useCallback } from "react"

import useTemplateSetMutations from "hooks/useTemplateSetMutations"
import useTemplates from "hooks/useTemplates"

import Form from "components/TemplateSetCreator/DetailPane/Form"

import EntranceTag from "components/Primitives/EntranceTag"
import StateTag from "components/Primitives/StateTag"

const PortalForm = ({ template, portal }) => {
  const { templates } = useTemplates()
  const { updateEntityTemplate } = useTemplateSetMutations()

  const getInitialValues = useCallback(
    () => ({
      name: portal.name,
      description: portal.description,
      connectableEntrances: portal.connectableEntrances.map(({ id }) => id),
      states: portal.states.map(({ id }) => id)
    }),
    [portal]
  )

  const onFlush = useCallback(
    values => {
      updateEntityTemplate(template.id, {
        portals: {
          update: [
            {
              where: { id: portal.id },
              data: {
                name: values.name,
                description: values.description,
                connectableEntrances: {
                  set: values.connectableEntrances.map(id => ({ id }))
                },
                states: {
                  set: values.states.map(id => ({ id }))
                }
              }
            }
          ]
        }
      })
    },
    [portal.id]
  )

  const onDelete = useCallback(
    () => {
      updateEntityTemplate(template.id, {
        portals: {
          delete: { id: portal.id }
        }
      })
    },
    [portal.id]
  )

  return (
    <Form
      getInitialValues={getInitialValues}
      onFlush={onFlush}
      onDelete={onDelete}
      fields={[
        {
          name: "name",
          type: "text",
          label: "Name"
        },
        {
          name: "description",
          label: "Description",
          type: "textarea"
        },
        {
          name: "connectableEntrances",
          type: "selectMultiple",
          label: "Connectable entrances",
          options: templates
            .filter(({ id }) => id !== template.id)
            .flatMap(({ entrances, ...rest }) =>
              entrances.map(entrance => ({
                label: (
                  <EntranceTag entity={rest} entrance={entrance} showEntity />
                ),
                value: entrance.id
              }))
            )
        },
        {
          name: "states",
          type: "selectMultiple",
          label: "Open in states",
          options: template.states.map(state => ({
            label: <StateTag state={state} />,
            value: state.id
          }))
        }
      ]}
    />
  )
}

export default PortalForm
