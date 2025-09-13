import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import BoardPage from "./pages/BoardPage";

const App = () => {
  return (
    <Routes>
      <Route path="/board/:id" element={<BoardPage />} />
      <Route path="*" element={<Navigate to="/board/1" replace />} />
    </Routes>
  );
}

export default App;