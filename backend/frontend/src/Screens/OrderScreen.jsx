import React , {useState, useEffect} from "react"; 
import FormContainer from "../Components/FormContainer"
import { Button, Row, Col, ListGroup, Image, Card} from 'react-bootstrap'
import {LinkContainer } from 'react-router-bootstrap'
import { useDispatch, useSelector } from "react-redux"
import {PayPalButtons} from '@paypal/react-paypal-js'
import Message from '../Components/Message'
import Loader from "../Components/Loader";
import {getOrderDetails, payOrder, deliverOrder} from '../actions/orderActions'
import {Link} from 'react-router-bootstrap'
import { ORDER_PAY_RESET, ORDER_DELIVER_RESET} from "../constants/orderConstants";
import { useNavigate, useParams } from "react-router-dom";


const OrderScreen =()=> {

    const {id: orderId} = useParams()
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [sdkReady, setSdkReady] = useState(false)

    const orderDetails = useSelector(state => state.orderDetails)
    const {order, error, loading} = orderDetails

    const orderPay= useSelector(state => state.orderPay)
    const {loading: loadingPay, success: successPay} = orderPay

    const orderDeliver= useSelector(state => state.orderDeliver)
    const {loading: loadingDeliver, success: successDeliver} = orderDeliver

    const orderLogin= useSelector(state => state.orderLogin)
    const {userInfo} = orderLogin

    if(!loading && !error) {
        order.itemsPrice = order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0).toFixed(2)
    }    

    const addPayPalScript = ()=>{
        const script = document.createElement('script')
        script.type = 'text/javescript'
        script.src = 'https://www.paypal.com/sdk/js?client-id=AWhkrpOaRgdisahBKJmogotqPfbcAjXeVG1QjoYE5UOARGp-h5SgfbSOqwCdeRTBBVSRtQJSe0WFzWl5'
        script.async = true
        script.onload = ()=> {
            setSdkReady(true)
        }
        document.body.appendChild(script) 
    }

    useEffect(()=> {
        if(!userInfo) {
            navigate('/login')
        }
        if(!order || successPay || order._id !== Number(orderId) || successDeliver){
            dispatch({type:ORDER_PAY_RESET})
            dispatch({type:ORDER_DELIVER_RESET})
            dispatch(getOrderDetails(orderId)) 

        } else if (!order.isPaid) {
            if(!window.paypal){
                addPayPalScript()
            } else{
                sdkReady(true)
            }
        }                
    },[dispatch, order, orderId, successPay, successDeliver])

    const successPaymentHandler = (paymentResult)=>{
        dispatch(payOrder(orderId, paymentResult))
    }

    const deliverHandler = () =>{
        dispatch(deliverOrder(order))
    }


    return loading? (
        <Loader/>
    ) : error ? (
        <Message variant='danger'>{error}</Message>
    ) : (
        <div>
            <h1>Order: {order._id}</h1>
            <Row>
                <Col md={8}>
                    <ListGroup variant="flush">
                        <ListGroup.Item>
                            <h2>Shipping</h2>
                            <p><strong>Name: </strong> {order.user.name}</p>
                            <p><strong>Email: </strong> <a href={`mailto:${order.user.email}`}>{order.user.email}</a></p>
                            <p>
                                <strong>Shipping: </strong>
                                {order.shippingAddress.address}, {order.shippingAddress.city}
                                {'   '}
                                {order.shippingAddress.postalCode},
                                {'   '}
                                {order.shippingAddress.country}
                            </p>

                            {order.isDelivered ? (
                                <Message variant='success'> Delivered on {order.deliveredAt }</Message>
                            ) : (
                                <Message variant='warning'> Not Delivered</Message>
                            )}
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <h2>Payment Mathod</h2>
                            <p>
                                <strong>Mathod: </strong>
                                {order.paymentMethod}                                
                            </p>
                            {order.isPaid ? (
                                <Message variant='success'> Paid on {order.paidAt}</Message>
                            ) : (
                                <Message variant='warning'> Not Paid</Message>
                            )}

                        </ListGroup.Item>

                        <ListGroup.Item>
                            <h2>Order Items</h2>
                            {order.orderItems.length === 0 ? <Message variant='info'>
                                Order is empty
                            </Message>: (
                                <ListGroup variant='flush'>
                                    {order.orderItems.map((item, index) => (
                                        <ListGroup.Item key={index}>
                                            <Row>
                                                <Col>
                                                    <Image scr={item.image} alt={item.name} fluid rounded/>
                                                </Col>

                                                <Col>
                                                    <LinkContainer  to={`/product/${item.product}`}>{item.name}</LinkContainer >
                                                </Col>

                                                <Col md={4}>
                                                    {item.qty} X ${item.price} = ${(item.qty * item.price).toFixed(2)}
                                                </Col>
                                            </Row>
                                        </ListGroup.Item>
                                    ))}

                                </ListGroup>
                            )}
                            
                        </ListGroup.Item>

                    </ListGroup>
                </Col>

                <Col md={4}>
                    <Card>
                        <ListGroup variant="flush">
                            <ListGroup.Item>
                                <h2>Order Summary</h2>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col>Item:</Col>
                                    <Col>${order.itemsPrice}</Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col>Shipping:</Col>
                                    <Col>${order.shippingPrice}</Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col>Tax:</Col>
                                    <Col>${order.taxPrice}</Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col>Total:</Col>
                                    <Col>${order.totalPrice}</Col>
                                </Row>
                            </ListGroup.Item>

                            {!order.isPaid && (
                                <ListGroup.Item>
                                    {loadingPay && <Loader/>}

                                    {!sdkReady ? (
                                        <Loader/>
                                    ) : (
                                        <PayPalButtons
                                            amount={order.totalPrice}
                                            onSuccess={successPaymentHandler}/>
                                    )}
                                </ListGroup.Item>
                            )}              
                        </ListGroup>
                    </Card>
                    {loadingDeliver && <Loader/>}
                    {userInfo && userInfo.isAdmin && order.isPaid && !order.isDelivered (
                        <ListGroup.Item>
                            <Button
                                type='button'
                                className="btn btn-block"
                                onClick={deliverHandler}>
                            </Button>
                        </ListGroup.Item>
                    )}

                    

                </Col>
            </Row>

        </div>
    )
}

export default OrderScreen;


