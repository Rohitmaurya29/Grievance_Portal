import React, { useState } from 'react';
import { Row, Col } from 'react-grid-system';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function StatusLogin() {
  const [input, setInput] = useState({
    number: '',
    otp: ''
  });

  const [error, setError] = useState({})
  const [generatedOtp, setGeneratedOtp] = useState(null); 
  const navigate = useNavigate();

  // Handle input changes
  const changeHandler = (e) => {
    const { name, value } = e.target;
    setInput((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const validate = ()=>{
    let newError = {};
    if(!input.number){
        newError.number="Enter Your Number "
    }
    else if(input.number.length != 10){
        newError.number = "Please Enetr valid 10 digit number"
    }
    setError(newError)
    return Object.keys(newError).length===0;
  }

  // Generate OTP
  const otpHandler = () => {
    if(validate()){if (!input.number) {
        alert("Enter Your Registered Mobile Number");
        return;
      }
      axios.post("http://localhost:5000/status", { number: input.number })
        .then((response) => {
          if (response.data.message === "Login Successful") {
            const randomOtp = Math.floor(1000 + Math.random() * 9000).toString();
            setGeneratedOtp(randomOtp);
            alert(`Your OTP is: ${randomOtp}`); 
          } else {
            alert("First Register Yourself");
            navigate("/login");
          }
        })
        .catch((error) => {
          console.error("There was an error!", error);
          alert("Register Yourself");
        });}
    
  };

  // Verify OTP
  const verifyOtp = (number) => {
    if (input.otp === generatedOtp) {
      alert("OTP verified successfully!"); 
      navigate(`/displayStatus/${number}`);
    } else {
      alert("Invalid OTP. Please try again.");
    }
  };

  return (
    <div style={{ backgroundColor: "rgb(220,220,220)" }} className="p-5">
      <Row>
        <Col sm={3}></Col>
        <Col sm={6} className="mb-4">
          <h2>Login to Check Status</h2>
        </Col>
        <Col sm={3}></Col>
      </Row>

      <Row className="p-4">
        <Col sm={2}></Col>
        <Col sm={8}>
          <Form style={{ backgroundColor: "white", borderRadius: "20px", marginBottom: "67px" }} className="p-5">
            <Form.Label className="mt-4"><h4>Enter Mobile Number</h4></Form.Label>
            <Row>
              <Col sm={9}>
                <Form.Control
                  type="number"
                  name="number"
                  value={input.number}
                  onChange={changeHandler}
                  className="shadow-lg border-primary mt-2"
                />
                {error.number && <span style={{color:"red"}}>{error.number}</span>}
              </Col>
              <Col sm={3}>
                <Button type="button" onClick={otpHandler} className="bg-success border-success shadow-lg">Get OTP</Button>
              </Col>
            </Row>

            <Form.Label className="mt-4"><h4>Enter OTP</h4></Form.Label>
            <Row>
              <Col sm={9}>
                <Form.Control
                  type="number"
                  name="otp"
                  value={input.otp}
                  onChange={changeHandler}
                  className="mt-2 shadow-lg border-primary"
                />
              </Col>
              <Col sm={3}>
                <Button type="button" onClick={() => verifyOtp(input.number)} className="bg-success border-success shadow-lg">Verify</Button>
              </Col>
            </Row>
          </Form>
        </Col>
        <Col sm={2}></Col>
      </Row>
    </div>
  );
}

export default StatusLogin;
