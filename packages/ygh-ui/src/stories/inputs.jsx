import React from "react"

import { storiesOf } from "@storybook/react"
import {
  withKnobs,
  boolean,
  number,
  optionsKnob as options,
  text
} from "@storybook/addon-knobs"

import withTheme from "./decorators/withTheme"
import withToolTipRoot from "./decorators/withToolTipRoot"

import * as Icons from "ygh-icons"
import {
  Paper,
  Form,
  FieldGroup,
  Field,
  MultiInput,
  ImageInput,
  Select,
  HorizontalSelect,
  GeopointInput
} from "../"

storiesOf("Inputs", module)
  .addDecorator(withTheme)
  .addDecorator(withToolTipRoot)
  .addDecorator(withKnobs)
  .add("Single basic input", () => (
    <Paper>
      <Paper.Section>
        <Field
          prefix={boolean("Prefix icon", false) ? <Icons.Loop /> : null}
          suffix={boolean("Suffix icon", false) ? <Icons.Play /> : null}
          label="First Name"
          type={options(
            "Type",
            {
              Date: "date",
              DateTime: "datetime-local",
              Month: "month",
              Week: "week",
              Time: "time",

              Text: "text",
              Number: "number",
              Textarea: "textarea",
              Password: "password",
              Search: "search",

              Email: "email",
              Telephone: "tel",
              URL: "url",

              Color: "color",
              File: "file"
            },
            "text",
            { display: "inline-radio" }
          )}
          placeholder="Jan"
          disabled={boolean("Disabled", false)}
          resizeH={boolean("Resize horizontal", false)}
          error={boolean("Error", false) ? "Something went wrong!" : null}
        />
      </Paper.Section>
    </Paper>
  ))
  .add("Image input", () => (
    <Paper>
      <Paper.Section>
        <Field
          label="Avatar"
          type="file"
          disabled={boolean("Disabled", false)}
          error={boolean("Error", false) ? "Something went wrong!" : null}
          component={ImageInput}
        />
      </Paper.Section>
    </Paper>
  ))
