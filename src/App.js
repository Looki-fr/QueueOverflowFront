import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import QuestionList from "./components/Questions/QuestionList";
import ExerciseList from "./components/Exercise/ExerciseList";
import Home from "./components/Home";
import { ChakraProvider } from '@chakra-ui/react'
import UserList from "./components/User/UserList";
import QuestionFocus from "./components/Questions/QuestionFocus";
import { useEffect, useState } from 'react'
import SignIn from "./components/SignRegister/SignIn";
import Register from "./components/SignRegister/Register";
import ReactDOM from "react-dom/client";
import { UserContext } from "./UserContext";

function App() {
  const [user, setUser] = useState('');

  return (
    <UserContext.Provider value={user}>
      <ChakraProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/questions" element={<QuestionList/>}/>
            <Route path="/users" element={<UserList/>}/>
            <Route path="/exercise" element={<ExerciseList/>}/>
            <Route path="/question" element={<QuestionFocus/>}/>
            <Route path="/signin" element={<SignIn setUser={setUser}/>}/>
            <Route path="/register" element={<Register setUser={setUser}/>}/>
          </Routes>
        </Router>
      </ChakraProvider>
    </UserContext.Provider>
  );
}

export default App;