import React, { useState } from 'react';
import { Form, Input, Button, Typography, message } from 'antd';
import { UserOutlined, MailOutlined, LockOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { register } from '../api.js'; 
import './Register.css';

const { Title } = Typography;

const Register = ({ onRegister }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    setLoading(true);
    try {

      await register(values.username, values.email, values.password);
      message.success('Đăng ký thành công!');
      navigate('/login'); 
    } catch (error) {
      message.error('Đăng ký thất bại! Kiểm tra lại thông tin');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-container">
      <Title level={2} style={{ color: '#ED4192' }}>Đăng Ký</Title>
      <Form
        name="register"
        className="register-form"
        onFinish={onFinish}
      >
        <Form.Item
          name="username"
          rules={[{ required: true, message: 'Vui lòng nhập tên người dùng!' }]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Tên người dùng"
          />
        </Form.Item>

        <Form.Item
          name="email"
          rules={[{ required: true, message: 'Vui lòng nhập email!' }]}
        >
          <Input
            prefix={<MailOutlined className="site-form-item-icon" />}
            placeholder="Email"
          />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[{ required: true, message: 'Vui lòng nhập mật khẩu!' }]}
        >
          <Input.Password
            prefix={<LockOutlined className="site-form-item-icon" />}
            placeholder="Mật khẩu"
          />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="register-form-button"
            loading={loading}
          >
            Đăng Ký
          </Button>
          <Button
            type="link"
            onClick={() => navigate('/login')}
            style={{ color: '#ED4192' }}
          >
            Đã có tài khoản? Đăng nhập
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Register;
