import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { HiSparkles } from 'react-icons/hi';
import { useAuth } from '../hooks/useAuth';
import { useToast } from '../hooks/useToast';
import LoadingSpinner from '../components/LoadingSpinner';

const Register = () => {
  const [formData, setFormData] = useState({
    userName: '',
    email: '',
    password: '',
    confirmPassword: '',
    sentimentAnalysis: false,
  });
  const [submitting, setSubmitting] = useState(false);
  const { register } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setFormData((prev) => ({ ...prev, [e.target.name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.userName || !formData.email || !formData.password) {
      showToast('Please fill all required fields', 'error');
      return;
    }
    if (!/^[a-zA-Z0-9]+$/.test(formData.userName)) {
      showToast('Username can only contain letters and numbers', 'error');
      return;
    }
    if (formData.userName.length < 3) {
      showToast('Username must be at least 3 characters', 'error');
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      showToast('Passwords do not match', 'error');
      return;
    }
    if (formData.password.length < 6) {
      showToast('Password must be at least 6 characters', 'error');
      return;
    }
    setSubmitting(true);
    try {
      await register({
        userName: formData.userName,
        email: formData.email,
        password: formData.password,
        sentimentAnalysis: formData.sentimentAnalysis,
      });
      showToast('Account created! Please sign in.', 'success');
      navigate('/login');
    } catch (err) {
      const msg = err.response?.data?.message || (err.code === 'ERR_NETWORK' ? 'Unable to connect to server. Please try again later.' : 'Registration failed. Try again.');
      showToast(msg, 'error');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-start sm:items-center justify-center bg-[#0a0a0f] px-4 pt-14 sm:pt-24 pb-12">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -left-40 w-80 h-80 rounded-full bg-[#6c63ff] opacity-10 blur-3xl" />
        <div className="absolute -bottom-40 -right-40 w-80 h-80 rounded-full bg-[#a78bfa] opacity-10 blur-3xl" />
      </div>

      <div className="w-full max-w-md relative animate-slideUp">
        <div className="text-center mb-8">
          <div className="relative w-16 h-16 rounded-2xl overflow-hidden mx-auto mb-4 ring-2 ring-[#6c63ff]/30 shadow-lg shadow-[#6c63ff]/10">
            <img src="/sign-up.png" alt="Register" className="w-full h-full object-cover" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white">Create Account</h1>
          <p className="text-gray-500 mt-2">Start your journaling journey</p>
        </div>

        <form onSubmit={handleSubmit} className="glass-card p-6 sm:p-8 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">
              Username <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              name="userName"
              value={formData.userName}
              onChange={handleChange}
              className="glass-input"
              placeholder="Letters and numbers only"
              autoComplete="username"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">
              Email <span className="text-red-400">*</span>
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="glass-input"
              placeholder="your@email.com"
              autoComplete="email"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">
              Password <span className="text-red-400">*</span>
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="glass-input"
              placeholder="At least 6 characters"
              autoComplete="new-password"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">
              Confirm Password <span className="text-red-400">*</span>
            </label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="glass-input"
              placeholder="Repeat your password"
              autoComplete="new-password"
            />
          </div>

          <label className="flex items-center justify-between p-4 rounded-xl bg-white/[0.03] border border-white/[0.06] cursor-pointer group hover:bg-white/[0.05] transition-colors duration-200">
            <div className="flex items-center gap-3">
              <HiSparkles className={`text-lg transition-colors duration-300 ${formData.sentimentAnalysis ? 'text-[#6c63ff]' : 'text-gray-600'}`} />
              <span className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors">
                Sentiment Analysis
              </span>
            </div>
            <div className="relative">
              <input
                type="checkbox"
                name="sentimentAnalysis"
                checked={formData.sentimentAnalysis}
                onChange={handleChange}
                className="sr-only"
              />
              <div className={`relative w-11 h-6 rounded-full transition-colors duration-300 ${formData.sentimentAnalysis ? 'bg-[#6c63ff]' : 'bg-white/[0.1]'}`}>
                <div className={`w-5 h-5 rounded-full bg-white shadow-md transform transition-transform duration-300 top-1/2 -translate-y-1/2 absolute ${formData.sentimentAnalysis ? 'translate-x-[22px]' : 'translate-x-0.5'}`} />
              </div>
            </div>
          </label>

          <button
            type="submit"
            disabled={submitting}
            className="glass-btn w-full flex items-center justify-center gap-2 mt-2"
          >
            {submitting ? (
              <LoadingSpinner size="sm" />
            ) : (
              'Create Account'
            )}
          </button>

          <p className="text-center text-sm text-gray-500">
            Already have an account?{' '}
            <Link to="/login" className="text-[#6c63ff] hover:text-[#a78bfa] transition-colors">
              Sign in
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
