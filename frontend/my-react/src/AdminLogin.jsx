import React, { useState } from 'react'
import axios from 'axios'
import {Row, Col} from 'react-grid-system';
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { useNavigate } from 'react-router-dom';

function AdminLogin() {
    const [input, setInput] = useState({
        username:"",
        password:""
    })

    const navigate = useNavigate()

    const changeHandler=(e)=>{
        const {name,value} = e.target
        setInput((prev)=>({
            ...prev,
            [name]: value
        }))
    }

    const submitHandler=()=>{
        axios.post("http://localhost:5000/adminlogin",{
            username:input.username,
            password:input.password
        }).then((response)=>{
           if (response.data.message=="login Successful"){
            alert("Login Successful")
            localStorage.setItem('loggedIn', 'true')
            // onLoginSuccess();
            navigate("/display")
            window.location.reload(false)
           }
           else{
            alert("Invalid username or password")
           }
        }).catch((err)=>{
            alert("error")
            console.log(err)
        })
    }
  return (
    <div style={{alignItems:"center", backgroundColor:"rgb(223,222,229)"}}>
        <Row className='p-3'>
            <Col md={2}></Col>
            <Col md={8} sm={12} style={{backgroundColor:"cornsilk", borderRadius:"50px"}} className='mt-5 mb-5'>
                <Form className='m-5 p-5'>
                    <Form.Label className='mt-2'><h4>Admin Username</h4></Form.Label>
                    <Form.Control type='text' name='username' value={input.username} onChange={changeHandler} className='shadow-lg' autoComplete='off'/>

                    <Form.Label className='mt-5'><h4>Admin Password</h4></Form.Label>
                    <Form.Control type='password' name='password' value={input.password} onChange={changeHandler} className='shadow-lg'/>

                    <Button type='button' onClick={submitHandler} className='mt-4 mb-1 shadow-lg ps-4 pe-4' style={{backgroundColor:"cornsilk", borderColor:"blue", color:"blue"}}>Login</Button>
                </Form>
            </Col>
            <Col md={2}></Col>
      </Row>
    </div>
  )
}

export default AdminLogin
