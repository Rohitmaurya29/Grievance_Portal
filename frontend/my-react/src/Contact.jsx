import React from 'react'
import { Row, Col } from 'react-grid-system'
import Button from 'react-bootstrap/Button'
import Table from 'react-bootstrap/Table';

function Contact() {
  return (
    <div style={{width:"100%"}}>
      <Row className='mt-4' style={{ fontFamily: "sans-serif" }}>
        <Col sm={2}></Col>
        <Col sm={8}>
          <Table style={{ borderRadius: "10px" }} striped bordered hover variant="zoom">
            <tbody>
              <tr className=''>
                <td><b>Type</b></td>
                <td>Government</td>
              </tr>

              <tr>
                <td><b>Website</b></td>
                <td><a href='/'>Home</a></td>
              </tr>

              <tr>
                <td><b>E-mail</b></td>
                <td><a href='mailto:rohith2919maurya@gmail.com'>rohith2919maurya@gmail.com</a></td>
              </tr>

              <tr>
                <td><b>Mobile no.</b></td>
                <td>+91 7510097007</td>
              </tr>
            </tbody>
          </Table>
        </Col>
        <Col sm={2}></Col>
      </Row>

      <Row>
        <Col sm={1}></Col>
        <Col sm={10}>
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14234.304617718268!2d81.00401225140868!3d26.885204126613555!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x399be29e714091e1%3A0xa1834bf7743dc386!2sHarihar%20Nagar%2C%20Kamta%2C%20Lucknow%2C%20Uttar%20Pradesh%20226028!5e0!3m2!1sen!2sin!4v1728122341573!5m2!1sen!2sin" 
            width="100%" 
            height="395" 
            style={{ border: 0 }} 
            allowFullScreen 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </Col>
        <Col sm={1}></Col>
      </Row>
    </div>
  )
}

export default Contact
