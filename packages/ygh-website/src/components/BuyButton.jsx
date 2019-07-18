import React from "react"
import useCheckout from "hooks/useCheckout"

import { FieldGroup, Button } from "ygh-ui"

const BuyButton = ({ title, variantId, quantity = 1 }) => {
  const handleCheckout = useCheckout()

  return (
    <FieldGroup>
      <Button onClick={() => handleCheckout(variantId, quantity)}>
        Buy {title}
      </Button>
    </FieldGroup>
  )
}

export default BuyButton
