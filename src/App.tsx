import React from "react";
import { Route, Routes } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
import "./App.scss";
import { Navigation } from "./components/Navigation";
import { HomePage } from "./pages/HomePage";
import { VideoChatPage } from "./pages/VideoChatPage";

const App = () => {
  return (
    <BrowserRouter>
      <Navigation />
      <div className="app container">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/videochat" element={<VideoChatPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
