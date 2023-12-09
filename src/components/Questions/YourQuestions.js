import { useState, useEffect, useContext } from 'react'
import axios from "axios";
import { Link } from "react-router-dom";
import Question from './Question';
import { useWindowDimensions } from './../getWindowDimensions'
import Navbar from "./../Navbar";
import { Input, useColorModeValue, Image, Button, Text, Icon, Heading } from '@chakra-ui/react';
import { FaArrowDownShortWide } from "react-icons/fa6";
import { FaArrowDownWideShort } from "react-icons/fa6";
import { BsSearch } from "react-icons/bs";
import { UserContext } from "./../../UserContext";
import YourQuestionsList from './YourQuestionsList';

function getHeight(height){
  return height-72;
}

const YourQuestions = (props) => {
    const user = useContext(UserContext);
    
    const { height, width } = useWindowDimensions();

    return (
      <div>
        <Navbar/>
        <div style={{
          position: 'relative',
          height: getHeight(height),
          width: "80%",
          marginTop: "80px",
          alignItems:'center',
          justifyContent:'center',
          marginLeft: "10%",
          marginRight: "10%",
        }}>
            {
                user && (
                    <YourQuestionsList setLastPage={props.setLastPage}/>
                )
            }
          {
                !user && (
                  <div style={{
                      display: "flex",
                      flexDirection: "column",
                      
                  }}>
                      <Image
                          alt="not logged in gif"
                          w={'auto'}
                          h={"xs"}
                          src={require("../../assets/google-login.gif")}
                          alignSelf={"center"}
                          marginBottom={"30px"}
                      />
                      <Heading 
                          fontSize={"2xl"}
                          fontWeight={"500"}
                          textAlign={"center"}
                          marginBottom={"30px"}
                      >
                          You are not logged in !
                      </Heading>
                      <Heading
                          fontSize={"2xl"}
                          fontWeight={"500"}
                          textAlign={"center"}
                          marginBottom={"30px"}
                      >
                          Please consider <Link style={{color:"#FF7F50"}} to={"/signin"}>
                              Loggin in
                          </Link> or <Link style={{color:"#FF7F50"}} to={"/register"}>
                              Registering
                          </Link> to see your questions.
                      </Heading>
                  </div>

              )
          }
        </div>
    </div>
    )
}
export default YourQuestions;