import React, { Component } from "react";
import { connect } from "react-redux";
import CartItem from "../Components/CartItem";
import "../Styles/cart.css"
class Cart extends Component {
  clearCart = () => {
    this.props.clearCartItems();
  };

  render() {
    const totalprices = [];

    return (
      <div className="cart">
        <button onClick={this.clearCart} className="cartbtn">
          Clear Cart
        </button>
        <div className="cartitems">
          {this.props.cartItems.map((item) => {
            const currentCurrency = item.prices.find(
              (currency) => currency.currency.label === this.props.currency
            )
            totalprices.push(
              Math.ceil(item.quantity * currentCurrency.amount)
            )
            return (
              <CartItem key={item.id} price={currentCurrency} data={item} />

            )
          })}
        </div>
        <div className="itemlength">
          <h3> Tax21%:<span style={{color:"greenyellow"}}>{this.props.currency}42.00</span> </h3>
          <h3> Quantity: <span style={{color:"greenyellow"}}>{this.props.cartItems.length}</span></h3>
          <h3>Total Price:<span style={{color:"greenyellow"}}> {totalprices.reduce((prev, nxt) => prev + nxt, 0)}{" "}
            {this.props.currency}</span></h3>
        </div>
      </div>
    )
  }
}
const mapStateToProps = (state) => {
  return {
    cartItems: state.cart,
    currency: state.currency,
  };
};

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

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
