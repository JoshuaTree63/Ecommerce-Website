import React, {useState, useEffect} from "react"
import { Row, Col, Form, Button } from 'react-bootstrap'
import {  useLocation, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import {getUserDetails, UpdateUserProfile} from '../actions/userActions'
import Message from "../Components/Message"
import Loader from "../Components/Loader"
import { USER_UPDATE_PROFILE_RESET } from "../constants/userConstants"


const ProfileScreen = () => {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState('')

    const location = useLocation()
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const userDetails = useSelector(state => state.userDetails)
    const {error, loading, user} = userDetails

    const userUpdateProfile = useSelector(state => state.userUpdateProfile)
    const {success} = userUpdateProfile

    useEffect(() => {
        if(!userInfo) {
            navigate('/login')
        }else {
            if(!user || !user.name || success){
                dispatch({type: USER_UPDATE_PROFILE_RESET})
                dispatch(getUserDetails('profile'))
            }else{
                setName(user.name)
                setEmail(user.email)
            }
        }


    }, [dispatch, navigate, userInfo, user, success])

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
            </Col>

        </Row>

    )
} 

export default ProfileScreen;
