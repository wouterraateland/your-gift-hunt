import { useRef, useEffect } from "react"
import Client from "shopify-buy"
import auth from "utils/auth"

const CheckoutUrl = url => ({
  appendParamIf: (key, value, _if) =>
    CheckoutUrl(_if && value ? `${url}&${key}=${value}` : url),
  value: () => url
})

const useCheckout = () => {
  const client = useRef(null)

  useEffect(() => {
    client.current = Client.buildClient({
      domain: `${process.env.SHOPIFY_STOREFRONT_SHOP_NAME}.myshopify.com`,
      storefrontAccessToken: process.env.SHOPIFY_STOREFRONT_API_KEY
    })
  }, [])

  return async function handleCheckout(variantId, quantity) {
    if (!client.current) {
      return
    }
    const checkout = await client.current.checkout.create()
    await client.current.checkout.addLineItems(checkout.id, {
      variantId,
      quantity
    })

    const user = auth.currentUser()

    const checkoutUrl = CheckoutUrl(checkout.webUrl)
      .appendParamIf("checkout[email]", user.email, user)
      .appendParamIf(
        "checkout[shipping_address][first_name]",
        user.user_metadata.first_name,
        user && user.user_metadata
      )
      .appendParamIf(
        "checkout[shipping_address][last_name]",
        user.user_metadata.last_name,
        user && user.user_metadata
      )

    window.location.assign(checkoutUrl.value())
  }
}

export default useCheckout
