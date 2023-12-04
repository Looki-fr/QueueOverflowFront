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
import Redirect from "./components/Redirect";
import AskQuestion from "./components/Questions/AskQuestion";

function App() {
  const [user, setUser] = useState('');

  return (
    <UserContext.Provider value={user}>
      <ChakraProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/questions" element={<QuestionList/>}/>
            <Route path="/question" element={<QuestionFocus/>}/>
            <Route path="/signin" element={<SignIn setUser={setUser}/>}/>
            <Route path="/register" element={<Register setUser={setUser}/>}/>
            <Route path="/askQuestion" element={<AskQuestion/>}/>
            <Route path="*" element={<Redirect/>}/>
          </Routes>
        </Router>
      </ChakraProvider>
    </UserContext.Provider>
  );
}

export default App;