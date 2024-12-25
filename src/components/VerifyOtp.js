import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { verifyOtp } from '../services/api';
import Swal from 'sweetalert2';

const VerifyOtp = () => {
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!otp) {
      Swal.fire('Error', 'Please enter the OTP', 'error');
      return;
    }

    setLoading(true);
    try {
      const userId = localStorage.getItem('userId'); // Assuming userId is stored in localStorage after registration
      await verifyOtp(userId, otp);
      Swal.fire('Success', 'OTP verified successfully!', 'success');
      navigate('/login');
    } catch (error) {
      Swal.fire('Error', error.response?.data?.message || 'OTP verification failed', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-accent1 via-accent2 to-accent4 flex items-center justify-center p-4">
      <div className="bg-white/90 backdrop-blur-sm p-8 rounded-2xl shadow-xl w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Xác Thực OTP</h1>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Nhập mã OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              disabled={loading}
            />
            <button
              type="submit"
              className="w-full py-4 bg-accent4 text-white rounded-full font-medium text-lg hover:bg-accent3 transition-all duration-300"
              disabled={loading}
            >
              {loading ? 'Đang xác thực...' : 'Xác Thực'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default VerifyOtp;