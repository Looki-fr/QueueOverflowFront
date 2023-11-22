import { useState, useEffect } from 'react'
import axios from "axios";
import { Link } from "react-router-dom";
import Question from './Question';
import { useWindowDimensions } from './../getWindowDimensions'
import {SideBar} from './../Sidebar'
import Navbar from "./../Navbar";

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

    return (
      <div>
        <Navbar getQuestions={getQuestions}/>
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
            Questions list
          </h1>
          <div style={{
            marginLeft:'10px',
            marginBottom: '50px',
            border: '1px solid #777777',
            borderRadius: '4px',
            height:'1px',
            width:'50%',
          }}></div>
          
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