import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import "../Styles/product.css"
import { connect } from 'react-redux'
import { store } from '../Redux/store'
import ProductData from './ProductData'


class Product extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currency: store.getState().currency,
    }
  }

  componentDidMount() {
    this.unsubscribe = store.subscribe(()=>{
      this.setState({
        currency: store.getState().currency,
      })
    })
  }

  componentWillUnmount() {
    this.unsubscribe()
  }
  render() {
    
    const currentCurrency = this.props.data.prices.find(currency => currency.currency.label === this.state.currency);

    return (
      <div className='container1'>
        <Link to={`/product/${this.props.data.id}`}>
          <img src={this.props.data.gallery[0]} alt={this.props.data.name} height="300"
            width="300" className="productImg" onClick={() => this.props.changeProductID(this.props.data.id)} />
        </Link>
        <div className='Data'>
          <h4>{this.props.data.name}</h4>
          <h2>{currentCurrency.currency.symbol}{currentCurrency.amount}</h2>
          <hr />
          <ProductData data={this.props.data} />
        </div>


      </div>

    )
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    changeProductID: (productID) => dispatch({ type: "ProductID_Update", productID: productID }),
  }
}

export default connect(null, mapDispatchToProps)(Product)