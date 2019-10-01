import React, { useCallback, useState } from "react"

import useTemplates from "hooks/useTemplates"
import useTemplateSetMutations from "hooks/useTemplateSetMutations"

import Form from "components/TemplateSetCreator/DetailPane/Form"

import EntityTag from "components/Primitives/EntityTag"
import StateTag from "components/Primitives/StateTag"
import FieldTag from "components/Primitives/FieldTag"
import { TabOptions, SelectOptions } from "ygh-ui"

const COMPARATORS = {
  lt: { comparator: "LESS_THEN", not: false },
  le: { comparator: "GREATER_THEN", not: true },
  eq: { comparator: "EQUAL_TO", not: false },
  ne: { comparator: "EQUAL_TO", not: true },
  ge: { comparator: "LESS_THEN", not: true },
  gt: { comparator: "GREATER_THEN", not: false },
  in: { comparator: "ELEMENT_OF", not: false },
  ni: { comparator: "ELEMENT_OF", not: true }
}

const inferType = x => {
  const y = Array.isArray(x) ? x[0] : x

  if (y === undefined) {
    return "STRING"
  } else if (!isNaN(y)) {
    return "NUMBER"
  } else if (y === false || y === true) {
    return "BOOLEAN"
  } else if (typeof y === "object") {
    return "GEOPOINT"
  } else {
    return "STRING"
  }
}

const toTypeSingle = baseType => value => {
  switch (baseType) {
    case "NUMBER":
      return parseInt(value, 10)
    case "BOOLEAN":
      return value.toLowerCase() === "true"
    default:
      return value
  }
}

const toType = (baseType, isMulti) => value =>
  isMulti ? value.map(toTypeSingle(baseType)) : toTypeSingle(baseType)(value)

const createRequiredInputValue = json => {
  const value = JSON.parse(json)
  const isMulti = Array.isArray(value)

  return {
    requiredInputValueSingle: isMulti ? null : value,
    requiredInputValueMulti: isMulti ? value : [],
    requiredInputValueType: inferType(value),
    requiredInputValueIsMulti: isMulti
  }
}

const ActionRequirementForm = ({ template, transition, actionRequirement }) => {
  const { templates } = useTemplates()
  const { updateEntityTemplate } = useTemplateSetMutations()

  const getInitialValues = useCallback(
    () => ({
      type: actionRequirement.type,
      ...(actionRequirement.payload.requiredEntity
        ? {
            requiredEntity: templates.find(({ states }) =>
              states.some(
                ({ id }) =>
                  id === actionRequirement.payload.requiredEntity.entityState.id
              )
            ).id,
            requiredState:
              actionRequirement.payload.requiredEntity.entityState.id
          }
        : {
            requiredEntity: null,
            requiredState: null
          }),
      ...(actionRequirement.payload.requiredInput
        ? {
            requiredInputKey: actionRequirement.payload.requiredInput.key,
            requiredInputComparator: Object.entries(COMPARATORS).find(
              ([_, { comparator, not }]) =>
                comparator ===
                  actionRequirement.payload.requiredInput.comparator &&
                not === actionRequirement.payload.requiredInput.not
            )[0],
            ...(actionRequirement.payload.requiredInput.value
              ? createRequiredInputValue(
                  actionRequirement.payload.requiredInput.value
                )
              : {
                  requiredInputValueSingle: null,
                  requiredInputValueMulti: [],
                  requiredInputValueType: "STRING",
                  requiredInputValueIsMulti: false
                }),
            requiredInputField: actionRequirement.payload.requiredInput.field
              ? actionRequirement.payload.requiredInput.field.id
              : null,
            compareTo: actionRequirement.payload.requiredInput.field
              ? "FIELD"
              : "VALUE"
          }
        : {
            requiredInputKey: "",
            requiredInputComparator: "eq",
            requiredInputValueSingle: null,
            requiredInputValueMulti: [],
            requiredInputValueType: "STRING",
            requiredInputValueIsMulti: false,
            requiredInputField: null,
            compareTo: "VALUE"
          })
    }),
    [actionRequirement]
  )

  const [currentValues, setCurrentValues] = useState(getInitialValues())

  const onChange = useCallback(values => {
    setCurrentValues(values)
  }, [])

  const onFlush = useCallback(
    values => {
      updateEntityTemplate(template.id, {
        states: {
          update: [
            {
              where: { id: transition.from.id },
              data: {
                outgoingTransitions: {
                  update: [
                    {
                      where: { id: transition.id },
                      data: {
                        requiredActions: {
                          update: [
                            {
                              where: { id: actionRequirement.id },
                              data: {
                                type: values.type,
                                payload: {
                                  update: {
                                    ...(values.requiredEntity ||
                                    values.requiredState
                                      ? {
                                          requiredEntity: {
                                            upsert: {
                                              create: {
                                                entityState: {
                                                  connect: {
                                                    id: values.requiredState
                                                      ? values.requiredState
                                                      : templates.find(
                                                          ({ id }) =>
                                                            id ===
                                                            values.requiredEntity
                                                        ).states[0].id
                                                  }
                                                }
                                              },
                                              update: {
                                                entityState: {
                                                  connect: {
                                                    id: values.requiredState
                                                      ? values.requiredState
                                                      : templates.find(
                                                          ({ id }) =>
                                                            id ===
                                                            values.requiredEntity
                                                        ).states[0].id
                                                  }
                                                }
                                              }
                                            }
                                          }
                                        }
                                      : {}),
                                    requiredInput: {
                                      upsert: {
                                        create: {
                                          key: values.requiredInputKey,
                                          not:
                                            COMPARATORS[
                                              values.requiredInputComparator
                                            ].not,
                                          comparator:
                                            COMPARATORS[
                                              values.requiredInputComparator
                                            ].comparator,
                                          value:
                                            values.compareTo === "VALUE"
                                              ? JSON.stringify(
                                                  toType(
                                                    values.requiredInputValueType,
                                                    values.requiredInputValueIsMulti
                                                  )(
                                                    values.requiredInputValueIsMulti
                                                      ? values.requiredInputValueMulti
                                                      : values.requiredInputValueSingle
                                                  )
                                                )
                                              : null,
                                          field:
                                            values.compareTo === "FIELD" &&
                                            values.requiredInputField
                                              ? {
                                                  connect: {
                                                    id:
                                                      values.requiredInputField
                                                  }
                                                }
                                              : null
                                        },
                                        update: {
                                          key: values.requiredInputKey,
                                          not:
                                            COMPARATORS[
                                              values.requiredInputComparator
                                            ].not,
                                          comparator:
                                            COMPARATORS[
                                              values.requiredInputComparator
                                            ].comparator,
                                          value:
                                            values.compareTo === "VALUE"
                                              ? JSON.stringify(
                                                  toType(
                                                    values.requiredInputValueType,
                                                    values.requiredInputValueIsMulti
                                                  )(
                                                    values.requiredInputValueIsMulti
                                                      ? values.requiredInputValueMulti
                                                      : values.requiredInputValueSingle
                                                  )
                                                )
                                              : null,
                                          field:
                                            values.compareTo === "FIELD" &&
                                            values.requiredInputField
                                              ? {
                                                  connect: {
                                                    id:
                                                      values.requiredInputField
                                                  }
                                                }
                                              : actionRequirement.payload
                                                  .requiredInput &&
                                                actionRequirement.payload
                                                  .requiredInput.field
                                              ? { disconnect: true }
                                              : null
                                        }
                                      }
                                    }
                                  }
                                }
                              }
                            }
                          ]
                        }
                      }
                    }
                  ]
                }
              }
            }
          ]
        }
      })
    },
    [actionRequirement.id]
  )

  const onDelete = useCallback(() => {
    updateEntityTemplate(template.id, {
      states: {
        update: [
          {
            where: { id: transition.from.id },
            data: {
              outgoingTransitions: {
                update: [
                  {
                    where: { id: transition.id },
                    data: {
                      requiredActions: {
                        delete: { id: actionRequirement.id }
                      }
                    }
                  }
                ]
              }
            }
          }
        ]
      }
    })
  }, [actionRequirement.id])

  return (
    <Form
      getInitialValues={getInitialValues}
      onChange={onChange}
      onFlush={onFlush}
      onDelete={onDelete}
      fields={[
        {
          name: "type",
          type: "select",
          format: "horizontal",
          label: "Type",
          component: TabOptions,
          options: [
            {
              label: "Input",
              value: "INPUT"
            },
            {
              label: "Use",
              value: "USE"
            },
            {
              label: "Target of use",
              value: "TARGET_OF_USE"
            }
          ]
        },
        {
          name: "requiredEntity",
          type: "select",
          label: "Required Entity",
          component: SelectOptions,
          isHidden: currentValues.type === "INPUT",
          options: templates
            .filter(({ id }) => id !== template.id)
            .map(template => ({
              label: <EntityTag entity={template} />,
              value: template.id
            }))
        },
        {
          name: "requiredState",
          type: "select",
          label: "Required state",
          isHidden: currentValues.type === "INPUT",
          component: SelectOptions,
          options: (
            templates.find(({ id }) => id === currentValues.requiredEntity) || {
              states: []
            }
          ).states.map(state => ({
            label: <StateTag state={state} />,
            value: state.id
          }))
        },
        {
          name: "requiredInputKey",
          type: "text",
          label: "Input key",
          isHidden: currentValues.type !== "INPUT"
        },
        {
          name: "requiredInputComparator",
          type: "select",
          format: "horizontal",
          label: "Comparator",
          isHidden: currentValues.type !== "INPUT",
          component: TabOptions,
          options: [
            { label: "<", value: "lt" },
            { label: "≤", value: "le" },
            { label: "=", value: "eq" },
            { label: "≠", value: "ne" },
            { label: "≥", value: "ge" },
            { label: ">", value: "gt" },
            { label: "∈", value: "in" },
            { label: "∉", value: "ni" }
          ]
        },
        {
          name: "compareTo",
          type: "select",
          format: "horizontal",
          label: "Compare to",
          isHidden: currentValues.type !== "INPUT",
          component: TabOptions,
          options: [
            { label: "Literal value", value: "VALUE" },
            { label: "Field value", value: "FIELD" }
          ]
        },
        [
          {
            name: "requiredInputValueType",
            type: "select",
            format: "horizontal",
            label: "Value type",
            component: TabOptions,
            isHidden:
              currentValues.type !== "INPUT" ||
              currentValues.compareTo !== "VALUE",
            options: [
              { label: "String", value: "STRING" },
              { label: "Number", value: "NUMBER" },
              { label: "Boolean", value: "BOOLEAN", disabled: true },
              { label: "Timestamp", value: "TIMESTAMP", disabled: true },
              { label: "Geopoint", value: "GEOPOINT", disabled: true }
            ]
          },
          {
            name: "requiredInputValueIsMulti",
            type: "checkbox",
            block: true,
            label: "Multiple values",
            isHidden:
              currentValues.type !== "INPUT" ||
              currentValues.compareTo !== "VALUE"
          }
        ],
        {
          name: "requiredInputValueSingle",
          type: "text",
          label: "Value",
          isHidden:
            currentValues.type !== "INPUT" ||
            currentValues.compareTo !== "VALUE" ||
            currentValues.requiredInputValueIsMulti
        },
        {
          name: "requiredInputValueMulti",
          type: "text",
          label: "Values",
          isMulti: true,
          isHidden:
            currentValues.type !== "INPUT" ||
            currentValues.compareTo !== "VALUE" ||
            !currentValues.requiredInputValueIsMulti
        },
        {
          name: "requiredInputField",
          type: "select",
          label: "FieldGroup",
          isHidden:
            currentValues.type !== "INPUT" ||
            currentValues.compareTo !== "FIELD",
          component: SelectOptions,
          options: template.fields.map(field => ({
            label: <FieldTag entity={template} field={field} />,
            value: field.id
          }))
        }
      ]}
    />
  )
}

export default ActionRequirementForm
