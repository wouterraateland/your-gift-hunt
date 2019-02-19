import React from "react"

import { Message } from "your-gift-hunt/ui"

const StatusMessage = ({ status }) => {
  switch (status) {
    case "loading":
      return <Message.Default>Loading...</Message.Default>
    case "success":
      return <Message.Success>Update Successful!</Message.Success>
    case "error":
      return <Message.Error>Something went wrong.</Message.Error>
    default:
      return null
  }
}

export default StatusMessage
