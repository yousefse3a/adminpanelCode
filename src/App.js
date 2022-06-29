import { useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import SideNavbar from "./components/SideNavbar/SideNavbar";
import Home from "./Pages/Home/Home";
import Login from "./Pages/Login/Login";
import NewProduct from "./Pages/NewProduct/NewProduct";
import NewUser from "./Pages/NewUser/NewUser";
import Product from "./Pages/Product/Product";
import Products from "./Pages/Products/Products";
import User from "./Pages/User/User";
import Users from "./Pages/Users/Users";
function App() {
  const AdminToken = useSelector(state => state.admin.adminToken);
  
  return (
    <div className="App">
      {AdminToken ?
        (<>
          <Navbar />
          <div className="container">

            <SideNavbar />
            <Routes>
              <Route path="/Home" element={<Home />}></Route>
              <Route path="/Users" element={<Users />}></Route>
              <Route path="/NewUser" element={<NewUser />}></Route>
              <Route path="/User/:id" element={<User />}></Route>
              <Route path="/Products" element={<Products />}></Route>
              <Route path="/Product/:id" element={<Product />}></Route>
              <Route path="/NewProduct" element={<NewProduct />}></Route>
              <Route path="/" element={<Home />}></Route>
            </Routes>
          </div>
        </>) : <>
          <Login />
        </>
      }
    </div>
  );
}

export default App;
