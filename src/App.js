import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import QuestionList from "./components/Questions/QuestionList";
import ExerciseList from "./components/Exercise/ExerciseList";
import Home from "./components/Home";
import { ChakraProvider } from '@chakra-ui/react'
import UserList from "./components/User/UserList";
import QuestionFocus from "./components/Questions/QuestionFocus";
import { useState } from 'react'


function App() {
  const [username, setUsername] = useState('');

  return (
    <ChakraProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/questions" element={<QuestionList/>}/>
          <Route path="/users" element={<UserList/>}/>
          <Route path="/exercise" element={<ExerciseList/>}/>
          <Route path="/question" element={<QuestionFocus/>}/>
        </Routes>
      </Router>
    </ChakraProvider>
  );
}

export default App;