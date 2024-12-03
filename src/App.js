import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import DashBoard from "./pages/DashBoard";
import Navbar from "./components/Navbar"; 
import UserDashboard from "./pages/Userdashboard";
import BrowseCars from "./pages/Browsecars";
import ProfilePage from "./pages/ProfilePage";
import BookReservations from "./pages/BookReservation";
import MakeReviews from "./pages/Reviews"
import MakePayments from "./pages/Payments"
function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} /> 
         <Route path="/register" element={<Register />} />
         <Route path="/dashboard" element={<UserDashboard />} /> 
         <Route path="/browsecar" element={<BrowseCars/>}/>
         <Route path="/profilepage" element={<ProfilePage/>}/>
         <Route path="/bookreservation" element={<BookReservations/>}/>
         <Route path="/reviews" element={<MakeReviews/>}/>
         <Route path="/payment" element={<MakePayments/>}/>
      </Routes>
    </Router>
  );
}

export default App;
