import './App.css'
import {Routes, Route, BrowserRouter} from "react-router-dom";
import Login from "./pages/auth/Login";
import Incidents from "./pages/incidents";
import ProtectedRoute from "./pages/ProtectedRoute";

function App() {
    const user = true
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Incidents/>}/>
                <Route path="/auth/login" element={<Login/>}/>
                <Route path="/app/incidents" element={
                    <ProtectedRoute user={user}>
                        <Incidents/>
                    </ProtectedRoute>}/>
            </Routes>
        </BrowserRouter>
)

}

export default App
