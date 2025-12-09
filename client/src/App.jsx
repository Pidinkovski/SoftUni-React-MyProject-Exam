import { Route, Routes } from "react-router"

import Footer from "./components/footer/Footer"
import Header from "./components/header/Header"
import Home from "./components/home/Home"
import Catalog from "./components/catalog-ideas/Catalog"
import Register from "./components/register/Register"


function App() {


  return (
    <>
    <Header />

    <Routes>
    <Route path="/" element={<Home />}/>
    <Route path="/ideas" element= {<Catalog />} />
    <Route path="/register" element= {<Register/>} />
    </Routes>

    <Footer/>
    </>
  )
}

export default App
