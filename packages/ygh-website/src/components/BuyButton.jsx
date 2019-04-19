import React from "react"
import useCheckout from "hooks/useCheckout"

import { Field, Button } from "your-gift-hunt/ui"

const BuyButton = ({ title, variantId, quantity = 1 }) => {
  const handleCheckout = useCheckout()

  return (
    <Field>
      <Button onClick={() => handleCheckout(variantId, quantity)}>
        Buy {title}
      </Button>
    </Field>
  )
}

export default BuyButton
