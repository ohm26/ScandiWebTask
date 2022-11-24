import React, { Component } from 'react'
import ProductData from '../Components/ProductData'
import { Query } from '@apollo/client/react/components'
import { store } from '../Redux/store';
import { connect } from 'react-redux'
import { gql } from "@apollo/client"
import "../Styles/productdetails.css"
class ProductDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      productID: store.getState().productID,
      currency: store.getState().currency,
      imageIndex: 0
    }
  }
  componentDidMount() {
    this.unsubscribe = store.subscribe(() => {
      this.setState({ productID: store.getState().productID, currency: store.getState().currency })
    })
  }

  componentWillUnmount() {
    this.unsubscribe()
  }

  changeImage = (index) => {
    this.setState({ imageIndex: index })
  }
  render() {
    const GET_DETAILS =
      gql`{
  product(id : ${JSON.stringify(this.state.productID)}){
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
`;

    return (
      <Query query={GET_DETAILS}>
        {({ data, loading, error }) => {
          if (error) return <h1> An Error Occured</h1>
          if (loading) return <h1> Loading........</h1>
          else {
            const currentCurrency = data.product.prices.find(currency => currency.currency.label === this.state.currency)
            return (
              <div className='container'>
                <div className='productdetails'>
                  <h1>{data.product.name}</h1>
                  <h2>Price:{currentCurrency.currency.symbol}{currentCurrency.amount}</h2>
                  
                  <ProductData data={data.product} />
                  
                  <h3>from<b>{data.product.brand}</b></h3>
                  <div dangerouslySetInnerHTML={{ __html: data.product.description }}></div>
                </div>
                <div className='productimages'>
                  <img src={data.product.gallery[this.state.imageIndex]} alt={data.product.name} height='400' />
                  <br />
                  {data.product.gallery.map((image, index) => {
                    return <img src={image} key={image} width="auto" height="100" onClick={() => this.changeImage(index)} alt="img" />
                  })}
                </div>
              </div>


            );
          }
        }
        }
      </Query>
    )
  }
}

export default connect(null)(ProductDetails) 