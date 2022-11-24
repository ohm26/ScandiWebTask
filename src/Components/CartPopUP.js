import React, { Component } from 'react'
import { connect } from "react-redux";
import CartItem from "./CartItem";
import { Link } from "react-router-dom";
import "../Styles/cartpopup.css";
class CartPopUP extends Component {
  constructor(props) {
    super(props);
    this.state = {
      PopUp: false,
    }
  }
  render() {
    const totalprices = [];

    return (
      <div className='dropmenu'>
        <div className='cartpopup'>
          <h1> {this.props.cartItems.length} items</h1>
          <div className='products'>
            {this.props.cartItems.map((item) => {

              const currentCurrency = item.prices.find(
                (currency) => currency.currency.label === this.props.currency
              );

              totalprices.push(
                Math.ceil(item.quantity * currentCurrency.amount))
              return (
                <CartItem key={item.id} price={currentCurrency} data={item} />
              )
            })}
          </div>
          <h2 style={{color:"greenyellow"}}>TOTAL PRICE :{totalprices.reduce((prev, nxt) => prev + nxt, 0)}{" "} {this.props.currency}</h2>
          <div className='ShowCart'>
            <Link to="/cart"><button>show cart</button></Link>
            <button> checkout</button>
          </div>
        </div>
      </div>
    )
  }
}
const mapStateToProps = (state) => {
  return {
    cartItems: state.cart,
    currency: state.currency
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    changeproduct: (product) =>
      dispatch({
        type: "ProductID_Update",
        products: product
      }),
    clearCartItems: () => dispatch({ type: "Clear_Cart" })
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CartPopUP) 