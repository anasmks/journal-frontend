import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useToast } from '../hooks/useToast';
import userService from '../services/userService';
import LoadingSpinner from '../components/LoadingSpinner';

const Profile = () => {
  const { user, logout } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    userName: user?.userName || '',
    password: '',
    confirmPassword: '',
  });
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (formData.password && formData.password.length < 6) {
      showToast('Password must be at least 6 characters', 'error');
      return;
    }
    if (formData.password && formData.password !== formData.confirmPassword) {
      showToast('Passwords do not match', 'error');
      return;
    }
    setSubmitting(true);
    try {
      const payload = {};
      if (formData.userName !== user?.userName) payload.userName = formData.userName;
      if (formData.password) payload.password = formData.password;
      if (Object.keys(payload).length === 0) {
        showToast('Nothing to update', 'error');
        setSubmitting(false);
        return;
      }
      await userService.updateProfile(payload);
      showToast('Profile updated! Please log in again.', 'success');
      logout();
      navigate('/login');
    } catch (err) {
      const msg = err.response?.data || 'Update failed';
      showToast(msg, 'error');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Are you sure? This permanently deletes your account and all entries.')) return;
    if (!window.confirm('This cannot be undone. Continue?')) return;
    try {
      await userService.deleteAccount();
      showToast('Account deleted', 'success');
      logout();
      navigate('/login');
    } catch (err) {
      showToast('Failed to delete account', 'error');
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0f] pt-20 pb-12">
      <div className="max-w-2xl mx-auto px-4 sm:px-6">
        <div className="mb-8 animate-slideUp">
          <h1 className="text-3xl font-bold text-white">Profile</h1>
          <p className="text-gray-500 mt-2">Manage your account settings</p>
        </div>

        <div className="glass-card p-8 mb-6 animate-slideUp">
          <div className="flex items-center gap-4 mb-6 pb-6 border-b border-white/5">
            <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-[#6c63ff] to-[#a78bfa] flex items-center justify-center text-white font-bold text-2xl">
              {user?.userName?.charAt(0)?.toUpperCase() || 'U'}
            </div>
            <div>
              <h2 className="text-xl font-semibold text-white">{user?.userName}</h2>
              <p className="text-sm text-gray-500">Active account</p>
            </div>
          </div>

          <form onSubmit={handleUpdate} className="space-y-4">
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
                placeholder="Username"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                New Password (leave blank to keep current)
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="glass-input"
                placeholder="New password"
                autoComplete="new-password"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                Confirm New Password
              </label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="glass-input"
                placeholder="Confirm new password"
                autoComplete="new-password"
              />
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="glass-btn flex items-center gap-2"
            >
              {submitting ? (
                <LoadingSpinner size="sm" />
              ) : (
                'Update Profile'
              )}
            </button>
          </form>
        </div>

        <div className="glass-card p-8 animate-slideUp border-red-500/20">
          <h3 className="text-lg font-semibold text-red-400 mb-2">Danger Zone</h3>
          <p className="text-sm text-gray-500 mb-4">
            Permanently delete your account and all journal entries. This action cannot be undone.
          </p>
          <button
            onClick={handleDelete}
            className="glass-btn-danger"
          >
            Delete Account
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
