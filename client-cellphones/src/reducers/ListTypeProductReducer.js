const initialState = {
  List:[],
  typeProduct: {},
  productTypeById: {}
}
export const ListTypeProductReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_ALL_TYPE_PRODUCT": {
      return { ...state, List: action.payload };
    }
    case "PAGINATION_CATEGORY": {
      return { ...state, typeProduct: action.payload };
    }
    case 'EDIT_CURRENT_PAGE':{
      return {...state, currentPage: action.payload}
    } 
    case 'GET_TYPE_PRODUCT_BY_ID':{
      return {...state, productTypeById: action.payload}
    }  
    case 'REMOVE_TYPE_PRODUCT_BY_ID':{
      return {...state, productTypeById: action.payload}
    }  
    default:
      return state;
  }
};

export const TypeProductReducer = (state = initialState, action) => {
  switch (action.type) {
    case "CREATE_NEW_TYPE_PRODUCT": {
      return { ...state, typeProduct: action.payload };
    }

    case "CREATE_NEW_TYPE_PRODUCT": {
      return { ...state, typeProduct: action.payload };
    }
    default:
      return state;
  }
};
