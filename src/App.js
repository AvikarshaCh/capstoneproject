import "../src/dist/styles.css";
import About from "./Pages/About";
import Home from "./Pages/Home";
import Navbar from "../src/components/Navbar";
import { Route, Routes } from "react-router-dom";
import Models from "./Pages/Models";
import TestimonialsPage from "./Pages/TestimonialsPage";
import Team from "./Pages/Team";
import Contact from "./Pages/Contact";
import LoginComp from "./Pages/LoginComp";
import Bookings from "./Pages/Bookings";
import AddBook from "./Pages/AddBook";
import ProtectedRoute from "./components/ProtectedRoute";
import Register from "./Pages/Register";
import Users from "./Pages/Users";
import Customer from "./Pages/Customer";
import CustomerEdit from "./Pages/CustomerEdit";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route index path="/" element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="models" element={<Models />} />
        <Route path="testimonials" element={<TestimonialsPage />} />
        <Route path="team" element={<Team />} />
        <Route path="contact" element={<Contact />} />
        <Route path="login" element={<LoginComp />} />
        <Route path="reg" element={<Register />} />
        <Route path="customer" element={<ProtectedRoute RoutingComponent={Customer} />} />
        <Route path="editcust/:_id" element={<ProtectedRoute RoutingComponent={CustomerEdit} />} />
        <Route path="book" element={<ProtectedRoute RoutingComponent={Bookings}/>} />
        <Route path="userdb" element={<ProtectedRoute RoutingComponent={Users}/>} />
        <Route path="editbook/:_id" element={<ProtectedRoute RoutingComponent={AddBook} />} />
      </Routes>
    </>
  );
}

export default App;
