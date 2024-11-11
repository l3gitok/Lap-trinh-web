import React, { useState } from 'react';
import { Form, Input, Button, Typography, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { login } from '../api'; 
import './Login.css';

const { Title } = Typography;

const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    setLoading(true);
    try {

      const { usernameOrEmail, password } = values;
      const data = await login(usernameOrEmail, password);
      
      if (data.token) {
        localStorage.setItem('token', data.token); 
        message.success('Đăng nhập thành công!');
        navigate('/todolist'); 
      } else {
        message.error('Đăng nhập thất bại! Không có token.');
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Đăng nhập thất bại! Kiểm tra lại thông tin';
      message.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <Title level={2} style={{ color: '#ED4192' }}>Đăng Nhập</Title>
      <Form
        name="login"
        className="login-form"
        initialValues={{ remember: true }}
        onFinish={onFinish}
      >
        <Form.Item
          name="usernameOrEmail"
          rules={[{ required: true, message: 'Vui lòng nhập tên người dùng hoặc email của bạn!' }]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Tên người dùng hoặc Email"
          />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[{ required: true, message: 'Vui lòng nhập mật khẩu!' }]}>
          <Input.Password
            prefix={<LockOutlined className="site-form-item-icon" />}
            placeholder="Mật khẩu"
          />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
            loading={loading} 
          >
            Đăng Nhập
          </Button>

          <Button
            type="link"
            onClick={() => navigate('/register')}
            style={{ color: '#ED4192' }}
          >
            Chưa có tài khoản? Đăng ký
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;
