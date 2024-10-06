import React, { useState } from 'react';
import { Row, Col } from 'react-grid-system';
import Button from 'react-bootstrap/Button';
import Form from "react-bootstrap/Form";
import { useNavigate } from 'react-router-dom';

function Login() {
    const [input, setInput] = useState({
        mobile: "",
        otp: ""
    });

    const [errors, setErrors]= useState({})

    const [hidden, setHidden] = useState("");

    const changeHandler = (e) => {
        const { name, value } = e.target;
        setInput((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    // Generate a random OTP
    const random = Math.floor(1000 + Math.random() * 9000).toString();

    const navigate = useNavigate();

    const validate = ()=>{
        let newErrors = {};
        if(!input.mobile){
            newErrors.mobile="Enter your mobile number"
        }
        else if (input.mobile.length!=10){
            newErrors.mobile="Please enter valid mobile number of 10 digits"
        }
        setErrors(newErrors)
        return Object.keys(newErrors).length===0
    }

    const generateOTP = () => {
        if(validate()){
            alert(`Your OTP is: ${random}`);
        setHidden(random);
        }
         // Store the OTP
    };

    const submitHandler = () => {
        if (!input.otp) {
            alert("Please verify the OTP first");
            return;
        }

        // Check if the entered OTP matches the generated OTP
        if (input.otp === hidden) {
            // Navigate to the Registration component and pass the mobile number
            navigate('/registration', { state: { mobile: input.mobile } });
        } else {
            alert("Incorrect OTP, please try again");
        }

        setInput({ mobile: "", otp: "" });
    };

    return (
        <div className='loginDiv' style={{ backgroundColor: "rgb(220,220,220)", padding: "73px" }}>
            <Row>
                <Col sm={3}></Col>
                <Col sm={6}>
                    <h4><u className='blink'>Verify Via OTP</u></h4>
                </Col>
                <Col sm={3}></Col>
            </Row>

            {/* Mobile Number Input */}
            <Row className='mt-5 mb-5'>
                <Col sm={3}></Col>
                <Col sm={5}>
                    <Form.Control
                        type='number'
                        value={input.mobile}
                        name='mobile'
                        onChange={changeHandler}
                        placeholder='Enter Mobile Number'
                        className='shadow-lg'
                        autoComplete='off'
                    />
                    {errors.mobile && <span style={{color:"red"}}>{errors.mobile}</span>}
                </Col>
                <Col sm={2}>
                    <Button
                        type='button'
                        onClick={generateOTP}
                        
                        className='shadow-lg bg-success border-success'
                    >
                        Get OTP
                    </Button>
                </Col>
                <Col sm={2}></Col>
            </Row>

            {/* OTP Input */}
            <Row>
                <Col sm={3}></Col>
                <Col sm={5}>
                    <Form.Control
                        type='number'
                        value={input.otp}
                        name='otp'
                        onChange={changeHandler}
                        placeholder='Enter OTP'
                        className='shadow-lg'
                    />
                </Col>
                <Col sm={2}>
                    <Button
                        type='button'
                        onClick={submitHandler}
                        
                        className='shadow-lg bg-success border-success'
                    >
                        Verify
                    </Button>
                </Col>
                <Col sm={2}></Col>
            </Row>

            {/* Hidden Input for OTP (optional) */}
            <Row>
                <Col sm={3}></Col>
                <Col sm={6}>
                    <Form.Control
                        type='number'
                        name='hidden'
                        value={hidden}
                        onChange={changeHandler}
                        hidden
                    />
                </Col>
                <Col sm={3}></Col>
            </Row>

            {/* Additional Information */}
            <Row style={{marginTop:"100px", marginBottom:"100px"}}>
                <Col sm={2}></Col>
                <Col sm={8}>
                    <h2 style={{ color: "rgb(220,53,69)" }}>
                        Grievance can be lodged by registered users only.
                    </h2>
                </Col>
                <Col sm={2}></Col>
            </Row>
        </div>
    );
}

export default Login;
