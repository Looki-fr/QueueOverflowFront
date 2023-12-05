import { useState, useEffect } from 'react'
import Navbar from "./../Navbar";
import axios from "axios";
import { Link } from "react-router-dom";
import Exercise from './Exercise';
import { useWindowDimensions } from './../getWindowDimensions'
import { Input, useColorModeValue, Image, Button, Text, Icon } from '@chakra-ui/react';
import { FaArrowDownShortWide } from "react-icons/fa6";
import { FaArrowDownWideShort } from "react-icons/fa6";
import { BsSearch } from "react-icons/bs";

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

const ExerciseList = (props) => {
  const [exercises, setExercises] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [loaded, setLoaded] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState("Dates");
  const [order, setOrder] = useState("Ascending");

  useEffect(() => {
    // get parameter from url
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const description = urlParams.get('search')
    setSearchValue(description || "")
    getExercises(description || "");
  }, []);

  const getUserById = async (id) => { 
    const response = await axios.get(`http://localhost:5000/queueoverflow/users/${id}`);
    return response.data;
  }

  const completeExercise = async (response) => {
    let lst = [];
    for (let i = 0; i < response.data.length; i++){
      const user = await getUserById(response.data[i].UserID);
      lst.push({ ...response.data[i], user : user.Username})
    }
    setExercises(lst);
    setLoaded(true);
  }

  const getExercises = async (description) => {
    setLoaded(false);
    if (description==="") {
      const response = await axios.get('http://localhost:5000/queueoverflow/exercises');
      completeExercise(response);
    }
    else {
      const response = await axios.get(`http://localhost:5000/queueoverflow/exercises/search/${description}`);
      completeExercise(response);
    }

  }

  function handleSearch(key) {
    if (key.keyCode === 13) {
      if (getExercises!=null){
        getExercises(searchValue);
        props.setLastPage(`/exercises?search=${searchValue}`);
      }
    }
  }

  function sortExercises(){
    const lst = exercises.splice(0)
    if (order==="Ascending"){
      lst.sort((a, b) => (a.Date > b.Date) ? 1 : -1)
    }
    else{
      lst.sort((a, b) => (a.Date < b.Date) ? 1 : -1)
    }
    setExercises(lst);
  }

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
        <div style={{
          marginTop: "150px",
          marginBottom: "50px",
          marginLeft:"10px",
          alignItems:'center',
          display: "flex",
          flexDirection: "row",
        }}>
          <Input
            height={"50px"}
            marginRight={"25px"}
            marginTop={"0px"}
            maxW="40%"
            placeholder="Search..."
            borderColor={useColorModeValue('black.300', 'white')}
            borderRadius="30px"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            onKeyDown={(e) => {handleSearch(e)}}
            fontSize={{ base: '12px', md: '16px', lg: '18px' }}
            marginBottom={"0px"}
            zIndex={"0"}
          />
          <div onClick={() => getExercises(searchValue)} style={{
            marginRight:"30px",
            paddingTop:"5px",
          }}>
            <Icon
              as={BsSearch}
              cursor="pointer"
              w={"30px"}
              h={"30px"}
            />
          </div>
          <Button 
              margin={"0px"} 
              alignSelf={"center"} 
              height={"45px"} 
              fontSize={{ base: '12px', md: '16px', lg: '18px' }} 
              color="#fff" 
              mr="30" 
              rounded="md" 
              bg="#FFA500" 
              _hover={{ bg: '#FF7F50' }}
              onClick={()=>sortExercises()}
              >
            Filter
          </Button>
          <div onClick={() => setSelectedFilter("Dates")} style={{
            marginRight:"30px"
          }}>
            <Text 
              cursor={"pointer"} 
              fontSize={"20px"} 
              color={selectedFilter==="Dates" ? "black" : "grey"} 
              fontWeight={"500"}
            >Dates</Text>
          </div>
          <div onClick={() => setOrder("Ascending")} 
            style={{
              paddingTop:"5px",
              marginRight:"30px"
            }}>
              <Icon 
                as={FaArrowDownShortWide} 
                cursor="pointer"
                color={order==="Ascending" ? "black" : "grey"}
              />
          </div>
          <div onClick={() => setOrder("Descending")} 
            style={{
              paddingTop:"5px",
             
            }}>
            <Icon 
              as={FaArrowDownWideShort} 
              cursor="pointer"
              color={order==="Descending" ? "black" : "grey"}
            />
          </div>

        </div>
        {
            exercises.map((question) => (
                <Exercise key={question.ExerciseID} tag = {question.Tag} id={question.ExerciseID} description={question.Description} user={question.user} date={question.Date} />
            ))
        }
        {
          exercises.length !== 0 && loaded && (
            <div style={{
              height: "100px",
            }}/>
          )
        }
        {
          exercises.length === 0 && loaded && (
            <div style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}>
              <Image
                src={require("../../assets/no_questions.gif")}
                alt="No exercises found"
                width="50%"
                height="50%"
              />
              <h1 style={{
                fontSize: "24px",
                fontWeight: "500",
                textAlign: "center",
                marginBottom: "15px",
                marginLeft:"0px",
                marginRight:"0px",
                marginTop:"0px",
              }}>
                No exercises found
              </h1>
              <h1 style={{
                fontSize: "24px",
                fontWeight: "500",
                textAlign: "center",
                marginBottom: "15px",
                marginLeft:"0px",
                marginRight:"0px",
                marginTop:"0px",
              }}>
                Try another search or <Link to="/askQuestion" style={{color:"#FF7F50"}}>
                  ask it !
                </Link>
              </h1>

            </div>
          )
        }

      </div>
    </div>
  )
}

export default ExerciseList