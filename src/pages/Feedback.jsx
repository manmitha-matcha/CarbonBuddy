import React, { useState } from 'react';
import { Star, Send, MessageCircle, ThumbsUp, AlertCircle } from 'lucide-react';
import toast from 'react-hot-toast';

export default function Feedback() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    rating: 0,
    category: 'general',
    subject: '',
    message: '',
    anonymous: false
  });

  const [hoveredStar, setHoveredStar] = useState(0);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleStarClick = (rating) => {
    setFormData(prev => ({ ...prev, rating }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.message.trim()) {
      toast.error('Please provide your feedback message');
      return;
    }

    if (!formData.anonymous && !formData.email) {
      toast.error('Please provide your email address');
      return;
    }

    try {
      // Here you would typically send the feedback to your backend
      // For now, we'll simulate a successful submission
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast.success('Thank you for your feedback! We appreciate your input.');
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        rating: 0,
        category: 'general',
        subject: '',
        message: '',
        anonymous: false
      });
    } catch (error) {
      toast.error('Failed to submit feedback. Please try again.');
    }
  };

  const StarRating = ({ rating, onRatingChange, hoveredRating, onHover }) => (
    <div className="flex space-x-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => onRatingChange(star)}
          onMouseEnter={() => onHover(star)}
          onMouseLeave={() => onHover(0)}
          className={`transition-colors duration-200 ${
            star <= (hoveredRating || rating)
              ? 'text-yellow-400'
              : 'text-gray-300'
          } hover:text-yellow-400`}
        >
          <Star className="h-6 w-6 fill-current" />
        </button>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4 flex items-center justify-center">
            <MessageCircle className="h-10 w-10 mr-3 text-green-600" />
            Share Your Feedback
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Your feedback helps us improve CarbonBuddy and make it more useful for everyone. 
            We value your input and suggestions!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Feedback Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-xl p-8 border border-green-100">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Rating Section */}
                <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl p-6 border border-yellow-200">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                    <Star className="h-5 w-5 mr-2 text-yellow-500" />
                    Overall Rating
                  </h3>
                  <div className="flex items-center space-x-4">
                    <StarRating
                      rating={formData.rating}
                      onRatingChange={handleStarClick}
                      hoveredRating={hoveredStar}
                      onHover={setHoveredStar}
                    />
                    <span className="text-sm text-gray-600">
                      {formData.rating > 0 && `${formData.rating} star${formData.rating !== 1 ? 's' : ''}`}
                    </span>
                  </div>
                </div>

                {/* Category Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Feedback Category
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {[
                      { value: 'general', label: 'General', icon: '💬' },
                      { value: 'bug', label: 'Bug Report', icon: '🐛' },
                      { value: 'feature', label: 'Feature Request', icon: '✨' },
                      { value: 'ui', label: 'UI/UX', icon: '🎨' },
                      { value: 'performance', label: 'Performance', icon: '⚡' },
                      { value: 'calculation', label: 'Calculator', icon: '🧮' },
                      { value: 'tips', label: 'Tips & Advice', icon: '💡' },
                      { value: 'other', label: 'Other', icon: '📝' }
                    ].map((category) => (
                      <label
                        key={category.value}
                        className={`flex items-center p-3 border rounded-lg cursor-pointer transition-all ${
                          formData.category === category.value
                            ? 'border-green-500 bg-green-50'
                            : 'border-gray-200 hover:border-green-300'
                        }`}
                      >
                        <input
                          type="radio"
                          name="category"
                          value={category.value}
                          checked={formData.category === category.value}
                          onChange={handleChange}
                          className="mr-2"
                        />
                        <span className="text-sm font-medium">
                          {category.icon} {category.label}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Contact Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Name (Optional)
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all"
                      placeholder="Your name"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      disabled={formData.anonymous}
                      className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all ${
                        formData.anonymous ? 'bg-gray-100' : ''
                      }`}
                      placeholder="your@email.com"
                      required={!formData.anonymous}
                    />
                  </div>
                </div>

                {/* Anonymous Option */}
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    name="anonymous"
                    checked={formData.anonymous}
                    onChange={handleChange}
                    className="mr-2"
                  />
                  <label className="text-sm text-gray-700">
                    Submit anonymously
                  </label>
                </div>

                {/* Subject */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all"
                    placeholder="Brief description of your feedback"
                  />
                </div>

                {/* Message */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Your Feedback *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={6}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all resize-none"
                    placeholder="Please share your thoughts, suggestions, or report any issues you've encountered..."
                    required
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Minimum 10 characters required
                  </p>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-green-600 to-green-700 text-white py-4 px-6 rounded-xl hover:from-green-700 hover:to-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 focus:ring-offset-2 transition-all duration-300 transform hover:scale-105 shadow-lg text-lg font-semibold flex items-center justify-center"
                >
                  <Send className="h-5 w-5 mr-2" />
                  Submit Feedback
                </button>
              </form>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Feedback Guidelines */}
            <div className="bg-white rounded-xl shadow-lg p-6 border border-green-100">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                <ThumbsUp className="h-5 w-5 mr-2 text-green-600" />
                Feedback Guidelines
              </h3>
              <ul className="space-y-3 text-sm text-gray-600">
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  Be specific about your experience
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  Include steps to reproduce bugs
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  Suggest improvements constructively
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  Share what you liked about the app
                </li>
              </ul>
            </div>

            {/* Response Time */}
            <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
              <h3 className="text-lg font-semibold text-gray-800 mb-2 flex items-center">
                <AlertCircle className="h-5 w-5 mr-2 text-blue-600" />
                Response Time
              </h3>
              <p className="text-sm text-gray-600">
                We typically respond to feedback within 2-3 business days. 
                For urgent issues, please contact our support team directly.
              </p>
            </div>

            {/* Privacy Note */}
            <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                Privacy & Data
              </h3>
              <p className="text-sm text-gray-600">
                Your feedback is stored securely and used only to improve our service. 
                We never share your personal information with third parties.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
