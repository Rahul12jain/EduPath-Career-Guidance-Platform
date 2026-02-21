import { BrowserRouter, Routes, Route } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";

import Layout from "./components/Layout";

import Home from "./pages/Home";
import Quiz from "./pages/Quiz";
import Careers from "./pages/Careers";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import About from "./pages/About";
import CareerQuiz from "./pages/CareerQuiz";
import Skill from "./pages/Skill";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProtectedRoute from "./components/ProtectedRoute";


function App() {
  return (
    <BrowserRouter>
      <ScrollToTop/>
        <Routes>
          {/* Layout Route */}
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/quiz" element={<Quiz />} />
            <Route path="/skill" element={<Skill />} />
            <Route path="/careers" element={<Careers />} />
            <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/about" element={<About />} />
            <Route path="/careerquiz" element={<CareerQuiz />} />
          </Route>
        </Routes>
       

      <ToastContainer position="top-right" autoClose={3000} />
    </BrowserRouter>
  );
}

export default App;
