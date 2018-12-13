import React, { useContext } from 'react'
import { Link, StaticQuery, graphql } from 'gatsby'

import UserContext from 'contexts/User'

import { Wrapper, Button } from 'components/ui'
import Layout from 'components/creator/Layout'
import BuyButton from 'components/landing/BuyButton'

const productsQuery = graphql`
  query ProductsQuery {
    allShopifyProduct {
      edges {
        node {
          title
          variants {
            price
            shopifyId
          }
        }
      }
    }
  }
`

const Products = () => {
  return (
    <StaticQuery
      query={productsQuery}
      render={data => {
        const products = data.allShopifyProduct.edges
          .map(edge => edge.node)
          .map(({ title, variants }) => ({
            title,
            price: variants[0].price,
            variantId: variants[0].shopifyId,
            quantity: 1,
          }))

        return products.map(product => (
          <BuyButton key={product.variantId} {...product} />
        ))
      }}
    />
  )
}

const CreatorPage = () => {
  const user = useContext(UserContext)

  return (
    <Layout>
      <Wrapper medium>
        <br />
        <h1>Hi {(user && user.user_metadata)
          ? user.user_metadata.first_name || user.user_metadata.full_name
          : 'Anonymous'}, thanks for signin up! We are currently working hard to get the creator started. Check back soon to make your personalized hunt.</h1>
        <Button
          to="/"
          as={Link}
          importance="primary"
          color="accent"
        >Back to landing page</Button>
        <br />
        <br />
        <br />
        <br />
        <Products />
      </Wrapper>
    </Layout>
  )
}

export default CreatorPage
