import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Settings as SettingsIcon, User, Lock, Globe, Palette, Save, Eye, EyeOff } from 'lucide-react';
import toast from 'react-hot-toast';

export default function Settings() {
  const { currentUser, updateUserProfile } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  
  const [profileData, setProfileData] = useState({
    displayName: currentUser?.displayName || '',
    email: currentUser?.email || ''
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [preferences, setPreferences] = useState({
    units: currentUser?.preferences?.units || 'metric',
    theme: currentUser?.preferences?.theme || 'light'
  });

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      await updateUserProfile({
        displayName: profileData.displayName,
        email: profileData.email
      });
      toast.success('Profile updated successfully!');
    } catch (error) {
      toast.error('Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error('New passwords do not match');
      return;
    }
    
    if (passwordData.newPassword.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }
    
    setLoading(true);
    
    try {
      // Note: In a real app, you'd need to implement password change with Firebase Auth
      toast.success('Password change functionality would be implemented here');
      setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
    } catch (error) {
      toast.error('Failed to change password');
    } finally {
      setLoading(false);
    }
  };

  const handlePreferencesUpdate = async () => {
    setLoading(true);
    
    try {
      await updateUserProfile({
        preferences
      });
      toast.success('Preferences updated successfully!');
    } catch (error) {
      toast.error('Failed to update preferences');
    } finally {
      setLoading(false);
    }
  };

  const tabs = [
    { id: 'profile', name: 'Profile', icon: User },
    { id: 'security', name: 'Security', icon: Lock },
    { id: 'preferences', name: 'Preferences', icon: Globe }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-mint-50 to-forest-green-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <div className="bg-forest-green-600 p-4 rounded-full">
              <SettingsIcon className="h-8 w-8 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-forest-green-900 mb-4">
            Settings
          </h1>
          <p className="text-lg text-gray-600">
            Manage your account settings and preferences
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Tab Navigation */}
          <div className="border-b border-gray-200">
            <nav className="flex">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center space-x-2 px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
                      activeTab === tab.id
                        ? 'border-forest-green-500 text-forest-green-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                    <span>{tab.name}</span>
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {/* Profile Tab */}
            {activeTab === 'profile' && (
              <div>
                <h2 className="text-xl font-semibold text-forest-green-900 mb-6">
                  Profile Information
                </h2>
                
                <form onSubmit={handleProfileUpdate} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={profileData.displayName}
                      onChange={(e) => setProfileData({...profileData, displayName: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-forest-green-500 focus:border-forest-green-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={profileData.email}
                      onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-forest-green-500 focus:border-forest-green-500"
                    />
                  </div>
                  
                  <div className="bg-mint-50 p-4 rounded-lg">
                    <h3 className="text-sm font-medium text-gray-700 mb-2">Account Information</h3>
                    <p className="text-sm text-gray-600">
                      Member since: {currentUser?.createdAt ? new Date(currentUser.createdAt).toLocaleDateString() : 'N/A'}
                    </p>
                  </div>
                  
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex items-center space-x-2 bg-forest-green-600 text-white px-4 py-2 rounded-md hover:bg-forest-green-700 disabled:opacity-50 transition-colors"
                  >
                    <Save className="h-4 w-4" />
                    <span>{loading ? 'Saving...' : 'Save Changes'}</span>
                  </button>
                </form>
              </div>
            )}

            {/* Security Tab */}
            {activeTab === 'security' && (
              <div>
                <h2 className="text-xl font-semibold text-forest-green-900 mb-6">
                  Security Settings
                </h2>
                
                <form onSubmit={handlePasswordChange} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Current Password
                    </label>
                    <div className="relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        value={passwordData.currentPassword}
                        onChange={(e) => setPasswordData({...passwordData, currentPassword: e.target.value})}
                        className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-forest-green-500 focus:border-forest-green-500"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center"
                      >
                        {showPassword ? (
                          <EyeOff className="h-5 w-5 text-gray-400" />
                        ) : (
                          <Eye className="h-5 w-5 text-gray-400" />
                        )}
                      </button>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      New Password
                    </label>
                    <input
                      type="password"
                      value={passwordData.newPassword}
                      onChange={(e) => setPasswordData({...passwordData, newPassword: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-forest-green-500 focus:border-forest-green-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Confirm New Password
                    </label>
                    <input
                      type="password"
                      value={passwordData.confirmPassword}
                      onChange={(e) => setPasswordData({...passwordData, confirmPassword: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-forest-green-500 focus:border-forest-green-500"
                    />
                  </div>
                  
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex items-center space-x-2 bg-forest-green-600 text-white px-4 py-2 rounded-md hover:bg-forest-green-700 disabled:opacity-50 transition-colors"
                  >
                    <Lock className="h-4 w-4" />
                    <span>{loading ? 'Updating...' : 'Update Password'}</span>
                  </button>
                </form>
              </div>
            )}

            {/* Preferences Tab */}
            {activeTab === 'preferences' && (
              <div>
                <h2 className="text-xl font-semibold text-forest-green-900 mb-6">
                  Preferences
                </h2>
                
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Units
                    </label>
                    <select
                      value={preferences.units}
                      onChange={(e) => setPreferences({...preferences, units: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-forest-green-500 focus:border-forest-green-500"
                    >
                      <option value="metric">Metric (km, kg)</option>
                      <option value="imperial">Imperial (miles, lbs)</option>
                    </select>
                    <p className="text-sm text-gray-500 mt-1">
                      Choose your preferred unit system for calculations
                    </p>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Theme
                    </label>
                    <div className="flex space-x-4">
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="theme"
                          value="light"
                          checked={preferences.theme === 'light'}
                          onChange={(e) => setPreferences({...preferences, theme: e.target.value})}
                          className="mr-2"
                        />
                        <span className="text-sm">Light Green</span>
                      </label>
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="theme"
                          value="dark"
                          checked={preferences.theme === 'dark'}
                          onChange={(e) => setPreferences({...preferences, theme: e.target.value})}
                          className="mr-2"
                        />
                        <span className="text-sm">Dark Green</span>
                      </label>
                    </div>
                    <p className="text-sm text-gray-500 mt-1">
                      Choose your preferred color theme
                    </p>
                  </div>
                  
                  <button
                    onClick={handlePreferencesUpdate}
                    disabled={loading}
                    className="flex items-center space-x-2 bg-forest-green-600 text-white px-4 py-2 rounded-md hover:bg-forest-green-700 disabled:opacity-50 transition-colors"
                  >
                    <Save className="h-4 w-4" />
                    <span>{loading ? 'Saving...' : 'Save Preferences'}</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
