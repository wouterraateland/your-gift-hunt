import React, { useCallback } from "react"
import { ErrorBoundary } from "react-error-boundary"

const CustomErrorBoundary = props => {
  const handleOnError = useCallback((error, componentStack) => {
    console.log(error)
    console.log(componentStack)
  }, [])

  return <ErrorBoundary {...props} onError={handleOnError} />
}

export default CustomErrorBoundary
