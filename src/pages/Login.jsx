import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useToast } from '../hooks/useToast';
import LoadingSpinner from '../components/LoadingSpinner';

const Login = () => {
  const [formData, setFormData] = useState({ userName: '', password: '' });
  const [submitting, setSubmitting] = useState(false);
  const { login } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.userName || !formData.password) {
      showToast('Please fill all fields', 'error');
      return;
    }
    setSubmitting(true);
    try {
      await login(formData.userName, formData.password);
      showToast('Welcome back!', 'success');
      navigate('/dashboard', { replace: true });
    } catch (err) {
      const msg = err.response?.data || (err.code === 'ERR_NETWORK' ? 'Unable to connect to server. Please try again later.' : 'Login failed. Check your credentials.');
      showToast(msg, 'error');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-start sm:items-center justify-center bg-[#0a0a0f] px-4 pt-14 sm:pt-24 pb-12">
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-[#6c63ff] opacity-10 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full bg-[#a78bfa] opacity-10 blur-3xl" />
      </div>

      <div className="w-full max-w-md relative animate-slideUp">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="relative w-16 h-16 rounded-2xl overflow-hidden mx-auto mb-4 ring-2 ring-[#6c63ff]/30 shadow-lg shadow-[#6c63ff]/10">
            <img src="/sign-in.png" alt="Sign In" className="w-full h-full object-cover" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white">Welcome Back</h1>
          <p className="text-gray-500 mt-2">Sign in to your journal</p>
        </div>

        <form onSubmit={handleSubmit} className="glass-card p-6 sm:p-8 space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">
              Username
            </label>
            <input
              type="text"
              name="userName"
              value={formData.userName}
              onChange={handleChange}
              className="glass-input"
              placeholder="Enter your username"
              autoComplete="username"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="glass-input"
              placeholder="Enter your password"
              autoComplete="current-password"
            />
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="glass-btn w-full flex items-center justify-center gap-2"
          >
            {submitting ? (
              <LoadingSpinner size="sm" />
            ) : (
              'Sign In'
            )}
          </button>

          <p className="text-center text-sm text-gray-500">
            Don't have an account?{' '}
            <Link to="/register" className="text-[#6c63ff] hover:text-[#a78bfa] transition-colors">
              Create one
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
