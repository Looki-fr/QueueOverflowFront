import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import QuestionList from "./components/QuestionList";
import { ChakraProvider } from '@chakra-ui/react'
import UserList from "./components/UserList";
/* <Route path="/" element={<ProductList/>}/>
<Route path="/add" element={<AddProduct />}/>
<Route path="/edit/:id" element={<EditProduct />}/> */


function App() {
  return (
    <ChakraProvider>
      <Router>
        <Routes>
          <Route path="/" element={<QuestionList/>}/>
          <Route path="/users" element={<UserList/>}/>
        </Routes>
      </Router>
    </ChakraProvider>
  );
}

export default App;