import React, { useState } from 'react';
import ToDoItem from "./ToDoItem";
import { PlusCircleOutlined } from '@ant-design/icons';
import './style.scss'; 

const ToDoList = () => {
    const [tasks, setTasks] = useState([
        { id: 1, title: "Gửi email nộp bài tập về nhà", dueDate: "Hôm nay", completed: false },
        { id: 2, title: "Học từ vựng tiếng anh mỗi ngày", dueDate: "Ngày mai", completed: false },
        { id: 3, title: "Viết tiểu luận môn Triết học", dueDate: "Tuần tới", completed: false }
    ]);
    const [newTask, setNewTask] = useState({ title: '', dueDate: '' });
    const [isEditing, setIsEditing] = useState(false);
    const [editTaskId, setEditTaskId] = useState(null);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const addTask = () => {
        if (newTask.title && newTask.dueDate) {
            setTasks([...tasks, { id: Date.now(), ...newTask, completed: false }]);
            setNewTask({ title: '', dueDate: '' });
            setIsModalVisible(false); 
        }
    };
    

    const handleAddTask = () => {
        setNewTask({ title: '', dueDate: '' }); 
        setIsModalVisible(true); 
        setIsEditing(false); 
    };

    const handleUpdateTask = () => {
        updateTask(); 
        setIsModalVisible(false);
    };

    const editTask = (id) => {
        const taskToEdit = tasks.find(task => task.id === id);
        setNewTask({ title: taskToEdit.title, dueDate: taskToEdit.dueDate });
        setIsEditing(true);
        setEditTaskId(id);
        setIsModalVisible(true); 
    };

    const updateTask = () => {
        setTasks(tasks.map(task => {
            if (task.id === editTaskId) {
                const updatedTask = { ...task, title: newTask.title, dueDate: newTask.dueDate };
                setNewTask({ title: '', dueDate: '' });
                return updatedTask;
            }
            return task;
        }));
        setIsEditing(false);
        setEditTaskId(null);
        setIsModalVisible(false);
    };

    const deleteTask = (id) => {
        setTasks(tasks.filter(task => task.id !== id));
    };
    const toggleComplete = (id) => {
        setTasks(tasks.map(task => task.id === id ? { ...task, completed: !task.completed } : task));
    };

    return (
        <div>
            <div className="ToDoList" style={{ marginLeft: '10px' }}>
                <h1>My work 🎯</h1>
                <div>
                    {tasks.map(task => (
                        <ToDoItem 
                            key={task.id} 
                            title={task.title} 
                            dueDate={task.dueDate} 
                            completed={task.completed}
                            onEdit={() => editTask(task.id)}
                            onDelete={() => deleteTask(task.id)}
                            onToggle={() => toggleComplete(task.id)}
                        />
                    ))}
                </div>
            </div>
            <button className="add-task-button" onClick={handleAddTask}>Thêm mới</button> {}
            {isModalVisible && (
                <>
                    <div className="overlay" /> {}
                    <div className="modal">
                        <input 
                            type="text" 
                            value={newTask.title} 
                            onChange={(e) => setNewTask({ ...newTask, title: e.target.value })} 
                            placeholder="Task Title" 
                        />
                        <input 
                            type="text" 
                            value={newTask.dueDate} 
                            onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })} 
                            placeholder="Due Date" 
                        />
                        <button className="add-task-button" onClick={isEditing ? handleUpdateTask : addTask}>
                            {isEditing ? 'Update Task' : <PlusCircleOutlined />} 
                        </button>
                        <button className="add-task-button" onClick={() => setIsModalVisible(false)}>Close</button> {}
                    </div>
                </>
            )}
        </div>
    );
}
export default ToDoList;