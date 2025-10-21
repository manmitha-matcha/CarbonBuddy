import React, { useState } from 'react';
import { Lightbulb, Star, Bookmark, Filter, ChevronDown, ChevronUp } from 'lucide-react';

const tipsData = [
  {
    id: 1,
    category: 'Transportation',
    level: 'beginner',
    title: 'Use Public Transportation',
    description: 'Switch to public transport twice a week to reduce your carbon footprint by up to 40%.',
    impact: 'High',
    difficulty: 'Easy',
    time: '5 minutes planning',
    saved: '2.5 kg CO₂e per week'
  },
  {
    id: 2,
    category: 'Transportation',
    level: 'advanced',
    title: 'Switch to Electric Vehicle',
    description: 'Consider an electric vehicle for your next car purchase. EVs produce 50% fewer emissions over their lifetime.',
    impact: 'Very High',
    difficulty: 'Hard',
    time: 'Research and purchase',
    saved: '1.2 tons CO₂e per year'
  },
  {
    id: 3,
    category: 'Energy',
    level: 'beginner',
    title: 'Unplug Idle Devices',
    description: 'Unplug devices when not in use. Even in standby mode, they consume energy.',
    impact: 'Medium',
    difficulty: 'Easy',
    time: '2 minutes daily',
    saved: '0.3 kg CO₂e per week'
  },
  {
    id: 4,
    category: 'Energy',
    level: 'beginner',
    title: 'Switch to LED Bulbs',
    description: 'Replace incandescent bulbs with LED bulbs. They use 75% less energy and last 25 times longer.',
    impact: 'Medium',
    difficulty: 'Easy',
    time: '15 minutes',
    saved: '0.5 kg CO₂e per month'
  },
  {
    id: 5,
    category: 'Energy',
    level: 'advanced',
    title: 'Install Solar Panels',
    description: 'Generate your own clean energy with solar panels. Many governments offer incentives.',
    impact: 'Very High',
    difficulty: 'Hard',
    time: 'Installation required',
    saved: '2.5 tons CO₂e per year'
  },
  {
    id: 6,
    category: 'Diet',
    level: 'beginner',
    title: 'Meat-Free Mondays',
    description: 'Start with one meat-free day per week. Livestock production is a major source of emissions.',
    impact: 'High',
    difficulty: 'Easy',
    time: 'Meal planning',
    saved: '0.8 kg CO₂e per week'
  },
  {
    id: 7,
    category: 'Diet',
    level: 'advanced',
    title: 'Go Plant-Based',
    description: 'Adopt a plant-based diet. This can reduce your food-related emissions by up to 70%.',
    impact: 'Very High',
    difficulty: 'Medium',
    time: 'Lifestyle change',
    saved: '1.5 tons CO₂e per year'
  },
  {
    id: 8,
    category: 'Lifestyle',
    level: 'beginner',
    title: 'Reduce, Reuse, Recycle',
    description: 'Follow the three Rs. Reduce consumption, reuse items, and recycle properly.',
    impact: 'Medium',
    difficulty: 'Easy',
    time: 'Daily practice',
    saved: '0.4 kg CO₂e per week'
  },
  {
    id: 9,
    category: 'Lifestyle',
    level: 'beginner',
    title: 'Buy Local and Seasonal',
    description: 'Choose local, seasonal produce to reduce transportation emissions.',
    impact: 'Medium',
    difficulty: 'Easy',
    time: 'Shopping choice',
    saved: '0.2 kg CO₂e per week'
  },
  {
    id: 10,
    category: 'Lifestyle',
    level: 'advanced',
    title: 'Minimize Air Travel',
    description: 'Choose train travel for short distances and video calls for business meetings.',
    impact: 'Very High',
    difficulty: 'Medium',
    time: 'Planning required',
    saved: '1.8 tons CO₂e per year'
  }
];

export default function Tips() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedLevel, setSelectedLevel] = useState('All');
  const [savedTips, setSavedTips] = useState(new Set());
  const [showFilters, setShowFilters] = useState(false);

  const categories = ['All', 'Transportation', 'Energy', 'Diet', 'Lifestyle'];
  const levels = ['All', 'beginner', 'advanced'];

  const filteredTips = tipsData.filter(tip => {
    const categoryMatch = selectedCategory === 'All' || tip.category === selectedCategory;
    const levelMatch = selectedLevel === 'All' || tip.level === selectedLevel;
    return categoryMatch && levelMatch;
  });

  const toggleSaved = (tipId) => {
    const newSaved = new Set(savedTips);
    if (newSaved.has(tipId)) {
      newSaved.delete(tipId);
    } else {
      newSaved.add(tipId);
    }
    setSavedTips(newSaved);
  };

  const getImpactColor = (impact) => {
    switch (impact) {
      case 'Very High': return 'text-red-600 bg-red-100';
      case 'High': return 'text-orange-600 bg-orange-100';
      case 'Medium': return 'text-yellow-600 bg-yellow-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Hard': return 'text-red-600 bg-red-100';
      case 'Medium': return 'text-yellow-600 bg-yellow-100';
      case 'Easy': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-mint-50 to-forest-green-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <div className="bg-forest-green-600 p-4 rounded-full">
              <Lightbulb className="h-8 w-8 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-forest-green-900 mb-4">
            Personalized Eco-Tips
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover actionable tips to reduce your carbon footprint. Start with beginner tips and work your way up to advanced strategies.
          </p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center space-x-2 text-forest-green-600 hover:text-forest-green-700"
              >
                <Filter className="h-5 w-5" />
                <span>Filters</span>
                {showFilters ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
              </button>
            </div>
            
            <div className="text-sm text-gray-600">
              {filteredTips.length} tips found
            </div>
          </div>

          {showFilters && (
            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category
                  </label>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-forest-green-500 focus:border-forest-green-500"
                  >
                    {categories.map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Difficulty Level
                  </label>
                  <select
                    value={selectedLevel}
                    onChange={(e) => setSelectedLevel(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-forest-green-500 focus:border-forest-green-500"
                  >
                    {levels.map(level => (
                      <option key={level} value={level}>
                        {level === 'All' ? 'All Levels' : level.charAt(0).toUpperCase() + level.slice(1)}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Tips Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTips.map((tip) => (
            <div key={tip.id} className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center space-x-2">
                  <span className="text-xs font-medium text-forest-green-600 bg-forest-green-100 px-2 py-1 rounded">
                    {tip.category}
                  </span>
                  <span className={`text-xs font-medium px-2 py-1 rounded ${
                    tip.level === 'beginner' ? 'text-green-600 bg-green-100' : 'text-blue-600 bg-blue-100'
                  }`}>
                    {tip.level.charAt(0).toUpperCase() + tip.level.slice(1)}
                  </span>
                </div>
                <button
                  onClick={() => toggleSaved(tip.id)}
                  className={`p-1 rounded-full transition-colors ${
                    savedTips.has(tip.id) 
                      ? 'text-yellow-500 hover:text-yellow-600' 
                      : 'text-gray-400 hover:text-yellow-500'
                  }`}
                >
                  <Star className={`h-5 w-5 ${savedTips.has(tip.id) ? 'fill-current' : ''}`} />
                </button>
              </div>

              <h3 className="text-lg font-semibold text-forest-green-900 mb-2">
                {tip.title}
              </h3>
              
              <p className="text-gray-600 mb-4">
                {tip.description}
              </p>

              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Impact:</span>
                  <span className={`px-2 py-1 rounded text-xs font-medium ${getImpactColor(tip.impact)}`}>
                    {tip.impact}
                  </span>
                </div>
                
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Difficulty:</span>
                  <span className={`px-2 py-1 rounded text-xs font-medium ${getDifficultyColor(tip.difficulty)}`}>
                    {tip.difficulty}
                  </span>
                </div>
                
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Time:</span>
                  <span className="text-gray-700">{tip.time}</span>
                </div>
              </div>

              <div className="bg-mint-50 p-3 rounded-lg">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-forest-green-600 rounded-full"></div>
                  <span className="text-sm font-medium text-forest-green-800">
                    Saves {tip.saved}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredTips.length === 0 && (
          <div className="text-center py-12">
            <Lightbulb className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No tips found</h3>
            <p className="text-gray-600">Try adjusting your filters to see more tips.</p>
          </div>
        )}
      </div>
    </div>
  );
}
