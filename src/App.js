import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import QuestionList from "./components/QuestionList";
import Navbar from "./components/Navbar";
import { ChakraProvider } from '@chakra-ui/react'
import {SideBar} from './components/Sidebar'
/* <Route path="/" element={<ProductList/>}/>
<Route path="/add" element={<AddProduct />}/>
<Route path="/edit/:id" element={<EditProduct />}/> */


function App() {
  return (
    <ChakraProvider>
      <Navbar/>
      <SideBar display={{md: 'unset' }} />
        <Router>
          <Routes>
            <Route path="/" element={<QuestionList/>}/>
          </Routes>
        </Router>
    </ChakraProvider>
  );
}

export default App;