import React, { useCallback } from "react"

import useTemplateSetMutations from "hooks/useTemplateSetMutations"

import Form from "components/TemplateSetCreator/DetailPane/Form"

import PortalTag from "components/Primitives/PortalTag"
import InformationSlotTag from "components/Primitives/InformationSlotTag"

const StateForm = ({ template, state }) => {
  const { updateEntityTemplate } = useTemplateSetMutations()

  const getInitialValues = useCallback(
    () => ({
      name: state.name,
      description: state.description,
      openPortals: state.openPortals.map(({ id }) => id),
      availableInformationSlots: state.availableInformationSlots.map(
        ({ id }) => id
      )
    }),
    [state]
  )

  const onFlush = useCallback(
    values => {
      updateEntityTemplate(template.id, {
        states: {
          update: [
            {
              where: { id: state.id },
              data: {
                name: values.name,
                description: values.description,
                openPortals: {
                  set: values.openPortals.map(id => ({ id }))
                },
                availableInformationSlots: {
                  set: values.availableInformationSlots.map(id => ({ id }))
                }
              }
            }
          ]
        }
      })
    },
    [state.id]
  )

  const onDelete = useCallback(
    () => {
      updateEntityTemplate(template.id, {
        states: {
          delete: { id: state.id }
        }
      })
    },
    [state.id]
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
          name: "openPortals",
          type: "selectMultiple",
          label: "Open portals",
          options: template.portals.map(portal => ({
            label: <PortalTag entity={template} portal={portal} />,
            value: portal.id
          }))
        },
        {
          name: "availableInformationSlots",
          type: "selectMultiple",
          label: "Available information slots",
          options: template.informationSlots.map(slot => ({
            label: (
              <InformationSlotTag entity={template} informationSlot={slot} />
            ),
            value: slot.id
          }))
        }
      ]}
    />
  )
}

export default StateForm
