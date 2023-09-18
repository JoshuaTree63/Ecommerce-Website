import axios from 'axios';
import { PRODUCT_LIST_FAIL,
        PRODUCT_LIST_REQUEST,
        PRODUCT_LIST_SECCESS,
        PRODUCT_DETAILS_FAIL,
        PRODUCT_DETAILS_REQUEST,
        PRODUCT_DETAILS_SECCESS, 
} from '../constants/productConstants'

export const listProducts = ()=> async (dispatch) =>{
    try {
        dispatch({type: PRODUCT_LIST_REQUEST})

        const {data} = await axios.get(`/api/products/`);
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