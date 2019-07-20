import React from "react"

import { storiesOf } from "@storybook/react"
import { boolean, optionsKnob as options, text } from "@storybook/addon-knobs"

import { ActionButton, Button, Paper } from "../"
import * as Icons from "ygh-icons"

storiesOf("Buttons", module)
  .add("Action Button", () => (
    <ActionButton
      color={options(
        "Color",
        {
          Primary: "primary",
          Secondary: "secondary",
          Success: "success",
          Warning: "warning",
          Error: "error",
          Default: "default"
        },
        "default",
        { display: "inline-radio" }
      )}
    >
      <Icons.Pen />
    </ActionButton>
  ))
  .add("Buttons", () => {
    const lead = boolean("lead icon", false) ? <Icons.Bin size={0.85} /> : null
    const trail = boolean("trail icon", false) ? <Icons.Cross /> : null
    const disabled = boolean("Disabled", false)

    const size = options(
      "Size",
      {
        Tiny: "tiny",
        Small: "small",
        Medium: "medium",
        Large: "large"
      },
      "medium",
      { display: "inline-radio" }
    )

    const importance = options(
      "Importance",
      {
        Primary: "primary",
        Secondary: "secondary",
        Tertiary: "tertiary"
      },
      "secondary",
      { display: "inline-radio" }
    )
    const label = text("Label", "Click me!")

    return (
      <Paper>
        <Paper.Section>
          <Button
            disabled={disabled}
            lead={lead}
            trail={trail}
            size={size}
            importance={importance}
            color="primary"
          >
            {label}
          </Button>
        </Paper.Section>
        <Paper.Section>
          <Button
            disabled={disabled}
            lead={lead}
            trail={trail}
            size={size}
            importance={importance}
            color="secondary"
          >
            {label}
          </Button>
        </Paper.Section>
        <Paper.Section>
          <Button
            disabled={disabled}
            lead={lead}
            trail={trail}
            size={size}
            importance={importance}
            color="success"
          >
            {label}
          </Button>
        </Paper.Section>
        <Paper.Section>
          <Button
            disabled={disabled}
            lead={lead}
            trail={trail}
            size={size}
            importance={importance}
            color="warning"
          >
            {label}
          </Button>
        </Paper.Section>
        <Paper.Section>
          <Button
            disabled={disabled}
            lead={lead}
            trail={trail}
            size={size}
            importance={importance}
            color="error"
          >
            {label}
          </Button>
        </Paper.Section>
        <Paper.Section>
          <Button
            disabled={disabled}
            lead={lead}
            trail={trail}
            size={size}
            importance={importance}
            color="default"
          >
            {label}
          </Button>
        </Paper.Section>
      </Paper>
    )
  })
