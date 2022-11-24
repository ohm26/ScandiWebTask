const currentId = window.location.pathname.split('/')[2]
const currentCurrency = localStorage.getItem('currentCurrency')
const new_state =
{
    category: "all",
    currency: currentCurrency || "USD",
    productID: currentId,
    cart: JSON.parse(localStorage.getItem("cart")) || []
}
const Reducer = (state = new_state, action) => {
    if (action.type === "Category_Update") {
        return {
            ...state,
            category: action.category
        }
    }
    if (action.type === "Currency_Update") {
        return {
            ...state,
            currency: action.currency
        }
    }
    if (action.type === "ProductID_Update") {
        return {
            ...state,
            productID: action.productID
        }
    }


    if (action.type === "Add_To_Cart") {
        localStorage.setItem("cart", JSON.stringify([...state.cart, action.product]))
        return {
            ...state,
            cart: [...state.cart, action.product]
        }
    }
    if (action.type === "Clear_Cart") {
        localStorage.removeItem("cart")
        return {
            ...state,
            cart: []
        }
    }
    if (action.type === "Remove_Cart_Item") {
        const newCart = state.cart.filter(cartItem => cartItem.id !== action.id)
        localStorage.setItem("cart", JSON.stringify(newCart))
        return {
            ...state,
            cart: newCart
        }
    }
    if (action.type === "Quantity_Incra") {
        const newCart = state.cart.map(item => {
            if (item.id === action.id) {
                if (item.quantity < 10) {
                    return {
                        ...item,
                        quantity: Number(item.quantity)+1
                    }
                } else return item
            } else return item
        })
        localStorage.setItem("cart", JSON.stringify(newCart))
        return {
            ...state,
            cart: newCart
        }
    }
    if (action.type === "Quantity_Decra") {
        const newCart = state.cart.map(item => {
            if (item.id === action.id) {
                if (item.quantity > 1) {
                    return {
                        ...item,
                        quantity: Number(item.quantity)-1
                    }
                } else return item
            } else return item
        })
        localStorage.setItem("cart", JSON.stringify(newCart))
        return {
            ...state,
            cart: newCart
        }
    }
    else return state
}
export default Reducer