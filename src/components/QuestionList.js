import { useState, useEffect } from 'react'
import axios from "axios";
import { Link } from "react-router-dom";
import Question from './Question';
 
const QuestionList = () => {
    const [questions, setQuestions] = useState([]);
    

    useEffect(() => {
        getQuestions();
    }, []);

    const getQuestions = async () => {
        const response = await axios.get('http://localhost:5000/queueoverflow/questions');
        let lst = [];
        for (let i = 0; i < response.data.length; i++){
            const addInfo = await getQuestionAnswerById(response.data[i].QuestionAnswerID);
            const user = await getUserById(addInfo.UserID);
            lst.push({ ...response.data[i], Date : addInfo.Date, UserAnswering : addInfo.UserID, user : user.Username})
        }
        setQuestions(lst);
        console.log(lst)
    }

    const getQuestionAnswerById = async (id) => {
        const response = await axios.get(`http://localhost:5000/queueoverflow/questionAnswers/${id}`);
        return response.data;    
    }

    const getUserById = async (id) => {
        const response = await axios.get(`http://localhost:5000/queueoverflow/users/${id}`);
        return response.data;    
    }


    return (
        <div>
            {
                questions.map((question) => (
                    <Question key={question.QuestionID} question={question.Title} description={question.Description} tag={question.Tag} user={question.user} date={question.Date} />
                ))
            }
        </div>
    )
}
 
export default QuestionList