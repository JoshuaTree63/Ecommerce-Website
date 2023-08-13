import React,{useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {Link} from 'react-router-dom'
import { Button, Card, Col, Image, ListGroup, Row } from 'react-bootstrap'
import Rating from '../Components/Rating'


const ProductScreen = ({match})=>{
    const dispatch = useDispatch()
    const productDetails = useSelector


    

    useEffect(()=> {
       
    }, [])

    let product = {}

    
    return(
        <div>
            <Link to='/' className='btn btn-light my-3'>Go Back</Link>
            <Row>
                <Col md={6}>
                    <Image src ={product.image} alt={product.name} fluid />
                </Col>
                
                <Col md={3}>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h3>{product.name}</h3>                            
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <Rating value={product.rating} text={`${product.numReviews} reviews`} color={'#f8e258'} />
                        </ListGroup.Item>

                        <ListGroup.Item>
                            Price: ${product.price}                             
                        </ListGroup.Item>

                        <ListGroup.Item>
                            Description: {product.description}                             
                        </ListGroup.Item>

                    </ListGroup>
                </Col>


                <Col md={3} variant='flush'>
                    <Card>
                        <ListGroup.Item>
                            <Row>
                                <Col>Price:</Col>
                                <Col>
                                    <strong>${product.price}</strong>
                                </Col>
                            </Row>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <Row>
                                <Col>Status:</Col>
                                <Col>
                                    {product.countInStock > 0 ? 'In Stock': 'Out of Stock'}
                                </Col>
                            </Row>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <Button className='btn-block' disabled={product.countInStock === 0} type='button'>Add to Cart</Button>
                        </ListGroup.Item>
                    </Card>     
                </Col> 
            </Row>            
        </div>

    )
}

export default ProductScreen;