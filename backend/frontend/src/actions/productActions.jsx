import axios from 'axios';
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

    PRODUCT_CREATE_REQUEST,
    PRODUCT_CREATE_SECCESS,
    PRODUCT_CREATE_FAIL,

    PRODUCT_UPDATE_FAIL,
    PRODUCT_UPDATE_REQUEST,
    PRODUCT_UPDATE_SECCESS,

    PRODUCT_CREATE_REVIEW_FAIL,
    PRODUCT_CREATE_REVIEW_REQUEST,
    PRODUCT_CREATE_REVIEW_SECCESS,

    PRODUCT_TOP_FAIL,
    PRODUCT_TOP_REQUEST,
    PRODUCT_TOP_SECCESS,
   
    } from '../constants/productConstants'

export const listProducts = (keyword = '')=> async (dispatch) =>{
    try {
        dispatch({type: PRODUCT_LIST_REQUEST})

        const {data} = await axios.get(`/api/products`);
        dispatch({
            type: PRODUCT_LIST_SECCESS,
            payload: data 
        })

    } catch (error) {
        dispatch({
            type: PRODUCT_LIST_FAIL,
            payload: error.response && error.response.data.detail
            ? error.response.data.detail 
            : error.message,
        })
    }

}


export const listTopProducts = ()=> async (dispatch) =>{
    try {
        dispatch({type: PRODUCT_TOP_REQUEST})

        const {data} = await axios.get(`/api/products/top/`);
        dispatch({
            type: PRODUCT_TOP_SECCESS,
            payload: data 
        })

    } catch (error) {
        dispatch({
            type: PRODUCT_TOP_FAIL,
            payload: error.response && error.response.data.detail
            ? error.response.data.detail 
            : error.message,
        })
    }
}


export const listProductDetails = (id)=> async (dispatch) =>{
    try {
        dispatch({type: PRODUCT_DETAILS_REQUEST})

        const {data} = await axios.get(`/api/products/${id}`);
        dispatch({
            type: PRODUCT_DETAILS_SECCESS,
            payload: data 
        })

    } catch (error) {
        dispatch({
            type: PRODUCT_DETAILS_FAIL,
            payload: error.response && error.response.data.detail
            ? error.response.data.detail 
            : error.message,
        })
    }

}


export const deleteProduct = (id) => async (dispatch, getState) =>{
    try {
        dispatch({
            type: PRODUCT_DELETE_REQUEST
        })

        const {
            userLogin: {userinfo},
        } = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userinfo.token}`
            }
        }

        const {data} = await axios.delete(
            `/api/product/delete/${id}`,
            config)

        dispatch({
            type: PRODUCT_DELETE_SECCESS,      
        })       
   
    
    } catch (error) {
        dispatch({
            type: PRODUCT_DELETE_FAIL,
            payload: error.response && error.response.data.detail
            ? error.response.data.detail 
            : error.message,
        })
    }
}


export const createProduct = () => async (dispatch, getState) =>{
    try {
        dispatch({
            type: PRODUCT_CREATE_REQUEST
        })

        const {
            userLogin: {userinfo},
        } = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userinfo.token}`
            }
        }

        const {data} = await axios.post(
            `/api/product/create/`,
            {},
            config)

        dispatch({
            type: PRODUCT_CREATE_SECCESS,
            payload: data,      
        })     
   
    
    } catch (error) {
        dispatch({
            type: PRODUCT_CREATE_FAIL,
            payload: error.response && error.response.data.detail
            ? error.response.data.detail 
            : error.message,
        })
    }
}


export const updateProduct = (product) => async (dispatch, getState) =>{
    try {
        dispatch({
            type: PRODUCT_UPDATE_REQUEST
        })

        const {
            userLogin: {userinfo},
        } = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userinfo.token}`
            }
        }

        const {data} = await axios.put(
            `/api/product/update/${product._id}/`,
            product,
            config)

        dispatch({
            type: PRODUCT_UPDATE_SECCESS,
            payload: data,      
        })  
        
        dispatch({
            type: PRODUCT_DETAILS_SECCESS, 
            payload: data
        })
   
    
    } catch (error) {
        dispatch({
            type: PRODUCT_UPDATE_FAIL,
            payload: error.response && error.response.data.detail
            ? error.response.data.detail 
            : error.message,
        })
    }
}



export const createProductReview = (productId, review) => async (dispatch, getState) =>{
    try {
        dispatch({
            type: PRODUCT_CREATE_REVIEW_REQUEST
        })

        const {
            userLogin: {userinfo},
        } = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userinfo.token}`
            }
        }

        const {data} = await axios.post(
            `/api/product/${productId}/reviews`,
            review,
            config)

        dispatch({
            type: PRODUCT_CREATE_REVIEW_SECCESS,
            payload: data,      
        })      
   
    
    } catch (error) {
        dispatch({
            type: PRODUCT_CREATE_REVIEW_FAIL,
            payload: error.response && error.response.data.detail
            ? error.response.data.detail 
            : error.message,
        })
    }
}
