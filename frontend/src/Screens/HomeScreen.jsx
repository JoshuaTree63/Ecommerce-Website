import React, {useState, useEffect} from "react";
import {Row, Col} from 'react-bootstrap'
import products from '../products.js' 
import Product from "../Components/Product.jsx";
import axios from 'axios'
import { Link, useParams } from "react-router-dom";


const HomeScreen = ({match})=>{
    const productId = useParams()

    const [products, setProducts] = useState([])

    useEffect(()=> {
        async function fetchProducts () {

            const {data} = await axios.get(`api/products/${productId._id}`)
            setProducts(data)
        }
        fetchProducts()

    }, [])


    return(
        <div>
            <h1>Latest products</h1>
            <Row>
                {products.map(product =>(
                    <Col key={product._id} sm={12} md={6} xl={3}>
                        <Product product={product} />
                    </Col>
                ))}
            </Row>
        </div>
        
    )
}

export default HomeScreen;