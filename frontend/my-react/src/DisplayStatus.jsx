import React, { useEffect, useState } from 'react';
import { Row, Col } from 'react-grid-system';
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import { useParams } from 'react-router-dom';

function DisplayStatus() {
    const [input, setInput] = useState([]);
    const { number } = useParams(); // Extract mobile number from the URL

    useEffect(() => {
        // Fetch user data based on mobile number
        axios.get(`http://localhost:5000/displayStatus/${number}`)
            .then((response) => {
                setInput([response.data]); // response.data will be an object, wrap it in an array for table rendering
            })
            .catch((error) => {
                console.error(error);
                alert("No data found for this number.");
            });
    }, [number]); // Fetch data when component mounts and when number changes

    const set= ()=>input.map((data)=>{
        return data
    })

    return (
        <div style={{backgroundColor:"rgb(220,220,220)", padding:"58px 100px 150px 100px", fontFamily:"sans-serif"}}>
            {/* <Row>
                <Col sm={4}></Col>
                <Col sm={4}><h4>Your Status</h4></Col>
                <Col sm={4}></Col>
            </Row>

            <Row>
                <Col sm={12}>
                    <div className='table-responsive'>
                        <Table striped bordered hover className="shadow-lg">
                            <thead className="thead-dark">
                                <tr>
                                    <td>Name</td>
                                    <td>Mobile Number</td>
                                    <td>Registration Number</td>
                                    <td>Query</td>
                                    <td>Action</td>
                                    <td>Review</td>
                                </tr>
                            </thead>
                            <tbody>
                                {/* Show data once loaded */}
                                {/* {input.map((data, index) => (
                                    <tr key={index}>
                                        <td>{data.name}</td>
                                        <td>{data.mob}</td>
                                        <td>{data.registrationNumber}</td>
                                        <td>{data.file || "N/A"}</td>
                                        <td>{data.AdminFile || "N/A"}</td>
                                        <td>{data.review || "N/A"}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </div>
                </Col> */}
            {/* // </Row> */} 
            <Row>
                <Col sm={4}></Col>
                <Col sm={4}>{input.map((data)=>{
                    return (
                        <h2>{data.name}'s Status</h2>
                    )
                })} </Col>
                <Col sm={4}></Col>
            </Row>
            <Row className=''>
                <Col sm={2}></Col>
                <Col sm={8}>
            <Table  striped bordered hover className="shadow-lg mt-5" style={{textAlign:"center", borderRadius:"20px"}}>
                <tbody>
                    {input.map((data)=>{
                        return(
                            <>
                            <tr>
                                <td>Name</td>
                                <td>{data.name}</td>
                            </tr>
                            <tr>
                                <td>E-mail</td>
                                <td>{data.email}</td>
                            </tr>

                            <tr>
                                <td>Registration Number</td>
                                <td>{data._id}</td>
                            </tr>

                            <tr>
                                <td>Mobile Number</td>
                                <td>{data.mob}</td>
                            </tr>
                            <tr>
                                <td>Query Raised</td>
                                <td>{data.file? (
                                    <a href={`http://localhost:5000/${data.file.replace("/uploads", "uploads")}`}
                                    target='blank' rel='noopener noreferrer'>Open File</a>
                                ):("No File")}</td>
                            </tr>

                            <tr>
                                <td>Action</td>
                                <td>{data.AdminFile? (
                                    <a href={`http://localhost:5000/${data.AdminFile.replace('/uploads', 'uploads')}`}
                                    target='blank'
                                    rel='noopener noreferrer'>Open File</a>
                                ):("Pending...") }</td>
                            </tr>

                            <tr>
                                <td>Review</td>
                                <td>{data.review || "Pending..."}</td>
                            </tr>
                            </>
                        )
                    })}
                </tbody>
            </Table>
            </Col>
            <Col sm={2}></Col>
            </Row>
        </div>
    );
}

export default DisplayStatus;
