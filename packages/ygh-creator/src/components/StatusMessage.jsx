import React from "react"

import { Message } from "your-gift-hunt/ui"

const StatusMessage = ({ isLoading, error, success }) =>
  isLoading ? (
    <Message.Default>Loading...</Message.Default>
  ) : error ? (
    <Message.Error>Something went wrong.</Message.Error>
  ) : success ? (
    <Message.Success>Update Successful!</Message.Success>
  ) : null

export default StatusMessage
