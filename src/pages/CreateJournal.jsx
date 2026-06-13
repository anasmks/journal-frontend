import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import journalService from '../services/journalService';
import { useToast } from '../hooks/useToast';
import LoadingSpinner from '../components/LoadingSpinner';

const sentiments = ['HAPPY', 'SAD', 'ANGRY', 'EXCITED', 'NEUTRAL', 'ANXIOUS', 'GRATEFUL', 'HOPEFUL'];

const CreateJournal = () => {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    sentiment: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const { showToast } = useToast();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title || !formData.content) {
      showToast('Title and content are required', 'error');
      return;
    }
    setSubmitting(true);
    try {
      const payload = {
        title: formData.title,
        content: formData.content,
        date: new Date().toISOString().replace('Z', ''),
      };
      if (formData.sentiment) {
        payload.sentiment = formData.sentiment;
      }
      await journalService.create(payload);
      showToast('Journal entry created!', 'success');
      navigate('/journals');
    } catch (err) {
      const msg = err.response?.data || (err.code === 'ERR_NETWORK' ? 'Unable to connect to server. Please try again later.' : 'Failed to create journal entry');
      showToast(msg, 'error');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0f] pt-20 pb-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <div className="mb-8 animate-slideUp">
          <h1 className="text-3xl font-bold text-white">New Journal Entry</h1>
          <p className="text-gray-500 mt-2">Capture your thoughts and reflections</p>
        </div>

        <form onSubmit={handleSubmit} className="glass-card p-8 space-y-6 animate-slideUp">
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">
              Title <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="glass-input text-lg font-medium"
              placeholder="What's on your mind?"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">
              Content <span className="text-red-400">*</span>
            </label>
            <textarea
              name="content"
              value={formData.content}
              onChange={handleChange}
              rows={10}
              className="glass-input resize-y min-h-[200px]"
              placeholder="Write your thoughts here..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">
              Sentiment (optional)
            </label>
            <div className="flex flex-wrap gap-2">
              {sentiments.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setFormData((prev) => ({ ...prev, sentiment: s === prev.sentiment ? '' : s }))}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all border ${
                    formData.sentiment === s
                      ? 'bg-[#6c63ff]/20 text-[#6c63ff] border-[#6c63ff]/40'
                      : 'bg-white/5 text-gray-400 border-white/10 hover:bg-white/10'
                  }`}
                >
                  {s.charAt(0) + s.slice(1).toLowerCase()}
                </button>
              ))}
            </div>
          </div>

          <div className="flex gap-4 pt-4">
            <button
              type="submit"
              disabled={submitting}
              className="glass-btn flex items-center gap-2"
            >
              {submitting ? (
                <LoadingSpinner size="sm" />
              ) : (
                <>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Save Entry
                </>
              )}
            </button>
            <button
              type="button"
              onClick={() => navigate('/journals')}
              className="glass-btn-outline"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateJournal;
