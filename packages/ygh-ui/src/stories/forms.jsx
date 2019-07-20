import React, { useState } from "react"

import { storiesOf } from "@storybook/react"
import { boolean, optionsKnob as options } from "@storybook/addon-knobs"

import * as Icons from "ygh-icons"
import {
  Button,
  Paper,
  Form,
  FieldGroup,
  Field,
  DefaultInput,
  ColorInput,
  ImageInput,
  GeopointInput,
  TagInput,
  DefaultOptions,
  DisguisedSelectOptions,
  SelectOptions,
  TabOptions
} from "../"

storiesOf("Forms.Fields.Inputs", module)
  .add("Default input", () => (
    <Paper>
      <Paper.Section>
        <Field
          prefix={boolean("Prefix icon", false) ? <Icons.Loop /> : null}
          suffix={boolean("Suffix icon", false) ? <Icons.Play /> : null}
          label="Input label"
          info={
            boolean("Extra info", false)
              ? "Lorem ipsum dolor, sit amet consectetur adipisicing elit."
              : null
          }
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
          component={DefaultInput}
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
          error={
            boolean("Error", false) ? "Image doesn't meet requirements!" : null
          }
          component={ImageInput}
        />
      </Paper.Section>
    </Paper>
  ))
  .add("Color input", () => (
    <Paper>
      <Paper.Section>
        <Field
          label="Favorite color"
          type="color"
          disabled={boolean("Disabled", false)}
          error={boolean("Error", false) ? "Wrong color!" : null}
          component={ColorInput}
        />
      </Paper.Section>
    </Paper>
  ))
  .add("Geopoint input", () => (
    <Paper>
      <Paper.Section>
        <Field
          label="Your location"
          type="geopoint"
          disabled={boolean("Disabled", false)}
          error={boolean("Error", false) ? "Wrong color!" : null}
          component={GeopointInput}
        />
      </Paper.Section>
    </Paper>
  ))
  .add("Tag input", () => (
    <Paper>
      <Paper.Section>
        <Field
          label="Tags"
          type="text"
          disabled={boolean("Disabled", false)}
          error={boolean("Error", false) ? "Wrong color!" : null}
          component={TagInput}
        />
      </Paper.Section>
    </Paper>
  ))

const OptionsStory = ({ component }) => {
  const [value, setValue] = useState(null)

  const showInfo = boolean("Show info", false)
  const isMulti = boolean("Multi select", false)

  return (
    <Paper>
      <Paper.Section>
        <Field
          label="Privacy"
          information="Choose your privacy wisely"
          type="options"
          name="privacy"
          options={[
            {
              value: "PUBLIC",
              label: "Public",
              info: showInfo ? "Option with info" : null
            },
            {
              value: "UNDEFINED",
              label: "I don't know...",
              info: showInfo ? "No info " : null
            },
            {
              value: "PRIVATE",
              label: "Private",
              info: showInfo ? "Option with even more info" : null
            }
          ]}
          component={component}
          isMulti={isMulti}
          value={value}
          onChange={event => setValue(event.target.value)}
          disabled={boolean("Disabled", false)}
          error={boolean("Error", false) ? "Wrong option chosen!" : null}
        />
      </Paper.Section>
    </Paper>
  )
}
storiesOf("Forms.Fields.Options", module)
  .add("Default options", () => <OptionsStory component={DefaultOptions} />)
  .add("Tab options", () => <OptionsStory component={TabOptions} />)
  .add("Select options", () => <OptionsStory component={SelectOptions} />)
  .add("Disguised select options", () => (
    <OptionsStory
      component={props => (
        <DisguisedSelectOptions
          {...props}
          render={props => (
            <Button {...props} color="primary" importance="primary">
              + Add option
            </Button>
          )}
        />
      )}
    />
  ))
