import React from 'react';
import { Card, Space, Button, Tag, Checkbox } from 'antd';
import { EditOutlined, DeleteOutlined, ClockCircleOutlined } from '@ant-design/icons';
import { format } from 'date-fns';
import './styles.css';

const ToDoItem = ({ 
    id, 
    title, 
    description, 
    due_date, 
    completed, 
    onEdit, 
    onDelete, 
    onToggle 
}) => {
    const formatDate = (date) => {
        try {
            if (!date) return 'Không có ngày hạn';
            return format(new Date(date), 'dd/MM/yyyy HH:mm:ss');
        } catch (error) {
            return 'Ngày không hợp lệ';
        }
    };

    return (
        <Card
            style={{ 
                marginBottom: '16px',
                borderRadius: '8px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                textDecoration: completed === 1 ? 'line-through' : 'none',
                opacity: completed === 1 ? 0.5 : 1
            }}
            actions={[
                <Button 
                    type="text" 
                    icon={<EditOutlined />} 
                    onClick={() => onEdit({ id, title, description, due_date, completed })}
                >
                    Sửa
                </Button>,
                <Button 
                    type="text" 
                    danger 
                    icon={<DeleteOutlined />} 
                    onClick={() => onDelete(id)}
                >
                    Xóa
                </Button>
            ]}
        >
            <Space direction="vertical" size="small" style={{ width: '100%' }}>
                <div style={{ fontSize: '16px', fontWeight: 500 }}>
                    <Checkbox
                        checked={completed === 1}
                        onChange={() => onToggle(id, completed === 1)}
                    >
                        {title}
                    </Checkbox>
                </div>
                <div style={{ fontSize: '14px', color: '#666' }}>
                    {description || 'Không có mô tả'}
                </div>
                <Space>
                    <ClockCircleOutlined style={{ color: '#1890ff' }} />
                    <Tag color="blue">
                        {formatDate(due_date)}
                    </Tag>
                </Space>
            </Space>
        </Card>
    );
};

export default ToDoItem;