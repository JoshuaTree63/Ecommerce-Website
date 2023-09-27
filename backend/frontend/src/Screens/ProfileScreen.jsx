import React, {useState, useEffect} from "react"
import { Row, Col, Form, Button, Table } from 'react-bootstrap'
import {  useLocation, useNavigate } from "react-router-dom"
import {LinkContainer} from 'react-router-bootstrap'
import { useDispatch, useSelector } from "react-redux"
import {getUserDetails, UpdateUserProfile} from '../actions/userActions'
import Message from "../Components/Message"
import Loader from "../Components/Loader"
import { USER_UPDATE_PROFILE_RESET } from "../constants/userConstants"
import { listMyOrders } from "../actions/orderActions"


const ProfileScreen = () => {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState('')

    const dispatch = useDispatch()

    const userDetails = useSelector(state => state.userDetails)
    const {error, loading, user} = userDetails

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const navigate = useNavigate()    

    const userUpdateProfile = useSelector(state => state.userUpdateProfile)
    const {success} = userUpdateProfile   

    const orderListMy = useSelector(state => state.orderListMy)
    const {loading:loadingOrders, error: errorOrders, orders} = orderListMy   

    useEffect(() => {
        if(!userInfo) {
            navigate('/login')
        }else {
            if(!user || !user.name || success || userInfo._id !== user._id){
                dispatch({type: USER_UPDATE_PROFILE_RESET})
                dispatch(getUserDetails('profile'))
                dispatch(listMyOrders())
            }else{
                setName(user.name)
                setEmail(user.email)
            }
        }


    }, [dispatch, navigate,userInfo, user, success])

    const submitHandler = (e) => {
        e.preventDefault()

        if (password !== confirmPassword) {
            setMessage("The password dont match")
        } else {
            dispatch(UpdateUserProfile({
                'id': user._id,
                'name':name,
                'email': email,
                'password': password
            }))
            setMessage("")
        }
    }

    return (
        <Row>
            <Col md={3}>
                <h2>User Profile</h2>
                {Message && <Message variant='danger'>{message}</Message>}
            {error && <Message variant='danger'>{error}</Message>}
            {loading && <Loader />}
            <Form onSubmit={submitHandler}>

            <Form.Group controlId='name'>
                <Form.Label>Name</Form.Label>
                <Form.Control
                    required
                    type='Name'
                    placeholder='Enter Name'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    >
                </Form.Control>
            </Form.Group>

            <Form.Group controlId='email'>
                <Form.Label>Email Address</Form.Label>
                <Form.Control
                    required
                    type='email'
                    placeholder='Enter Email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    >
                </Form.Control>
                </Form.Group>

                <Form.Group controlId='password'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type='password'
                        placeholder='Enter password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        >                                                    
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId='passwordConfirm'>
                    <Form.Label>Confirm Password </Form.Label>
                    <Form.Control 
                        type='password'
                        placeholder='Confirm Password'
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        >                                                    
                    </Form.Control>
                </Form.Group>

                <Button type='submit' variant="primary">Update</Button>

            </Form>
            </Col>

            <Col md={9}>
                <h2>My Orders</h2>
                {loadingOrders ? (
                    <Loader />
                ) : errorOrders ? (
                    <Message variant='danger'>{errorOrders}</Message>
                ) : (
                    <Table striped responsive className="table-sm">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Date</th>
                                <th>Total</th>
                                <th>Paid</th>
                                <th>Delivered</th>
                            </tr>
                        </thead>

                        <tbody>
                            {orders.map(order =>(
                                <tr key={order._id}>
                                    <tr>{order._id}</tr>
                                    <tr>{order.createAt.substring(0,10)}</tr>
                                    <tr>${order.totalPrice}</tr>
                                    <tr>{order.isPaid ? order.isPaid : 
                                        <i className="fas fa-times" style={{color: 'red'}}></i>
                                    }</tr>
                                    <tr>
                                        <LinkContainer to={`order/${order._id}`}>
                                            <Button className="btn-sm">Details</Button>
                                        </LinkContainer>  
                                    </tr>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                )}
            </Col>

        </Row>

    )
} 

export default ProfileScreen;