import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import QuestionList from "./components/Questions/QuestionList";
import YourQuestions from "./components/Questions/YourQuestions";
import Home from "./components/Home";
import { ChakraProvider } from '@chakra-ui/react'
import QuestionFocus from "./components/Questions/QuestionFocus";
import { useEffect, useState } from 'react'
import SignIn from "./components/SignRegister/SignIn";
import Register from "./components/SignRegister/Register";
import { UserContext } from "./UserContext";
import { LastPageContext } from "./LastPageContext";
import Redirect from "./components/Redirect";
import AskQuestion from "./components/Questions/AskQuestion";
import ExerciseList from "./components/Exercise/ExerciseList";
import ExerciseFocus from "./components/Exercise/ExerciseFocus";
import PostExercise from "./components/Exercise/PostExercise";
import {ExerciseRedirect}from "./components/Exercise/ExerciseRedirect";
import axios from "axios";
import { QuestionRedirect } from "./components/Questions/QuestionRedirect";
function App() {
  const [user, setUser] = useState('');
  const [lastPage, setLastPage] = useState('/home');

  useEffect(() => {
    console.log(lastPage)
  }, [lastPage]);

  // async function initUser() {
  //   await axios.get(`http://localhost:5000/queueoverflow/currentUserId`)
  //   .then((response) => {
  //     console.log(response)
  //     if (response.data) {
  //       setUser(response.data);
  //     }
  //   })
  //   .catch((error) => {
  //     console.log(error);
  //   });
  // }

  // useEffect(() => {
  //   initUser();
  // }, []);

  return (
    <LastPageContext.Provider value={lastPage}>
      <UserContext.Provider value={user}>
        <ChakraProvider>
          <Router>
            <Routes>
              <Route path="/" element={<Home setLastPage={setLastPage}/>}/>
              <Route path="/questions" element={<QuestionList setLastPage={setLastPage}/>}/>
              <Route path="/question" element={<QuestionFocus setLastPage={setLastPage}/>}/>
              <Route path="/signin" element={<SignIn setUser={setUser} setLastPage={setLastPage}/>}/>
              <Route path="/register" element={<Register setUser={setUser} setLastPage={setLastPage}/>}/>
              <Route path="/askQuestion" element={<AskQuestion setLastPage={setLastPage}/>}/>
              <Route path="*" element={<Redirect setLastPage={setLastPage}/>}/>
              <Route path="/exercises" element={<ExerciseList setLastPage={setLastPage}/>}/>
              <Route path="/exercise" element={<ExerciseFocus setLastPage={setLastPage}/>}/>
              <Route path="/postExercise" element={<PostExercise setLastPage={setLastPage}/>}/>
              <Route path="/exerciseLink" element={<ExerciseRedirect setLastPage={setLastPage}/>}/>
              <Route path="yourQuestions" element={<YourQuestions setLastPage={setLastPage}/>}/>
            </Routes>
          </Router>
        </ChakraProvider>
      </UserContext.Provider>
    </LastPageContext.Provider>
  );
}

export default App;