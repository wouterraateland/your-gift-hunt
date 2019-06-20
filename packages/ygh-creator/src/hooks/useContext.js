import React from "react"

const ReactInternals = React.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED

const useContext = (context, observedBits) => {
  const dispatcher = ReactInternals.ReactCurrentDispatcher.current
  return dispatcher.readContext(context, observedBits)
}

export default useContext
