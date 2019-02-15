import React, { useRef, useState } from "react"
import Modal from "containers/Modal"

import useClickOutside from "hooks/useClickOutside"

import { Paper, Field, Input } from "your-gift-hunt/ui"

const SettingsModal = ({ game }) => {
  const ref = useRef(null)
  useClickOutside({ ref, onClickOutside: () => window.history.back() })

  const [fields, setFields] = useState(game)

  const updateField = key => event => {
    const value = event.target.value
    setFields(fields => ({
      ...fields,
      [key]: value
    }))
  }

  return (
    <Modal>
      <Paper ref={ref}>
        <Paper.Section>
          <h1>Game settings</h1>
        </Paper.Section>
        <Paper.Section>
          <form>
            <Field block>
              <Input block value={fields.name} onChange={updateField("name")} />
            </Field>
          </form>
        </Paper.Section>
      </Paper>
    </Modal>
  )
}

export default SettingsModal
