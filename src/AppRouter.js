// src/AppRouter.js
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import App from "./App";
import Arms from "./Arms";
import Legs from "./Legs"; // Εισάγετε το νέο component Legs
import Chest from "./Chest"; // Εισάγετε το νέο component Chest

function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/arms" element={<Arms />} />
        <Route path="/legs" element={<Legs />} />
        <Route path="/chest" element={<Chest />} />
      </Routes>
    </Router>
  );
}

export default AppRouter;
