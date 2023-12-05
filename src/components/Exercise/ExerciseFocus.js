import { useState, useEffect } from 'react'
import axios from "axios";
import BigExercise from './BigExercise';
import Navbar from "./../Navbar";
import { useWindowDimensions } from './../getWindowDimensions'

function getHeight(height){
    return height-72;
  }
  
const ExerciseFocus = (props) => {
    const [exercise, setExercise] = useState({});
    
    useEffect(() => {
        // get parameter from url
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const id = urlParams.get('id')
        getQuestionById(id);
        props.setLastPage(`/exercise?id=${id}`);
    }, []);

    const completeExercise = async (e) => {
        const user = await getUserById(e.UserID);
        setExercise({ exerciseID:e.ExerciseID,codeAnswer:e.CodeAnswer, description:e.Description,tag:e.Tag, date : e.Date, user : user.Username})
    }

    const getQuestionById = async (id) => {
        const response = await axios.get(`http://localhost:5000/queueoverflow/exercises/${id}`);
        completeExercise(response.data);
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
                marginTop: "100px",
                alignItems:'center',
                justifyContent:'center',
                marginLeft: "10%",
                marginRight: "10%",
            }}>
                { exercise.exerciseID &&
                    <BigExercise {...exercise} />
                }
            </div>
        </div>
    )
}

export default ExerciseFocus  ;