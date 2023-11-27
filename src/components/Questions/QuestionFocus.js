import { useState, useEffect } from 'react'
import axios from "axios";
import Question from './Question';
import Navbar from "./../Navbar";
import { useWindowDimensions } from './../getWindowDimensions'

function getHeight(height){
    return height-72;
  }
  
const QuestionFocus = (props) => {
    const [question, setQuestion] = useState({});
    
    useEffect(() => {
        // get parameter from url
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const id = urlParams.get('id')
        console.log("ID: " + id)
        getQuestionById(id);
    }, []);

    const completeQuestion = async (q) => {
        const addInfo = await getQuestionAnswerById(question.QuestionAnswerID);
        const user = await getUserById(addInfo.UserID);
        console.log(q, addInfo, user)
        setQuestion({ id:q.QuestionAnswerID,question:q.Title, description:q.Description,tag:q.Tag, date : addInfo.Date, user : user.Username})
      }

    const getQuestionById = async (id) => {
        const response = await axios.get(`http://localhost:5000/queueoverflow/questions/${id}`);
        completeQuestion(response.data);
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
                <Question {...question} />
            </div>
        </div>
    )
}

export default QuestionFocus;