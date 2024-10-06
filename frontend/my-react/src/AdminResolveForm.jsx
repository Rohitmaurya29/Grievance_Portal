import React, { useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';

function AdminResolveForm({ id, onResolve }) {  
    const [input, setInput] = useState({
        review: "",
        AdminFile: null  
    });

    const [reg, setReg] = useState("");

    useEffect(() => {
        if (id) {
            
            axios.get(`http://localhost:5000/display/${id}`).then((response) => {
                console.log("Fetched data: ", response.data);
                setReg(response.data._id);  
            }).catch((err) => {
                console.error(err);
            });
        }
    }, [id]);  

    const inputHandler = (e) => {
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
            AdminFile: e.target.files[0]  
        }));
    };
    

    const submitHandler = () => {
        const formData = new FormData();
        formData.append('review', input.review);
        formData.append('registrationNumber', reg);
    
        if (input.AdminFile) {  
            formData.append("AdminFile", input.AdminFile);
            console.log("AdminFile being sent:", input.AdminFile); 
        }
    
        // Make the PUT request
        axios.put(`http://localhost:5000/update/${id}`, formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        })
        .then((response) => {
            console.log("Updated Data: ", response.data);
            onResolve(id);
            // window.location.reload(false);  
        })
        .catch((err) => {
            console.error("Update Error: ", err.response ? err.response.data : err);  
        });
        // window.location.reload(false)
        setInput({
            review:"",
            AdminFile:""
        })
    };
    
    
    

    return (
        <div>
            <Form>
                <Form.Control 
                    type='text' 
                    placeholder='Registration Number' 
                    value={reg} 
                    className='mt-2' 
                    name='registrationNumber' 
                    readOnly
                />
                <Form.Control 
                    as='textarea' 
                    onChange={inputHandler} 
                    placeholder='Review...' 
                    value={input.review} 
                    className='mt-2' 
                    name='review'
                />
                <Form.Control 
                    type='file' 
                    onChange={fileHandler} 
                    className='mt-2' 
                    name='AdminFile'  
                />
                <Button type='button' className='bg-success mt-2' onClick={submitHandler}>Submit</Button>
            </Form>
        </div>
    );
}

export default AdminResolveForm;
