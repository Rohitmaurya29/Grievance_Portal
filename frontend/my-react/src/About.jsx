import React from 'react'
import {Row, Col} from 'react-grid-system';
import gov from './Images/Mountain.png'

function About() {
  return (
    <div style={{fontFamily:"sans-serif", backgroundColor:"gainsboro", width:"100%", alignItems:"center"}}>
      <Row>
        <Col sm={4.5}></Col>
        <Col sm={3}  className='mt-5'>
            <img src={gov} alt='gov' style={{height:"100%", width:'100%', borderRadius:"50%"}}/>
        </Col>
        <Col sm={4.5}></Col>
      </Row>
      

      <Row>
        <Col sm={2}></Col>
        <Col className='mt-4' style={{marginBottom:"45px"}} sm={8}>
            <h5><i><b>Mountain Portal</b></i> is designed and Developed by <b>Rohit Maurya</b> from scratch to final level. This is an online system designed to streamline the process of submitting, tracking, and resolving complaints or grievances within an organization or community. This web-based portal enables users (citizens, employees, or customers) to lodge complaints, track their status, and view resolutions. It also provides administrators (such as the management team or a grievance redressal team) with tools to manage, resolve, and update complaints efficiently.</h5>
        </Col>
        <Col sm={2}></Col>
      </Row>
    </div>
  )
}

export default About
