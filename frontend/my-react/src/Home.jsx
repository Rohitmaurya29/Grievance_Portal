import React from 'react'
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Carousel from 'react-bootstrap/Carousel';
import Dropdown from 'react-bootstrap/Dropdown';
import { useNavigate } from 'react-router-dom';
import naukari from './Images/naukari.webp';
import job from './Images/job.png';
import temple from './Images/temple.jpeg';
import village from './Images/village.jpeg';
import valley from './Images/valley.jpg';
import grievance from './Images/nght.jpg';
import kimage from './Images/kimage.jpg';
import group from './Images/group.jpg'
import helping from './Images/hlp.avif'
import support from './Images/sprt.webp'
import mountain from './Images/Mountain.png'


function Home() {
    
  return (
        
    //   <Carousel className='mt-5' style={{maxWidth:"1500px", margin:"0 auto", height:"100%"}}>
    //     <Carousel.Item className='item'>
    //         <img src={kimage} alt='naukari' className='d-block ' style={{height:"100%"}}/>
    //     </Carousel.Item>
    //     <Carousel.Item className='item'>
    //         <img src={valley} alt='job' className='d-block ' style={{height:'100%'}}/>
    //     </Carousel.Item>

    //     <Carousel.Item className='item'>
    //         <img src={temple} alt='temple' className='d-block' style={{height:'100%'}}/>
    //     </Carousel.Item>

    //     <Carousel.Item className='item'>
    //         <img src={village} alt='village' className='d-block' style={{height:'100%'}}/>
    //     </Carousel.Item>
    //   </Carousel>
    <Carousel style={{width:"100%", overflow:"hidden", fontFamily:"sans-serif", fontSize:"35px"}}>
        <Carousel.Item>
            <img src={grievance} alt='village' style={{height:"83vh", width:"100%"}} className='cimg'/>
            <Carousel.Caption>Welcome to the <b>Mountain Portal</b></Carousel.Caption>
        </Carousel.Item>

        <Carousel.Item>
            <img src={helping} alt='village' style={{height:"83vh", width:"100%"}} className='cimg'/>
            <Carousel.Caption>Always here to help you</Carousel.Caption>
        </Carousel.Item>

        <Carousel.Item>
            <img src={support} alt='village' style={{height:"83vh", width:"100%"}} className='cimg'/>
            <Carousel.Caption>Support like a Family</Carousel.Caption>
        </Carousel.Item>

        <Carousel.Item>
            <img src={group} alt='village' style={{height:"83vh", width:"100%"}} className='cimg'/>
            <Carousel.Caption>How we work on your Grievance</Carousel.Caption>
        </Carousel.Item>
    </Carousel>
    
  )
}

export default Home
