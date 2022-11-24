import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import cart from "../images/cart.png";
import"../Styles/productdata.css"
class ProductData extends Component {
    constructor(props) {
        super(props);
        this.state = {
            product: {
                attributes: {}
            },
            quantityError: null,
            addToCartmsg: "select to Add cart"
        }
    }
    productdata = () => {
        const product = {
            name: this.props.data.name,
            prices: this.props.data.prices,
            image: this.props.data.gallery[0],
            brand: this.props.data.brand,
            quantity: 1,
            id: Math.floor(Math.random() * 1000),
            attributes: {}
        }

        this.props.data.attributes.forEach(attribute => {
            product.attributes[attribute.name] = ""
        });

        this.setState({
            product: product
        })
    }
    componentDidMount() {
        this.productdata()
    }
    handledata = (attributeName, itemID) => {
        this.setState({
            product: {
                ...this.state.product,
                attributes: {
                    ...this.state.product.attributes,
                    [attributeName]: itemID
                }
            }
        })
    }
    handleCart = () => {
        this.props.addToCart(this.state.product);
        this.setState({
            addToCartmsg: "great choice added"
        })
        this.productdata()

        setTimeout(() => {
            this.setState({
                addToCartmsg: "select to Add cart"
            })
        }, 2000)
    }
    handleQuantity = (e) => {
        if (e.target.value > 10 || e.target.value < 1) {
            this.setState({
                quantityError: "only 10 items allowed"
            })
        } else {
            this.setState({
                product: {
                    ...this.state.product,
                    quantity: e.target.value
                },
                quantityError: null
            })

        }
    }
    render() {
        if (!this.props.data.inStock) {
            return (
                <h2> OUT OF STOCK </h2>
            )
        }
        return (
            <Fragment>
                {this.props.data.attributes.map((attribute) => {
                    return (
                        <div key={attribute.name}>
                            <span key={attribute.name}>{attribute.name}:<b>{this.state.product.attributes[attribute.name] || "choose an option"}</b></span>
                            {attribute.items.map((item) => {
                                return (
                                    <button style={{backgroundColor: item.value,
                                         border: "1px solid black", minWidth: "40px", height: "30px",
                                        margin: "5px", padding: "1%"
                                    }} key={item.id} onClick={() => this.handledata(attribute.name, item.id)}>
                                        {attribute.type === "swatch" ? "" : item.displayValue}
                                    </button>
                                );
                            })}
                        </div>
                    )
                })}
                <div>
                    <label htmlFor="quantity">{this.state.quantityError ? this.state.quantityError : "Quantity"}</label>
                    <input type="number" max="10" min="1" id="quantity" style={{width:"100%"}} placeholder='Max 10 Items' onChange={this.handleQuantity} />
                </div>
                {!Object.values(this.state.product.attributes).some(choice => choice === "") && !this.state.quantityError ?
                    (<button style={{ marginTop: "20px",backgroundColor:"yellowgreen" , height:"50px" ,width:"50px",borderRadius:"50%"}} onClick={this.handleCart} ><img src={cart} alt="btn"/></button>)
                    :
                    (<h4 >{this.state.addToCartmsg}</h4>)
                }
            </Fragment>

        );
    }
}
const mapStateToProps = (state) => {
    return {
        cartItems: state.cart
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addToCart: (product) => dispatch({ type: "Add_To_Cart", product }),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductData)

