import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import AdminLogin from "./AdminComponent/AdminLogin.jsx";
import MovieEdit from "./AdminComponent/MovieEdit";
import MovieForm from "./AdminComponent/MovieForm";
import MovieUpdate from "./AdminComponent/MovieUpdate";
import Footer from "./Component/Footer.jsx";
import Home from "./Component/Home";
import MovieDetail from "./Component/MovieDetail";
import Navbar from "./Component/Navbar";
import RequestMovie from "./Component/RequestMovie.jsx";
import RequestedMovies from "./Component/RequestedMovies.jsx";
import WatchMovie from "./Component/WatchMovie.jsx";
import OnlineWatch from "./Component/OnlineWatch.jsx";
import { SearchProvider } from "./context/SearchContext";
function App() {
  return (
    <Router>
      <SearchProvider>
        <Navbar />
        <div className="pt-16">
          {/* Padding to prevent content from hiding under navbar */}
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<Home />} />
            <Route path="/movie/:id" element={<MovieDetail />} />
            <Route path="/watch/:id" element={<WatchMovie />} />
            <Route path="/OnlineWatch" element={<OnlineWatch />} />

            <Route path="/requestMovie" element={<RequestMovie />} />

            {/* Admin routes */}
            <Route path="/admin" element={<AdminLogin />} />
            <Route path="/admin/MovieForm" element={<MovieForm />} />
            <Route path="/admin/MovieEdit/:id" element={<MovieEdit />} />
            <Route path="/admin/MovieUpdate" element={<MovieUpdate />} />
            <Route
              path="/admin/RequestedMovies"
              element={<RequestedMovies />}
            />
          </Routes>
        </div>
        <Footer />
      </SearchProvider>
    </Router>
  );
}

export default App;
