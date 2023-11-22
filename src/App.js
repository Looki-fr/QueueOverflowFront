import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import QuestionList from "./components/Questions/QuestionList";
import ExerciseList from "./components/Exercise/ExerciseList";
import Home from "./components/Home";
import { ChakraProvider } from '@chakra-ui/react'
import UserList from "./components/User/UserList";
/* <Route path="/" element={<ProductList/>}/>
<Route path="/add" element={<AddProduct />}/>
<Route path="/edit/:id" element={<EditProduct />}/> */


function App() {
  return (
    <ChakraProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/questions" element={<QuestionList/>}/>
          <Route path="/users" element={<UserList/>}/>
          <Route path="/exercise" element={<ExerciseList/>}/>
        </Routes>
      </Router>
    </ChakraProvider>
  );
}

export default App;