import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import { Row, Col } from 'react-grid-system';
import { useLocation } from 'react-router-dom'; // Import useLocation to get props

function Registration() {
    const location = useLocation(); // Get the location object
    const mobileNumberFromProps = location.state?.mobile || ""; // Extract the mobile number from state

    const [input, setInput] = useState({
        name: "",
        email: "",
        mob: mobileNumberFromProps, // Set initial mobile number from props
        adhaar: "",
        gender: "",
        age: "",
        file: null
    });

    const [errors,setErrors] = useState({})

    const changeHandler = (e) => {
        const { name, value } = e.target;
        setInput((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const fileHandler = (e) => {
        console.log(e.target.files[0]);
        setInput((prev) => ({
            ...prev,
            file: e.target.files[0]
        }));
    };

    const validate = ()=>{
        let newErrors = {};

        // validate name
         if(!input.name){
            newErrors.name= "Name is Requires"
         }else if(input.name.length<3){
            newErrors.name= "Name must be more than 2 character long "
         }

         // validate email
         const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/ ;
         if(!input.email){
            newErrors.email="E-mail is required"
         } 
         else if(!emailRegex.test(input.email)){
            newErrors.email="E-mail Format is invalid"
         }

         // validate adhaar 
         const adhaarRegex = /^[0-9]{12}/
         if(!input.adhaar){
            newErrors.adhaar="Adhaar number is required"
         }
         else if(!adhaarRegex.test(input.adhaar)){
            newErrors.adhaar= "Adhaar number must be of 12 digit "
         }

         // validate gender
         if(!input.gender){
            newErrors.gender="Gender us required"
         }

         // validate age 
         if (!input.age){
            newErrors.age="Age is required"
         }
         else if (isNaN(input.age)){
            newErrors.age="Age should be in number form"
         }
         else if (input.age.length<1 || input.age.length>3){
            newErrors.age= "Enter Valid Age"
         }
         setErrors(newErrors)
         return Object.keys(newErrors).length ===0
    }

    const submitHandler = () => {
        if(validate()){
            const formData = new FormData();
        formData.append('name', input.name);
        formData.append('email', input.email);
        formData.append('mob', input.mob); // Use mobile number from state
        formData.append('adhaar', input.adhaar);
        formData.append('gender', input.gender);
        formData.append('age', input.age);
        formData.append('file', input.file);
        axios.post("http://localhost:5000/", formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        .then((res) => {
            console.log(res.data);
        })
        .catch((err) => {
            console.log(err);
        });
        setInput({
            name: "",
            email: "",
            mob: mobileNumberFromProps, // Reset with props mobile number
            adhaar: "",
            gender: "",
            age: "",
            file: null
        });
        }
        
    };

    return (
        <div className='container-fluid p-5' style={{ backgroundColor: "lightcyan", fontFamily: "sans-serif" }}>
            <h4 style={{ color: "blueviolet" }}><h3><b>Register Your Application</b></h3></h4>
            <Form style={{ margin: "92px" }}>
                <Row>
                    <Col sm={1}></Col>
                    <Col sm={5}><Form.Control type='text' name='name' value={input.name} onChange={changeHandler} placeholder='Full Name' className='mt-2 shadow-lg rIn' autoComplete='off' />
                        {errors.name && <span style={{color:"red"}}>{errors.name}</span>}
                    </Col>
                    <Col sm={5}><Form.Control type='email' name='email' value={input.email} onChange={changeHandler} placeholder='E-mail' className='mt-2 shadow-lg rIn' autoComplete='off'/>
                        {errors.email && <span style={{color:"red"}}>{errors.email}</span>}
                    </Col>
                    <Col sm={1}></Col>
                </Row>

                <Row>
                    <Col sm={1}></Col>
                    <Col sm={5}><Form.Control type='number' name='mob' value={input.mob} readOnly className='mt-2 shadow-lg rIn' placeholder='Mobile Number' /></Col>
                    <Col sm={5}><Form.Control type='number' name='adhaar' value={input.adhaar} onChange={changeHandler} placeholder='Adhaar Number' className='mt-2 shadow-lg rIn' />
                        {errors.adhaar && <span style={{color:"red"}}>{errors.adhaar}</span>}
                    </Col>
                    <Col sm={1}></Col>
                </Row>

                <Row>
                    <Col sm={1}></Col>
                    <Col sm={5}><Form.Control type='text' name='gender' value={input.gender} onChange={changeHandler} style={{ width: "100%" }} className='mt-2 shadow-lg rIn' placeholder='Gender' autoComplete='off'/>
                        {errors.gender && <span style={{color:"red"}}>{errors.gender}</span>}
                    </Col>
                    <Col sm={5}><Form.Control type='number' name='age' value={input.age} onChange={changeHandler} placeholder='Age' style={{ width: "100%" }} className='mt-2 shadow-lg rIn' autoComplete='off' />
                        {errors.age && <span style={{color:"red"}}>{errors.age}</span>}
                    </Col>
                    <Col sm={1}></Col>
                </Row>

                <Row>
                    <Col sm={1}></Col>
                    <Col sm={10}>
                        <Form.Control type='file' onChange={fileHandler} name='file' style={{ width: "100%" }} className='mt-2 shadow-lg rIn' />
                    </Col>
                    <Col sm={1}></Col>
                </Row>

                <Row className='mt-4'>
                    <Col sm={4}></Col>
                    <Col sm={4}>
                        <Button type='button' onClick={submitHandler} className='mt-5 shadow-lg' style={{ backgroundColor: "forestgreen", borderColor: "forestgreen" }}>Register</Button>
                    </Col>
                    <Col sm={4}></Col>
                </Row>
            </Form>
        </div>
    );
}

export default Registration;
