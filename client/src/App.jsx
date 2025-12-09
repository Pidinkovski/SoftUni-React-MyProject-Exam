import { Route, Routes } from "react-router"

import Footer from "./components/footer/Footer"
import Header from "./components/header/Header"
import Home from "./components/home/Home"
import Catalog from "./components/catalog-ideas/Catalog"
import Register from "./components/register/Register"
import Login from "./components/login/Login"
import Create from "./components/create/Create"



function App() {


  return (
    <>
    <Header />

    <Routes>
    <Route path="/" element={<Home />}/>
    <Route path="/ideas" element= {<Catalog />} />
    <Route path="/register" element= {<Register/>} />
    <Route path="/login" element= {<Login />} />
    <Route path="/create" element= {<Create />} />
    </Routes>

    <Footer/>
    </>
  )
}

export default App
