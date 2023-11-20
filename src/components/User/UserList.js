import { useState, useEffect } from 'react'
import axios from "axios";
import { Link } from "react-router-dom";
import {SideBar} from './../Sidebar'
import Navbar from "./../Navbar";
import { useWindowDimensions } from './../getWindowDimensions'

function getWidth(width){
    if (width > 800){
      return "75%"
    }
    else{
      return `${width-150}px`
    }
  
  }
  
  function getLeft(width){
    if (width > 800){
      return "25%"
    }
    else{
      return "150px"
    }
  
  }

  function getHeight(height){
    return height-72;
  }

const UserList = () => {
  const { height, width } = useWindowDimensions();
  return (
    <div>
      <Navbar/>
      <SideBar display={{md: 'unset' }} />
      <div style={{
          position: 'relative',
          height: getHeight(height),
          marginLeft: getLeft(width),
          width: getWidth(width),
          marginTop: "80px",
          alignItems:'center',
          justifyContent:'center',
          }}>
          <h1 style={{
              fontSize: '40px',
              marginTop:'130px',
              marginLeft:'10px',
              marginBottom: '25px',
          }}>
              User list
          </h1>
          <div style={{
            marginLeft:'10px',
            marginBottom: '50px',
            border: '1px solid #777777',
            borderRadius: '4px',
            height:'1px',
            width:'50%',
          }}></div>
        </div>
    </div>
  )
}

export default UserList