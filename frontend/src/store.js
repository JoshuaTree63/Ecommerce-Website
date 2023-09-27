import {createStore, applyMiddleware, combineReducers} from 'redux';
import thunk from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import { 
    productListReducer, 
    productDetailsReducer, 
    productDeleteReducer, 
    productCreateReducer, 
    productUpdateReducer,
    productReviewCreateReducer,
    productTopRatedReducer,
    } from './reducers/productReducers';
 import { cartReducers } from './reducers/cartReducers';
import { 
    userDetailsReducer, 
    userLoginReducer, 
    userRegisterReducer, 
    userUpdateProfileReducer, 
    userListReducer, 
    userDeleteReducer,
    userUpdateReducer,    

    } from './reducers/userReducers';
import { 
    orderCreateReducer, 
    orderDetailsReducer, 
    orderPayReducer, 
    orderListMyReducer, 
    orderListReducer, 
    orderdDeliverReducer } from './reducers/orderReducers';


const reducer = combineReducers({
    productList: productListReducer,
    productDetails: productDetailsReducer,
    productDelete:productDeleteReducer,
    productCreate:productCreateReducer,
    productUpdate: productUpdateReducer,
    productReviewCreate: productReviewCreateReducer,
    productTopRated: productTopRatedReducer,

    cart: cartReducers,
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    userDetails: userDetailsReducer,
    userUpdateProfile: userUpdateProfileReducer,
    userList: userListReducer,
    userDelete: userDeleteReducer,
    userUpdate: userUpdateReducer,

    orderCreate: orderCreateReducer,
    orderDetails:orderDetailsReducer,
    orderPay: orderPayReducer,
    orderListMy: orderListMyReducer,
    orderList: orderListReducer,
    orderDeliver: orderdDeliverReducer
})


const cartItemFromStorage = localStorage.getItem('cartItems') ?
    JSON.parse(localStorage.getItem('cartItems')) : []

const userInfoFromStorage = localStorage.getItem('userInfo') ?
    JSON.parse(localStorage.getItem('userInfo')) : null

const shippingAddressFromStorage = localStorage.getItem('shippingAddress') ?
    JSON.parse(localStorage.getItem('shippingAddress')) : {}

const initialState = {
    cart: {
        cartItems: cartItemFromStorage,
        shippingAddress: shippingAddressFromStorage},
    userLogin: {userInfo: userInfoFromStorage}
}
const middleware = [thunk]

const store = createStore(reducer,initialState,
    composeWithDevTools(applyMiddleware(...middleware)))

export default store;    


