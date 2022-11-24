import React, { Component, Fragment } from 'react'
import Product from '../Components/Product'
import { store } from "../Redux/store"
import { graphql } from '@apollo/client/react/hoc';
import { gql } from "@apollo/client"
import "../Styles/Home.css"
class Home extends Component {

  constructor(props) {
    super(props)
    this.state = {
      category: store.getState().category,
      currency: store.getState().currency
    }
  }

  componentDidMount() {
    this.unsubscribe = store.subscribe(() => {
      this.setState({ category: store.getState().category, currency: store.getState().currency })
    })
  }

  componentWillUnmount() {
    this.unsubscribe()
  }
  showitems() {
    if (!this.props.data.loading) {
      const categories = this.props.data.categories;
      const { products } = categories.find(category => category.name === this.state.category)
      return (
        products.map(product => {
          const currentCurrency=  product.prices.find(currency => currency.currency.label === this.state.currency)
          return <Product data={product} price={currentCurrency} key={product.id} />
        })
      )
    } else return <h1> Loading..................</h1>
  }


  render() {
    return (
      <div className='container'>
        {this.props.data.categories && (
          <Fragment>
            <div className='productlist'>{this.showitems()}</div>
          </Fragment>
        )}
      </div>
    );
  }
}
const GET_DETAILS= gql`{
  categories {
    name
    products {
      id
      name
      inStock
      gallery
      description
      category
      attributes {
        id
        name
        type
        items {
          displayValue
          value
          id
        }
      }
      prices {
        currency {
          label
          symbol
        }
        amount
      }
      brand
    }
  }
}
`
export default graphql(GET_DETAILS)(Home)