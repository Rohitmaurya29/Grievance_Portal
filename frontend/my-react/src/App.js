import logo from './logo.svg';
import './App.css';
import Home from './Home';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Registration from './Registration';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Row, Col } from 'react-grid-system'
import Login from './Login';
import himanchal from './Images/himanchal.png'
import gov from './Images/Mountain.png'
import About from './About';
import Contact from './Contact';
import AdminDisplay from './AdminDisplay';
import AdminLogin from './AdminLogin';
import { counterContext } from './CreateContext';
import StatusLogin from './StatusLogin';
import { useEffect, useState } from 'react';
import DisplayStatus from './DisplayStatus';

function App() {
  const navigate = useNavigate();
  const [show, setShow] = useState(false)
  const [loggedIn, setLoggedIn]= useState(false);

  useEffect(()=>{
    const adminLoggedIn = localStorage.getItem('loggedIn');
    setLoggedIn(adminLoggedIn==='true')
  },[])

  const handleLogout=()=>{
    const confirmed= window.confirm("Are You sure want to logout")
    if(confirmed){
      localStorage.removeItem('loggedIn');
      setLoggedIn(false);
      navigate("/")
    }
   
  }
  return (
    <div className="App">
      {/* <Row className='mb-1 mt-1 pb-1 pt-2'>
        <Col sm={0.5}></Col>
          <Col sm={4} >
          <div  style={{height:"100%", width:"70px"}} className='border border-warning'>
          <img src={himanchal} alt='himanchal' style={{width:"100%", height:"100%"}}/>
          </div>
            
          </Col>
          <Col sm={1}></Col>
          <Col sm={1} className='pt-3'>
            <a href='/contact' style={{textDecoration:"none"}}>Contact Us</a>
          </Col>
          <Col sm={1} className='pt-3'>
            <a href='/' style={{textDecoration:"none"}}>Home</a>
          </Col>

          <Col sm={1} className='pt-3'>
            <a href='/about' style={{textDecoration:"none"}}>About Us</a>
          </Col>

          <Col sm={1} className='pt-3'>
            <a href='/status' style={{textDecoration:"none"}}>Check Status</a>
          </Col>

          <Col sm={1} className='pt-3'>
            <a href='/login' style={{textDecoration:"none"}}>Register</a>
          </Col>

          <Col sm={1} className='pt-2'>
            <Button type='button' onClick={()=>{navigate("/admin")}} style={{backgroundColor:"rgb(239,207,80)", borderColor:"rgb(239,207,80)", color:"black"}}>Admin</Button>
          </Col>
          <Col sm={0.5}></Col>
      </Row> */}
    <div className='container-fluid' style={{backgroundColor:"rgb(57,143,182)", paddingTop:"4px", paddingBottom:"2px"}}>
      <Row style={{alignItems:"center"}} className="pt-2 pb-2">
        {/* <Col sm={0.5}></Col> */}
        <Col sm={2} style={{height:"100px", width:"50%"}}>
          <img src={gov} alt='gov' className='border '  style={{ width: "45%", height: "100%", borderRadius:"50%"}} onClick={()=>{navigate("/about")}}/>
        </Col>
        <Col sm={1}></Col>
        <Col sm={1.5}>
          <a href='/' style={{textDecoration:"none", fontSize:'22px', color:"white"}}>Home</a>
        </Col>
        <Col sm={1.5}>
          <a href='/about' style={{textDecoration:"none", fontSize:'22px', color:"white"}}>About</a>
        </Col>
        <Col sm={1.5}>
          <a href='/contact' style={{textDecoration:"none", fontSize:'22px', color:"white"}}>Contact</a>
        </Col>
        <Col sm={1.5}>
        <a href='/checkStatus' style={{textDecoration:"none", fontSize:'22px', color:"white"}}>Status</a>        </Col>
        <Col sm={1.5}>
          <a href='/login' style={{textDecoration:"none", fontSize:'22px', color:"white"}}>Register</a>
        </Col>
        <Col sm={1.5}>
        {loggedIn?(
          <Button type='button' onClick={handleLogout} style={{fontSize:"22px", color:"white"}} className='bg-danger border-danger shadow-lg'>Logout</Button>
        ):(
          <Button type='button' style={{fontSize:"22px", color:"black"}} className='bg-info border-info shadow-lg' onClick={()=>{navigate("/adminLogin")}}>Admin</Button>
        )}
        </Col>
        {/* <Col sm={1}></Col> */}
      </Row>
      </div>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path="/registration/" element={<Registration/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/about' element={<About/>}/>
        <Route path='/contact' element={<Contact/>}/>
        <Route path='/display' element={<AdminDisplay/>}/>
        <Route path='/adminLogin' element={<AdminLogin/>}/>
        <Route path='/checkStatus' element={<StatusLogin/>}/>
        <Route path='/displayStatus/:number' element={<DisplayStatus/>}/>
      </Routes>
      
    </div>
  );
}

export default App;
