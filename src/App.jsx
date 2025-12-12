import './App.css'
import React, { useState, useEffect } from 'react'
import Nav from './components/Nav'
import HomePage from './components/HomePage'
import NewList from './components/NewList'
import ViewTodo from "./components/ViewTodo";
import AllTodos from './components/AllTodos'

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  const [mode, setMode] = useState(() => {
    return localStorage.getItem("theme") || "light";
  });

  useEffect(() => {
    localStorage.setItem("theme", mode);

    if (mode === "dark") {
      document.body.style.backgroundColor = "#03031bff";
    } else {
      document.body.style.backgroundColor = "white";
    }
  }, [mode]);

  const toggleMode = () => {
    setMode(prevMode => (prevMode === "light" ? "dark" : "light"));
  };

  return (
    <Router>
      <div className="d-flex">
        <Nav mode={mode} toggleMode={toggleMode} />

        <div className="container">
          <Routes>
            <Route
              path="/homepage"
              element={
                <HomePage
                  mode={mode}
                  hello="Hey there!👋"
                  appName="Welcome to your To Do List"
                  introduction="This is your own personal space to organize your day and stay productive. Enjoy!"
                />
              }
            />
            <Route path="/newlist" element={<NewList mode={mode} />} />
            <Route path="/alltodos" element={<AllTodos mode={mode}/>} />
            <Route path="/todo/:id" element={<ViewTodo mode={mode}/>} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
