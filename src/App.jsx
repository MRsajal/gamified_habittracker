import { useState } from "react";
import { Outlet } from "react-router";
import "./App.css";
import Header from "./components/Header";
import { AuthProvider } from "./utils/AuthContext";

function App() {
  return (
    <AuthProvider>
      <Header />
      <Outlet />
    </AuthProvider>
  );
}

export default App;
