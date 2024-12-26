import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { SearchProvider } from "./context/SearchContext"; // Import SearchProvider
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <SearchProvider>
    <App />
  </SearchProvider>
);
