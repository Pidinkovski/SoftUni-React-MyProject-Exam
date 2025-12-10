import { Route, Routes } from "react-router"

import Footer from "./components/footer/Footer"
import Header from "./components/header/Header"
import Home from "./components/home/Home"
import Catalog from "./components/catalog-ideas/Catalog"
import Register from "./components/register/Register"
import Login from "./components/login/Login"
import Create from "./components/create/Create"
import CategoryIdeasList from "./components/category-ideas-list/CategoryIdeasList"
import IdeaDetails from "./components/idea-details/IdeaDetails"
import { UserProvider } from "./contexts/UserContext"
import Logout from "./components/logout/Logout"



function App() {


  return (
    <UserProvider>
    <Header />

    <Routes>
    <Route path="/" element={<Home />}/>
    <Route path="/ideas" element= {<Catalog />} />
    <Route path="/register" element= {<Register/>} />
    <Route path="/login" element= {<Login />} />
    <Route path="/create" element= {<Create />} />
    <Route path="/ideas/:categoryName" element= {<CategoryIdeasList />} />
    <Route path="/ideas/:categoryName/:ideaId" element= {<IdeaDetails />} />
    <Route path="/logout" element= {<Logout />} />
    </Routes>

    <Footer/>
    </UserProvider>
  )
}

export default App
