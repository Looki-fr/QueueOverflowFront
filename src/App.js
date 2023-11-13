import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ProductList from "./components/ProductList";
import AddProduct from "./components/AddProduct";
import EditProduct from "./components/EditProduct";
import QuestionList from "./components/QuestionList";
/* <Route path="/" element={<ProductList/>}/>
<Route path="/add" element={<AddProduct />}/>
<Route path="/edit/:id" element={<EditProduct />}/> */
function App() {
  return (
    <div>
      <Router>
      <div>
        <div>
          <div>
            <Routes>
              <Route path="/" element={<QuestionList/>}/>
            </Routes>
          </div>
        </div>
      </div>
      </Router>
    </div>
  );
}
 
export default App;