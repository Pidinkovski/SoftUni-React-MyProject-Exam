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
import IdeaEdit from "./components/idea-edit/IdeaEdit"
import NotFound from "./components/404/404"
import AuthGuard from "./routeGuards/authGuard"
import GuestGuard from "./routeGuards/guestGuard"



function App() {


  return (
    <UserProvider>
    <Header />

    <Routes>
    <Route path="/" element={<Home />}/>
    <Route path="/ideas" element= {<Catalog />} />

    <Route element={<GuestGuard />}>
    <Route path="/register" element= {<Register/>} />
    <Route path="/login" element= {<Login />} />
    </Route>

    <Route path="/ideas/:categoryName" element= {<CategoryIdeasList />} />
    <Route path="/ideas/:ideaId/details" element= {<IdeaDetails />} />

    <Route element={<AuthGuard />}>
      <Route path="/create" element= {<Create />} />
      <Route path="/logout" element= {<Logout />} />
    </Route >

    <Route path="/ideas/:ideaId/edit" element= {<IdeaEdit />} />
    <Route path="*" element={<NotFound />} />
    </Routes>

    <Footer/>
    </UserProvider>
  )
}

export default App
