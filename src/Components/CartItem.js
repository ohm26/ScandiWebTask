import React, { Component } from 'react'
import { connect } from "react-redux";
import { store } from "../Redux/store";
import "../Styles/cartitem.css"
import deleteIcon from "../images/delete (1).png";

class CartItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      quantity: this.props.data.quantity
    }
  }
  componentDidMount() {
    this.unsub = store.subscribe(() => {
      const itemId = this.props.data.id;
      const item = store.getState().cart.find((item) => {
        return item.id === itemId;
      })
      this.setState({
        quantity: item.quantity ? item.quantity : 0,
      })
    })
  }
  componentWillUnmount() {
    this.unsub();
  }
  increase = () => {
    this.props.increasequantity(this.props.data.id)
  }
  decrease = () => {
    this.props.decreasequantity(this.props.data.id)
  }
  delItem = () => {
    this.props.delItem(this.props.data.id)
  }





  render() {
    return (
      <div className='container'>
        <div className='productDetails'>
          <div>
            <h3>{this.props.data.brand}</h3>
            <h3>{this.props.data.name}</h3>
            {this.props.price.currency && (
              <h4>
                {this.props.price.amount}
                {this.props.price.currency.symbol}
              </h4>
            )}
            <hr />
          </div>
          {Object.entries(this.props.data.attributes).map((attribute) => {
            return (
              <span key={attribute}>{attribute[0]}:<b>{attribute[1]}</b> |{" "}</span>
            )
          })}
          <h4>TOTAL PRICE:{" "}
            {Math.floor(this.props.data.quantity * this.props.price.amount)}
            {this.props.price.currency.symbol}</h4>
        </div>
        <div className='product'>
          <div className='productquantity'>
            <button onClick={this.increase}>+</button>
            <b>{this.state.quantity}</b>
            <button onClick={this.decrease}>-</button>
          </div>
          <img className='imageremove' src={this.props.data.image} alt="img" />
          <button onClick={this.delItem} className='delbtn'>
            <img className='imagedel' src={deleteIcon} alt="del" />
          </button>
        </div>
      </div>
    )
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    increasequantity: (id) => dispatch({ type: "Quantity_Incra", id }),
    decreasequantity: (id) => dispatch({ type: "Quantity_Decra", id }),
    delItem: (id) => dispatch({ type: "Remove_Cart_Item", id })
  }
}
export default connect(null, mapDispatchToProps)(CartItem)
