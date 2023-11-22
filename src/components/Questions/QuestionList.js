import { useState, useEffect } from 'react'
import axios from "axios";
import { Link } from "react-router-dom";
import Question from './Question';
import { useWindowDimensions } from './../getWindowDimensions'
import {SideBar} from './../Sidebar'
import Navbar from "./../Navbar";
import { Input, useColorModeValue } from '@chakra-ui/react';

  function getHeight(height){
    return height-72;
  }

const QuestionList = () => {
    const [questions, setQuestions] = useState([]);

    useEffect(() => {
        getQuestions("");
    }, []);

    const completeQuestion = async (response) => {
      let lst = [];
      for (let i = 0; i < response.data.length; i++){
          const addInfo = await getQuestionAnswerById(response.data[i].QuestionAnswerID);
          const user = await getUserById(addInfo.UserID);
          lst.push({ ...response.data[i], Date : addInfo.Date, UserAnswering : addInfo.UserID, user : user.Username})
      }
      setQuestions(lst);
    }

    const getQuestions = async (description) => {
        if (description==="") {
          const response = await axios.get('http://localhost:5000/queueoverflow/questions');
          completeQuestion(response);
        }
        else {
          const response = await axios.get(`http://localhost:5000/queueoverflow/questions/search/${description}`);
          console.log(response);
          completeQuestion(response);
        }
          
    }

    const getQuestionAnswerById = async (id) => {
        const response = await axios.get(`http://localhost:5000/queueoverflow/questionAnswers/${id}`);
        return response.data;    
    }

    const getUserById = async (id) => {
        const response = await axios.get(`http://localhost:5000/queueoverflow/users/${id}`);
        return response.data;    
    }
    const { height, width } = useWindowDimensions();

    const [searchValue, setSearchValue] = useState('');

    function handleSearch(key) {
      if (key.keyCode === 13) {
        if (getQuestions!=null){
          getQuestions(searchValue);
        }
      }
    }  

    return (
      <div>
        <Navbar getQuestions={getQuestions}/>
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
            <Input
              margin={"10px"}
              marginTop={"50px"}
              height={"50px"}
              maxW="100%"
              placeholder="Search..."
              borderColor={useColorModeValue('black.300', 'white')}
              borderRadius="5px"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              onKeyDown={(e) => {handleSearch(e)}}
            />
          {
              questions.map((question) => (
                  <Question key={question.QuestionID} question={question.Title} description={question.Description} tag={question.Tag} user={question.user} date={question.Date} />
              ))
          }

        </div>
      </div>
    )
}
export default QuestionList;