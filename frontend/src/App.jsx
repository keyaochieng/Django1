//here we write the navigation of the app
import react from "react"
import {BrowserRouter, Routes, Route, Navigation} from "react-router-dom"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Home from "./pages/Home"
import NotFound from "./pages/NotFound"
import ProtectedRoute from "./components/ProtectedRoute"

function Logout(){
    localStorage.clear()//clear out refresh and access tk
    return <Navigate to = "/login"/>
}

function RegisterAndLogout(){//when registering we first clear access token so we don't have any lingering around
    localStorage.clear()
    return <Register/>
}

function App() {
    return(
        <BrowserRouter>
        <Routes>
            <Route
                path = "/"
                element={//so you cannot access the home component without the access token which is valid
                    <ProtectedRoute>
                        <Home/> 
                    </ProtectedRoute>
                }
            />
            <Route path = "/login" element = {<Login/>}/>
            <Route path = "/register" element = {RegisterAndLogout}/>
            <Route path = "*" element = {<NotFound/>}/>


        </Routes>
        </BrowserRouter>
    )
}

export default App