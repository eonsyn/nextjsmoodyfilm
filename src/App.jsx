import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import AdminLogin from "./AdminComponent/AdminLogin.jsx";
import MovieEdit from "./AdminComponent/MovieEdit";
import MovieForm from "./AdminComponent/MovieForm";
import MovieUpdate from "./AdminComponent/MovieUpdate";
import "./App.css";
import Footer from "./Component/Footer.jsx";
import Home from "./Component/Home";
import MovieDetail from "./Component/MovieDetail";
import Navbar from "./Component/Navbar";
import RequestMovie from "./Component/RequestMovie.jsx";
import { SearchProvider } from "./context/SearchContext";
import { routes } from "./routes"; // Import generated movie routes

function App() {
  return (
    <Router>
      <SearchProvider>
        <Navbar />
        <div className="pt-16">
          {" "}
          {/* Added padding to prevent content from hiding under navbar */}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/requestMovie" element={<RequestMovie />} />
            <Route path="/admin/MovieForm" element={<MovieForm />} />
            <Route path="/admin/MovieEdit/:id" element={<MovieEdit />} />
            <Route path="/admin" element={<AdminLogin />} />
            <Route path="/admin/MovieUpdate" element={<MovieUpdate />} />
            {/* Dynamically created movie detail routes */}
            {routes.map((route, index) => (
              <Route key={index} path={route} element={<MovieDetail />} />
            ))}
          </Routes>
        </div>
        <Footer />
      </SearchProvider>
    </Router>
  );
}

export default App;
