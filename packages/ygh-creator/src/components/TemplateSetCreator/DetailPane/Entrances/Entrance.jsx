import React, { useCallback } from "react"

import useTemplateSetMutations from "hooks/useTemplateSetMutations"
import useTemplates from "hooks/useTemplates"

import Form from "components/TemplateSetCreator/DetailPane/Form"

import PortalTag from "components/Primitives/PortalTag"

import { SelectOptions } from "ygh-ui"

const EntranceForm = ({ template, entrance }) => {
  const { templates } = useTemplates()
  const { updateEntityTemplate } = useTemplateSetMutations()

  const getInitialValues = useCallback(
    () => ({
      name: entrance.name,
      description: entrance.description,
      connectablePortals: entrance.connectablePortals.map(({ id }) => id)
    }),
    [entrance]
  )

  const onFlush = useCallback(
    values => {
      updateEntityTemplate(template.id, {
        entrances: {
          update: [
            {
              where: { id: entrance.id },
              data: {
                name: values.name,
                description: values.description,
                connectablePortals: {
                  set: values.connectablePortals.map(id => ({ id }))
                }
              }
            }
          ]
        }
      })
    },
    [entrance.id]
  )

  const options = templates
    .filter(({ id }) => id !== template.id)
    .flatMap(({ portals, ...rest }) =>
      portals.map(portal => ({
        label: <PortalTag entity={rest} portal={portal} showEntity />,
        value: portal.id
      }))
    )

  const onDelete = useCallback(() => {
    updateEntityTemplate(template.id, {
      entrances: {
        delete: { id: entrance.id }
      }
    })
  }, [entrance.id])

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
          name: "connectablePortals",
          type: "selectMultiple",
          label: "Connectable portals",
          component: SelectOptions,
          options
        }
      ]}
    />
  )
}

export default EntranceForm
