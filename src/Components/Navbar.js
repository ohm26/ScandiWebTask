import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { store } from '../Redux/store';
import CartPopUp from "./CartPopUP";
import "../Styles/Navbar.css";
import logo from "../images/logo.png";
import cart from "../images/cart.png";
class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currency: store.getState().currency,
      isCartPopUp: false
    }
  }
  componentDidMount() {
    this.unsubscribe = store.subscribe(() => {
      this.setState({ currency: store.getState().currency });
    })
  }
  componentWillUnmount() {
    this.unsubscribe();
  }
  handleCurrency = (e) => {
    localStorage.setItem("currentCurrency", e.target.value);
    this.props.changeCurrency(e.target.value);
  }
  showCartPopUp = () => {
    this.setState({
      isCartPopUp: !this.state.isCartPopUp
    })
    if (window.location.pathname.split("/")[1] === "cart") {
      this.setState({
        isCartPopUp: false
      })
    }
  }


  render() {
    return (
      <nav className='navbar' style={{ backgroundColor: "white" }}>

        <div className="categories">
          <span className='links' onClick={() => this.props.changeCategory("all")}> All</span>
          <span className='links' onClick={() => this.props.changeCategory("tech")}> Tech</span>
          <span className='links' onClick={() => this.props.changeCategory("clothes")}> Clothes</span>
        </div>
        <Link to="/"> <img src={logo} alt="logo" /></Link>
        <div className='currencybox'>
          <select className='currency'
          style={{fontWeight: 'bolder',fontSize: '1rem',}}
            value={this.state.currency}
            onChange={this.handleCurrency}>
            <option className='currencyperf' value="USD" >
            $
            </option>
            <option className='currencyperf' value="GBP">
            £
            </option>
            <option className='currencyperf' value="AUD">
            A$
            </option>
            <option className='currencyperf' value="JPY">
            ¥
            </option>
            <option className='currencyperf' value="RUB">
            ₹
            </option>
          </select>
          <button onClick={this.showCartPopUp} >
            <img src={cart} alt='shopping cart' />
            <span className='boxbutton'>{this.props.cartItemsCount}</span>
          </button>
        </div>
        {this.state.isCartPopUp && <CartPopUp />}

      </nav>
    )
  }
}
const mapStateToProps = (state) => {
  return {
    cartItemsCount: state.cart.length,
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    changeCategory: (category) =>
      dispatch({ type: "Category_Update", category: category }),
    changeCurrency: (currency) =>
      dispatch({ type: "Currency_Update", currency: currency })
  }

}
export default connect(mapStateToProps, mapDispatchToProps)(Navbar)