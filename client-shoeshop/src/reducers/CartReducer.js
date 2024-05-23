
export const CartReducer = (state = {cartItems: []}, action) => {
    switch (action.type) {
        case 'ADD_TO_CART': {
            let newList = [...state.cartItems]
            const exists = newList.find(item => 
                (item._id === action.payload._id && item.sizeSelected === action.payload.sizeSelected && action.payload.colorSelected === item.colorSelected))
            if (exists) {
                newList = newList.map((item) => 
                (item._id === action.payload._id && item.sizeSelected === action.payload.sizeSelected && action.payload.colorSelected === item.colorSelected) 
                ? { ...exists, qty: exists.qty + 1 } : item)
            }else{
                const product = {
                    ...action.payload,
                    qty: 1,
                }
                newList.push(product);
            }

            localStorage.setItem('cartItems', JSON.stringify(newList))
            return {
                ...state,
                cartItems: newList
            };
        }
            
        
        case 'DELETE_TO_CART': {
            let newList = [...state.cartItems]
            const exists = newList.find(item => 
                item._id === action.payload._id  && item.sizeSelected === action.payload.sizeSelected && action.payload.colorSelected === item.colorSelected)
           
            if (exists.qty === 1) {
                newList = newList.filter((item) => 
                    !(item._id === exists._id && item.sizeSelected === action.payload.sizeSelected && action.payload.colorSelected === item.colorSelected)
            )
            }else{
                newList = newList.map((item) => 
                    (item._id === action.payload._id && item.sizeSelected === action.payload.sizeSelected && action.payload.colorSelected === item.colorSelected) 
                ? { ...exists, qty: exists.qty - 1 } : item)
            }
    
            localStorage.setItem('cartItems', JSON.stringify(newList))
            return {
                ...state,
                cartItems: newList
            };
        }
            
        case 'DELETE_QTY_PRODUCT': {
            let newList = [...state.cartItems]
            
            newList = newList.filter((item) => item._id !== action.payload._id && item.sizeSelected === action.payload.sizeSelected && action.payload.colorSelected === item.colorSelected)
            
            localStorage.setItem('cartItems', JSON.stringify(newList))
            return {
                ...state,
                cartItems: newList
            };
        }

        case 'CART_EMTY':{
            return {...state, cartItems: []}
        }
        default:
            return state;
    }

}

