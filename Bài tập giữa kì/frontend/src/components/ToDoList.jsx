import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Modal, Input, DatePicker, Button, message } from 'antd';
import { PlusCircleOutlined } from '@ant-design/icons';
import ToDoItem from './ToDoItem';
import './styles.css';
import dayjs from 'dayjs';


const ToDoList = () => {
    const [todos, setTodos] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [newTask, setNewTask] = useState({
        title: '',
        description: '',
        due_date: null
    });
    const [editTask, setEditTask] = useState(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    useEffect(() => {
        fetchTodos();
    }, []);

    const fetchTodos = async () => {
        setLoading(true);
        try {
            const response = await axios.get("http://localhost:3000/api/todos");
            if (response.status === 200) {
                setTodos(response.data);
            }
        } catch (error) {
            message.error('Không thể tải danh sách công việc');
        } finally {
            setLoading(false);
        }
    };

    const handleOk = async () => {
        if (!newTask.title || !newTask.description || !newTask.due_date) {
            message.warning('Vui lòng nhập đầy đủ thông tin!');
            return;
        }
    
        setLoading(true);
        try {
            const formattedDate = dayjs(newTask.due_date).format('YYYY-MM-DD HH:mm:ss');
            const response = await axios.post("http://localhost:3000/api/todos", {
                title: newTask.title,
                description: newTask.description,
                due_date: formattedDate
            });
    
            if (response.data) {
                message.success('Thêm công việc thành công!');
                setIsModalOpen(false);
                setNewTask({ title: '', description: '', due_date: null });
                
                await fetchTodos(); 
            }
        } catch (error) {
            message.error('Không thể thêm công việc');
        } finally {
            setLoading(false);
        }
    };
    

    const handleDelete = async (id) => {
        setLoading(true);
        try {
            await axios.delete(`http://localhost:3000/api/todos/${id}`);
            setTodos(prev => prev.filter(todo => todo.id !== id));
            message.success('Xóa công việc thành công!');
        } catch (error) {
            message.error('Không thể xóa công việc');
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = (task) => {
        setEditTask({
            ...task,
            due_date: task.due_date ? dayjs(task.due_date) : null
        });
        setIsEditModalOpen(true);
    };
    const handleEditOk = async () => {
        if (!editTask.title || !editTask.description || !editTask.due_date) {
            message.warning('Vui lòng nhập đầy đủ thông tin!');
            return;
        }
    
        setLoading(true);
        try {
            const formattedDate = dayjs(editTask.due_date).format('YYYY-MM-DD HH:mm:ss');
            
            const updatedTask = {
                title: editTask.title,
                description: editTask.description,
                due_date: formattedDate,
                completed: editTask.completed || 0  
            };
    
            console.log('Sending data:', updatedTask); 
    
            const response = await axios.put(
                `http://localhost:3000/api/todos/${editTask.id}`,
                updatedTask,
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            );
    
            if (response.data) {
                setTodos(prev => prev.map(todo => 
                    todo.id === editTask.id ? { ...todo, ...updatedTask } : todo
                ));
                message.success('Cập nhật công việc thành công!');
                setIsEditModalOpen(false);
                setEditTask(null);
            }
        } catch (error) {
            console.error('Error updating todo:', error); 
            message.error(`Không thể cập nhật công việc: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };
    const handleToggle = async (id, isCompleted) => {
        try {
            const newCompletedValue = isCompleted ? 0 : 1;
            
           
            const currentTodo = todos.find(todo => todo.id === id);
            if (!currentTodo) {
                throw new Error('Không tìm thấy công việc');
            }
    
           
            const response = await axios.put(`http://localhost:3000/api/todos/${id}`, {
                title: currentTodo.title,
                description: currentTodo.description,
                due_date: dayjs(currentTodo.due_date).format('YYYY-MM-DD HH:mm:ss'),
                completed: newCompletedValue
            });
    
            if (response.data) {
                setTodos(prev => prev.map(todo =>
                    todo.id === id ? { ...todo, completed: newCompletedValue } : todo
                ));
                message.success('Cập nhật trạng thái thành công!');
            }
        } catch (error) {
            console.error('Error toggling todo:', error);
            message.error('Không thể cập nhật trạng thái');
        }
    };

    return (
        <div className="todo-list-container">
            <h1 className="todo-list-header">My work 🎯</h1>
            <div className="todo-list-content">
                {loading ? (
                    <div>Đang tải...</div>
                ) : todos.length === 0 ? (
                    <div>Chưa có công việc nào</div>
                ) : (
                    todos.map(todo => (
                        <ToDoItem
                            key={todo.id}
                            {...todo}
                            onEdit={handleEdit}
                            onDelete={handleDelete}
                            onToggle={handleToggle}
                        />
                    ))
                )}

                <Button
                    type="dashed"
                    icon={<PlusCircleOutlined />}
                    onClick={() => setIsModalOpen(true)}
                    loading={loading}
                    className="add-task-button"
                >
                    Thêm công việc mới
                </Button>
            </div>

            <Modal
                title="Thêm công việc mới"
                open={isModalOpen}
                onOk={handleOk}
                onCancel={() => {
                    setIsModalOpen(false);
                    setNewTask({ title: '', description: '', due_date: null });
                }}
                confirmLoading={loading}
                okText="Thêm"
                cancelText="Hủy"
            >
                <div className="modal-content">
                    <div>
                        <label>Tên công việc:</label>
                        <Input
                            value={newTask.title}
                            onChange={(e) => setNewTask({
                                ...newTask,
                                title: e.target.value
                            })}
                            placeholder="Nhập tên công việc"
                        />
                    </div>
                    
                    <div>
                        <label>Mô tả:</label>
                        <Input.TextArea
                            value={newTask.description}
                            onChange={(e) => setNewTask({
                                ...newTask,
                                description: e.target.value
                            })}
                            placeholder="Nhập mô tả công việc"
                        />
                    </div>

                    <div>
                        <label>Ngày hết hạn:</label>
                        <DatePicker
                            showTime
                            value={newTask.due_date ? dayjs(newTask.due_date) : null}
                            onChange={(date) => setNewTask({
                                ...newTask,
                                due_date: date
                            })}
                            format="YYYY-MM-DD HH:mm:ss"
                            style={{ width: '100%' }}
                            placeholder="Chọn ngày và giờ"
                        />
                    </div>
                </div>
            </Modal>
            <Modal
                title="Chỉnh sửa công việc"
                open={isEditModalOpen}
                onOk={handleEditOk}
                onCancel={() => {
                    setIsEditModalOpen(false);
                    setEditTask(null);
                }}
                okText="Lưu"
                cancelText="Hủy"
            >
                <div className="modal-content">
                    <div>
                        <label>Tên công việc:</label>
                        <Input
                            value={editTask?.title}
                            onChange={(e) => setEditTask({
                                ...editTask,
                                title: e.target.value
                            })}
                            placeholder="Nhập tên công việc"
                        />
                    </div>

                    <div>
                        <label>Mô tả:</label>
                        <Input.TextArea
                            value={editTask?.description}
                            onChange={(e) => setEditTask({
                                ...editTask,
                                description: e.target.value
                            })}
                            placeholder="Nhập mô tả công việc"
                            rows={4}
                        />
                    </div>

                    <div>
                        <label>Ngày hết hạn:</label>
                        <DatePicker
                            showTime
                            value={editTask?.due_date ? dayjs(editTask.due_date) : null}
                            onChange={(date) => setEditTask({
                                ...editTask,
                                due_date: date
                            })}
                            format="YYYY-MM-DD HH:mm:ss"
                            style={{ width: '100%' }}
                            placeholder="Chọn ngày và giờ"
                            disabledDate={(current) => current && current < dayjs().startOf('day')}
                        />
                    </div>
                </div>
            </Modal>
        </div>
    );
};

export default ToDoList;