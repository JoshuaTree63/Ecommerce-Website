import React,{useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {Link, useParams, useNavigate } from 'react-router-dom'
import { Button, Card, Col, Form, Image, ListGroup, ListGroupItem, Row } from 'react-bootstrap'
import Rating from '../Components/Rating'
import Loader from '../Components/Loader'
import Message from '../Components/Message'
import { createProductReview, listProductDetails } from '../actions/productActions'
import { PRODUCT_CREATE_REVIEW_RESET } from '../constants/productConstants'


const ProductScreen = ()=>{
    
    // const [qty, setQty] = useState(1)
    // const [rating, setRating] = useState(0)
    // const [comment, setComment] = useState('')
    // const { id } = useParams();

    // const dispatch = useDispatch()
    // const navigate = useNavigate();

    // const productDetails = useSelector(state => state.productDetails)
    // const {loading, error, product} = productDetails

    // const userLogin = useSelector(state => state.userLogin)
    // const {userInfo} = userLogin

    // const productReviewCreate = useSelector(state => state.productReviewCreate)
    // const {
    //     loading: loadingProductReview,
    //     error: errorProductReview,
    //     success: successProductReview 
    // } = productReviewCreate

    // useEffect(()=> {
    //     if(successProductReview){
    //         setRating(0)
    //         setComment('')
    //         dispatch({type: PRODUCT_CREATE_REVIEW_RESET })
    //     }

    //     dispatch(listProductDetails(match.params.id)) 

    // }, [dispatch, match, successProductReview])

    // const addToCartHandler = () =>(
    //     navigate(`/cart/${id}?qty=${qty}`)
    // )


    // return(
    //     <div>
    //         <Link to='/' className='btn btn-light my-3'>Go Back</Link>
    //         {loading? 
    //             <Loader />
    //             : error
    //                 ? <Message variant='danger'>{error}</Message>
    //                 :
    //                     (
    //                     <div>
    //                     <Row>
    //                         <Col md={6}>
    //                             <Image src ={product.image} alt={product.name} fluid />
    //                         </Col>
                            
    //                         <Col md={3}>
    //                             <ListGroup variant='flush'>
    //                                 <ListGroup.Item>
    //                                     <h3>{product.name}</h3>                            
    //                                 </ListGroup.Item>

    //                                 <ListGroup.Item>
    //                                     <Rating value={product.rating} text={`${product.numReviews} reviews`} color={'#f8e258'} />
    //                                 </ListGroup.Item>

    //                                 <ListGroup.Item>
    //                                     Price: ${product.price}                             
    //                                 </ListGroup.Item>

    //                                 <ListGroup.Item>
    //                                     Description: {product.description}                             
    //                                 </ListGroup.Item>

    //                             </ListGroup>
    //                         </Col>


    //                         <Col md={3} variant='flush'>
    //                             <Card>
    //                                 <ListGroup.Item>
    //                                     <Row>
    //                                         <Col>Price:</Col>
    //                                         <Col>
    //                                             <strong>${product.price}</strong>
    //                                         </Col>
    //                                     </Row>
    //                                 </ListGroup.Item>

    //                                 <ListGroup.Item>
    //                                     <Row>
    //                                         <Col>Status:</Col>
    //                                         <Col>
    //                                             {product.countInStock > 0 ? 'In Stock': 'Out of Stock'}
    //                                         </Col>
    //                                     </Row>
    //                                 </ListGroup.Item>

    //                                 {product.countInStock > 0 && (
    //                                     <ListGroup.Item >
    //                                         <Row>
    //                                             <Col>Qty</Col>
    //                                             <Col xs='auto' className='my-1'>
    //                                                 <Form.Control
    //                                                     as="select"
    //                                                     value={qty}  
    //                                                     onChange={(e) => setQty(e.target.value)}  
    //                                                 >
    //                                                     {
    //                                                         [...Array(product.countInStock).keys()].maps((x) => (
    //                                                         <option key={x+1} value={x+1}>
    //                                                             {x+1}
    //                                                         </option>

    //                                                         ))
    //                                                     }                                                       

    //                                                 </Form.Control>
    //                                             </Col>
    //                                         </Row>
    //                                     </ListGroup.Item>
    //                                 )}

    //                                 <ListGroup.Item>
    //                                     <Button
    //                                         onClick={addToCartHandler} 
    //                                         className='btn-block' 
    //                                         disabled={product.countInStock === 0} 
    //                                         type='button'>Add to Cart
    //                                         </Button>
    //                                 </ListGroup.Item>
    //                             </Card>     
    //                         </Col> 
    //                     </Row>

    //                     <Row>
    //                         <Col ms={6}>
    //                             <h4>Reviews</h4>
    //                             {product.reviews.length === 0 && <Message variant='info'>No Reviews</Message>}

    //                             <ListGroup variant='flush'>
    //                                 {product.reviews.map((review) => (                                        
    //                                     <ListGroup.Item key={review._id}>
    //                                         <strong>{review.name}</strong>
    //                                         <Rating value={review.rating} color='#f8e825'/>
    //                                         <p>{review.createdAt.substring(0, 10)}</p>
    //                                         <p>{review.comment}</p>
    //                                     </ListGroup.Item>
    //                                 ))}

    //                                 <ListGroup.Item>
    //                                     <h4>Write a Review</h4>

    //                                     {loadingProductReview && <Loader/>}
    //                                     {successProductReview && <Message variant='success'>Review Submitted</Message>}
    //                                     {errorProductReview && <Message variant='danger'>{errorProductReview}</Message>}
                                       
    //                                 </ListGroup.Item>
    //                             </ListGroup>
    //                         </Col>
    //                     </Row>
    //                     </div>
    //                 ) 
    //         }                       
    //     </div>
    // )
    const [qty, setQty] = useState(1);
    const dispatch = useDispatch();
    const { id } = useParams();
    const productDetails = useSelector(state => state.productDetails);
    const { loading, error, product } = productDetails;
  
    useEffect(() => {
      dispatch(listProductDetails(id));
    }, [dispatch, id]);
  
    const navigate = useNavigate();
  
    const addToCartHandler = () => {
      navigate(`/cart/${id}?qty=${qty}`);
    };
  
    const incrementQty = () => {
      if (qty < product.countInStock) {
        setQty(qty + 1);
      }
    };
  
    const decrementQty = () => {
      if (qty > 1) {
        setQty(qty - 1);
      }
    };
  
    return (
      <div>
        <Link to='/' className='btn btn-light my-3'>
          Go Back
        </Link>
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>{error}</Message>
        ) : (
          <Row>
            <Col md={6}>
              <Card className='my-3 p-3 rounded product-card'>
                <Image src={product?.image} alt={product?.name} fluid className='product-image' />
              </Card>
            </Col>
  
            <Col md={3}>
              <ListGroup variant='flush'>
                <ListGroup.Item>
                  <h3>{product.name}</h3>
                </ListGroup.Item>
  
                <ListGroup.Item>Price: ${product.price}</ListGroup.Item>
  
                <ListGroup.Item>{product.description}</ListGroup.Item>
  
                <ListGroup.Item>
                  <Rating value={product.rating} text={`${product.numReviews} reviews`} color={'#fc9700'} />
                </ListGroup.Item>
              </ListGroup>
            </Col>
  
            <Col md={3}>
              <Card className='product-details'>
                <ListGroup variant='flush'>
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
                      <Col>{product.countInStock > 0 ? 'Currently available' : 'Not available'}</Col>
                    </Row>
                  </ListGroup.Item>
  
                  {product.countInStock > 0 && (
                    <ListGroup.Item>
                      <Row>
                        <Col>Qty</Col>
                        <Col xs='auto' className='my-1'>
                          <div className='product-quantity'>
                            <div className='quantity-bubble'>
                              <button
                                type='button'
                                className='quantity-button product-quantity-button'
                                onClick={decrementQty}
                              >
                                -
                              </button>
                              <span className='quantity-value'>{qty}</span>
                              <button
                                type='button'
                                className='quantity-button product-quantity-button'
                                onClick={incrementQty}
                              >
                                +
                              </button>
                            </div>
                          </div>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  )}
  
                  <ListGroup.Item>
                    <Button
                      onClick={addToCartHandler}
                      className='btn-block'
                      disabled={product.countInStock === 0}
                      type='button'
                    >
                      Add to Cart
                    </Button>
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
          </Row>
        )}
      </div>
    );



}

export default ProductScreen;