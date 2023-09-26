import React, {useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {Row, Col} from 'react-bootstrap'
import Product from "../Components/Product.jsx";
import Loader from "../Components/Loader.jsx";
import Message from "../Components/Message.jsx";
import { listProducts } from "../actions/productActions.jsx";



const HomeScreen = ({history})=>{
    const dispatch = useDispatch() 
    const productList = useSelector(state => state.productList)
    const {error, loading, products} = productList

    let keyword = history.location.search
    useEffect(()=> {
        dispatch(listProducts(keyword))

     }, [dispatch, keyword])

    return(
        <div>
            <h1>Latest products</h1>
            {loading ? <Loader />
                : error ? <Message variant='danger'>{error}</Message>
                    :
                    <Row>
                        {products.map(product =>(
                            <Col key={product._id} sm={12} md={6} xl={3}>
                                <Product product={product} />
                            </Col>
                        ))}
                    </Row> 
            }            
        </div>
        
    )
}

export default HomeScreen;