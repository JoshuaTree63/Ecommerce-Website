import { 
    PRODUCT_LIST_FAIL,
    PRODUCT_LIST_REQUEST,
    PRODUCT_LIST_SECCESS,

    PRODUCT_DETAILS_FAIL,
    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SECCESS,

    PRODUCT_DELETE_FAIL,
    PRODUCT_DELETE_REQUEST,
    PRODUCT_DELETE_SECCESS,

    PRODUCT_CREATE_FAIL,
    PRODUCT_CREATE_REQUEST,
    PRODUCT_CREATE_SECCESS,
    PRODUCT_CREATE_RESET,

    PRODUCT_UPDATE_FAIL,
    PRODUCT_UPDATE_REQUEST,
    PRODUCT_UPDATE_SECCESS,
    PRODUCT_UPDATE_RESET,

    PRODUCT_CREATE_REVIEW_FAIL,
    PRODUCT_CREATE_REVIEW_REQUEST,
    PRODUCT_CREATE_REVIEW_SECCESS,
    PRODUCT_CREATE_REVIEW_RESET,

    PRODUCT_TOP_FAIL,
    PRODUCT_TOP_REQUEST,
    PRODUCT_TOP_SECCESS,

    } from '../constants/productConstants'

export const productListReducer =(state={products:[]}, action)=> {
    switch (action.type) {

        case PRODUCT_LIST_REQUEST:
            return {loading: true, products: []}

        case PRODUCT_LIST_SECCESS:
            return {
                loading: false, 
                products: action.payload.products, 
                page: action.payload.page, 
                pages: action.payload.pages }

        case PRODUCT_LIST_FAIL:
            return {loading: false, error: action.payload}

        default:
            return state        
    }    
}

export const productDetailsReducer =(state={product:{reviews: []}}, action)=> {
    switch (action.type) {
        case PRODUCT_DETAILS_REQUEST:
            return { ...state, loading: true}
        case PRODUCT_DETAILS_SECCESS:
            return {loading: false, product: action.payload}
        case PRODUCT_DETAILS_FAIL:
            return {loading: false, error: action.payload}
        default:
            return state        
    }    
}


export const productDeleteReducer =(state={}, action)=> {
    switch (action.type) {
        case PRODUCT_DELETE_REQUEST:
            return {loading: true}

        case PRODUCT_DELETE_SECCESS:
            return {loading: false, success: true}

        case PRODUCT_DELETE_FAIL:
            return {loading: false, error: action.payload}

        default:
            return state        
    }    
}



export const productCreateReducer =(state={}, action)=> {
    switch (action.type) {
        case PRODUCT_CREATE_REQUEST:
            return {loading: true}

        case PRODUCT_CREATE_SECCESS:
            return {loading: false, success: true, product: action.payload}

        case PRODUCT_CREATE_FAIL:
            return {loading: false, error: action.payload}

        case PRODUCT_CREATE_RESET:
            return {}
        default:
            return state        
    }    
}

export const productUpdateReducer =(state={product: {}}, action)=> {
    switch (action.type) {
        case PRODUCT_UPDATE_REQUEST:
            return {loading: true}

        case PRODUCT_UPDATE_SECCESS:
            return {loading: false, success: true, product: action.payload}

        case PRODUCT_UPDATE_FAIL:
            return {loading: false, error: action.payload}

        case PRODUCT_UPDATE_RESET:
            return {product: {}}
        default:
            return state        
    }    
}

export const productReviewCreateReducer =(state={product: {}}, action)=> {
    switch (action.type) {
        case PRODUCT_CREATE_REVIEW_REQUEST:
            return {loading: true}

        case PRODUCT_CREATE_REVIEW_SECCESS:
            return {loading: false, success: true}

        case PRODUCT_CREATE_REVIEW_FAIL:
            return {loading: false, error: action.payload}

        case PRODUCT_CREATE_REVIEW_RESET:
            return {}
        default:
            return state        
    }    
}

export const productTopRatedReducer =(state={product: []}, action)=> {
    switch (action.type) {
        case PRODUCT_TOP_REQUEST:
            return {loading: true, products: []}

        case PRODUCT_TOP_SECCESS:
            return {loading: false, products: action.payload}

        case PRODUCT_TOP_FAIL:
            return {loading: false, error: action.payload}

        default:
            return state        
    }    
}