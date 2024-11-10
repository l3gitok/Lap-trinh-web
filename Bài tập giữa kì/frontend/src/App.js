import React from 'react';
import ToDoList from './components/ToDoList.jsx';
import './App.css';
import 'antd/dist/reset.css';



function App() {
  return (
    <div className="App">
      <div className="container">
        <ToDoList />
      </div>
    </div>
  );
}

export default App;