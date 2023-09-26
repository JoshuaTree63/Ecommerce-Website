import React from "react"
import { useState } from "react"
import {Button, Form} from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';

const SearchBox = () => {
    const [keyword, setKeyword] = useState('')
    let navigate = useNavigate()

    const submitHandler = (e)=>{
        e.preventDefault()
        if(keyword){
            navigate(`/?keyword=${keyword}`) 
        }else {
            navigate(navigate(navigate.location.pathname))
        }
        
    }
    return (
        <Form onSubmit={submitHandler}className='d-flex'>
            <Form.Control
                type='text'
                name='q'
                onChange={(e) => setKeyword(e.target.value)}
                className="mr-sm-2 ml-sm-5">
            </Form.Control>

            <Button 
                type='submit'
                variant="outline-success"
                className="p-2"
                >
                Submit
            </Button>

        </Form>
    )
}

export default SearchBox;