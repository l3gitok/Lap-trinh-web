import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { List, Button, Modal, Input, notification } from 'antd';
import { PlusCircleOutlined } from '@ant-design/icons';
import './style.scss'; 

const ToDoList = () => {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState({ title: '', dueDate: '' });
    const [isEditing, setIsEditing] = useState(false);
    const [editTaskId, setEditTaskId] = useState(null);
    const [isModalVisible, setIsModalVisible] = useState(false);

    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = async () => {
        try {
            const response = await axios.get('http://localhost:3000/api/todos');
            setTasks(response.data);
        } catch (error) {
            notification.error({ message: 'Error fetching tasks' });
        }
    };

    const addTask = async () => {
        if (newTask.title && newTask.dueDate) {
            const taskToAdd = { title: newTask.title, due_date: newTask.dueDate, completed: false };
            try {
                const response = await axios.post('http://localhost:3000/api/todos', taskToAdd);
                setTasks([...tasks, { id: response.data.id, ...taskToAdd }]);
                setNewTask({ title: '', dueDate: '' });
                setIsModalVisible(false); 
                notification.success({ message: 'Task added successfully' });
            } catch (error) {
                notification.error({ message: 'Error adding task' });
            }
        }
    };

    const handleAddTask = () => {
        setNewTask({ title: '', dueDate: '' }); 
        setIsModalVisible(true); 
        setIsEditing(false); 
    };

    const handleUpdateTask = async () => {
        await updateTask(); 
        setIsModalVisible(false);
    };

    const editTask = (id) => {
        const taskToEdit = tasks.find(task => task.id === id);
        setNewTask({ title: taskToEdit.title, dueDate: taskToEdit.due_date });
        setIsEditing(true);
        setEditTaskId(id);
        setIsModalVisible(true); 
    };

    const updateTask = async () => {
        const updatedTask = { title: newTask.title, due_date: newTask.dueDate, completed: false };
        try {
            await axios.put(`http://localhost:3000/api/todos/${editTaskId}`, updatedTask);
            setTasks(tasks.map(task => (task.id === editTaskId ? { ...task, ...updatedTask } : task)));
            setIsEditing(false);
            setEditTaskId(null);
            notification.success({ message: 'Task updated successfully' });
        } catch (error) {
            notification.error({ message: 'Error updating task' });
        }
    };

    const deleteTask = async (id) => {
        try {
            await axios.delete(`http://localhost:3000/api/todos/${id}`);
            setTasks(tasks.filter(task => task.id !== id));
            notification.success({ message: 'Task deleted successfully' });
        } catch (error) {
            notification.error({ message: 'Error deleting task' });
        }
    };

    const toggleComplete = async (id) => {
        const taskToUpdate = tasks.find(task => task.id === id);
        const updatedTask = { ...taskToUpdate, completed: !taskToUpdate.completed };
        try {
            await axios.put(`http://localhost:3000/api/todos/${id}`, updatedTask);
            setTasks(tasks.map(task => (task.id === id ? updatedTask : task)));
            notification.success({ message: 'Task status updated' });
        } catch (error) {
            notification.error({ message: 'Error toggling task completion' });
        }
    };

    return (
        <div>
            <h1>My work 🎯</h1>
            <List
                bordered
                dataSource={tasks}
                renderItem={task => (
                    <List.Item
                        actions={[
                            <Button onClick={() => editTask(task.id)}>Edit</Button>,
                            <Button onClick={() => deleteTask(task.id)}>Delete</Button>,
                            <Button onClick={() => toggleComplete(task.id)}>
                                {task.completed ? 'Undo' : 'Complete'}
                            </Button>
                        ]}
                    >
                        <List.Item.Meta
                            title={task.title}
                            description={`Due: ${task.due_date} | Completed: ${task.completed ? 'Yes' : 'No'}`}
                        />
                    </List.Item>
                )}
            />
            <Button type="primary" icon={<PlusCircleOutlined />} onClick={handleAddTask}>
                Thêm mới
            </Button>
            <Modal
                title={isEditing ? 'Cập nhật task' : 'Thêm mới task'}
                visible={isModalVisible}
                onOk={isEditing ? handleUpdateTask : addTask}
                onCancel={() => setIsModalVisible(false)}
            >
                <Input 
                    placeholder="Task Title" 
                    value={newTask.title} 
                    onChange={(e) => setNewTask({ ...newTask, title: e.target.value })} 
                />
                <Input 
                    placeholder="Due Date" 
                    value={newTask.dueDate} 
                    onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })} 
                />
            </Modal>
        </div>
    );
}

export default ToDoList;