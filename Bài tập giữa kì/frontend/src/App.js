import axios from 'axios';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ToDoList from './components/ToDoList.jsx';
import Login from './components/Login.js';
import Register from './components/Register.js';
import './App.css';
import 'antd/dist/reset.css';

function App() {
  return (
    <Router>
      <div className="App">
        <div className="container">
          <Routes>
            <Route path="/todolist" element={<ToDoList />} />
            <Route path="/login" element={<Login/>} />
            <Route path="/register" element={<Register />} />
            <Route path="/" element={<Login />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}
axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`;
export default App;