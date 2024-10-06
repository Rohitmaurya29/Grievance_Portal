import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import { Row, Col } from 'react-grid-system';
import Button from 'react-bootstrap/esm/Button';
import Modal from 'react-bootstrap/esm/Modal';
import AdminResolveForm from './AdminResolveForm';

function AdminDisplay() {
    const [input, setInput] = useState([]);
    const [show, setShow] = useState(false);
    const [selectedId, setSelectedId] = useState(null); 
    
    const closeHandler = () => setShow(false);


    useEffect(() => {
        axios.get("http://localhost:5000/display").then((response) => {
            console.log("Frontend data: ", response);
            setInput(response.data);
        });
    }, []);

    const solve = (id) => {
        setSelectedId(id); 
        setShow(true);     
    }

    const handleResolved = (id) => {
        axios.post("http://localhost:5000/resolve", { id }).then((response) => {
            setInput((prevInput) =>
                prevInput.map((item) =>
                    item._id === id ? { ...item, resolved: true } : item
                )
            );
            setShow(false);
        }).catch((err) => {
            console.log(err);
        });
    }

    const dlt=(id)=>{
        const confirmed = window.confirm("Are You sure want to delete");
        if(confirmed){
            axios.delete(`http://localhost:5000/delete/${id}`).then((response)=>{
                console.log(response.data)
            }).catch((err)=>{
                console.log(err)
            })
            window.location.reload(false);
        }
        
    }

    return (
        <div className="container-fluid p-4" style={{ backgroundColor: "lightgrey" }}>
            <Row>
                <Col sm={12}>
                    <h3 className="text-center mb-4">Public Grievances</h3>
                </Col>
            </Row>

            <Row>
                <Col sm={12}>
                    <div className="table-responsive">
                        <Table striped bordered hover className="shadow-lg">
                            <thead className="thead-dark">
                                <tr>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Gender</th>
                                    <th>Age</th>
                                    <th>Mobile Number</th>
                                    <th>Adhaar Number</th>
                                    <th>File</th>
                                    <th>Actions</th>
                                    <th>Review</th>
                                </tr>
                            </thead>
                            <tbody>
                                {input.map((data, index) => (
                                    <tr key={index}>
                                        <td>{data.name}</td>
                                        <td>{data.email}</td>
                                        <td>{data.gender}</td>
                                        <td>{data.age}</td>
                                        <td>{data.mob}</td>
                                        <td>{data.adhaar}</td>
                                        <td>{data.file?
                                            (<a href={`http://localhost:5000/${data.file.replace('/uploads', 'uploads')}`}
                                                target='_blank'
                                                rel='noopenre noreferrer'
                                            >Open File</a>):("No file")}
                                        </td>
                                        <td>
                                            {data.AdminFile ? (
                                                <a 
                                                    href={`http://localhost:5000/${data.AdminFile.replace('/uploads', 'uploads')}`}
                                                    target='_blank'
                                                    rel='noopener noreferrer'
                                                >
                                                    Open File
                                                </a>
                                            ) : ("Pending...")}
                                        </td>
                                        <td>{data.review || "Pending..."}</td>
                                        <td>
                                            {data.resolved ? (
                                                <span className='text-success'>Resolved</span>
                                            ) : (
                                                <Button 
                                                    type='button' 
                                                    className='bg-success border-success' 
                                                    onClick={() => solve(data._id)}
                                                >
                                                    Solve
                                                </Button>
                                            )}
                                        </td>
                                        <td>
                                            <Button type='button' onClick={()=>dlt(data._id)} className='bg-danger border-danger'>Delete</Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </div>
                </Col>

                <Row>
                    <Col sm={1}></Col>
                    <Col sm={10}>
                        <Modal show={show} onHide={closeHandler}>
                            <Modal.Header closeButton>
                                <Modal.Title>Solve Public Query</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                {selectedId && <AdminResolveForm id={selectedId} onResolve={handleResolved} />} 
                            </Modal.Body>
                        </Modal>
                    </Col>
                    <Col sm={1}></Col>
                </Row>
            </Row>
        </div>
    );
}

export default AdminDisplay;
