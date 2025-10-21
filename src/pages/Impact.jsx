import React, { useState, useEffect } from 'react';
import { TrendingUp, Globe, Wind, Sun, Droplets, TreePine, RefreshCw, ExternalLink, Calendar } from 'lucide-react';

const newsData = [
  {
    id: 1,
    title: "Global Renewable Energy Capacity Reaches New Record",
    summary: "Solar and wind power installations hit unprecedented levels, with solar capacity increasing by 22% globally.",
    source: "Environmental News",
    date: "2024-01-15",
    category: "Renewable Energy",
    image: "https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=400&h=200&fit=crop",
    url: "#"
  },
  {
    id: 2,
    title: "New Climate Policy Targets 50% Emissions Reduction by 2030",
    summary: "Government announces comprehensive climate action plan focusing on transportation and energy sectors.",
    source: "Climate Policy Today",
    date: "2024-01-14",
    category: "Climate Policy",
    image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=400&h=200&fit=crop",
    url: "#"
  },
  {
    id: 3,
    title: "Ocean Cleanup Project Removes 100,000 Tons of Plastic",
    summary: "Innovative floating barriers successfully collect plastic waste from the Great Pacific Garbage Patch.",
    source: "Ocean Conservation",
    date: "2024-01-13",
    category: "Sustainability",
    image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400&h=200&fit=crop",
    url: "#"
  },
  {
    id: 4,
    title: "Electric Vehicle Sales Surge 40% Globally",
    summary: "EV adoption accelerates as charging infrastructure expands and battery costs continue to decline.",
    source: "Green Transport Weekly",
    date: "2024-01-12",
    category: "Sustainability",
    image: "https://images.unsplash.com/photo-1593941707882-a5bac6861d75?w=400&h=200&fit=crop",
    url: "#"
  },
  {
    id: 5,
    title: "Reforestation Initiative Plants 1 Million Trees",
    summary: "Community-led project successfully restores degraded forest areas across three continents.",
    source: "Forest Conservation",
    date: "2024-01-11",
    category: "Wildlife",
    image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=200&fit=crop",
    url: "#"
  },
  {
    id: 6,
    title: "Carbon Capture Technology Shows Promising Results",
    summary: "New direct air capture systems demonstrate 90% efficiency in removing CO2 from the atmosphere.",
    source: "Climate Tech News",
    date: "2024-01-10",
    category: "Renewable Energy",
    image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=400&h=200&fit=crop",
    url: "#"
  }
];

const impactStats = [
  {
    icon: Globe,
    value: "4.7 tons",
    label: "Average annual CO₂ emissions per person globally",
    color: "text-blue-600"
  },
  {
    icon: Wind,
    value: "2.4 tons",
    label: "Average annual CO₂ emissions from transportation",
    color: "text-green-600"
  },
  {
    icon: Sun,
    value: "1.5 tons",
    label: "Average annual CO₂ emissions from electricity",
    color: "text-yellow-600"
  },
  {
    icon: Droplets,
    value: "1.2 tons",
    label: "Average annual CO₂ emissions from food production",
    color: "text-cyan-600"
  }
];

export default function Impact() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [news, setNews] = useState(newsData);
  const [loading, setLoading] = useState(false);

  const categories = ['All', 'Climate Policy', 'Renewable Energy', 'Sustainability', 'Wildlife'];

  const filteredNews = selectedCategory === 'All' 
    ? news 
    : news.filter(article => article.category === selectedCategory);

  const handleRefresh = async () => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setNews([...newsData].sort(() => Math.random() - 0.5));
      setLoading(false);
    }, 1000);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-mint-50 to-forest-green-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <div className="bg-forest-green-600 p-4 rounded-full">
              <TrendingUp className="h-8 w-8 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-forest-green-900 mb-4">
            Impact & Awareness
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Understand the global impact of carbon emissions and stay informed with the latest environmental news.
          </p>
        </div>

        {/* Global Impact Stats */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-12">
          <h2 className="text-2xl font-bold text-forest-green-900 mb-6 text-center">
            Global Carbon Footprint Statistics
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {impactStats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="text-center">
                  <div className="bg-mint-50 p-4 rounded-full w-16 h-16 mx-auto mb-4">
                    <Icon className={`h-8 w-8 mx-auto ${stat.color}`} />
                  </div>
                  <h3 className="text-2xl font-bold text-forest-green-900 mb-2">
                    {stat.value}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {stat.label}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Why It Matters */}
        <div className="bg-gradient-to-r from-forest-green-600 to-mint-600 text-white rounded-lg p-8 mb-12">
          <h2 className="text-2xl font-bold mb-6">Why Carbon Footprint Reduction Matters</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <TreePine className="h-6 w-6 mr-3" />
                <h3 className="text-xl font-semibold">Climate Change</h3>
              </div>
              <p className="text-white/90">
                Reducing emissions helps slow global warming and prevents extreme weather events.
              </p>
            </div>
            
            <div>
              <div className="flex items-center mb-4">
                <Globe className="h-6 w-6 mr-3" />
                <h3 className="text-xl font-semibold">Ecosystem Health</h3>
              </div>
              <p className="text-white/90">
                Lower emissions protect biodiversity and maintain healthy ecosystems for future generations.
              </p>
            </div>
            
            <div>
              <div className="flex items-center mb-4">
                <Sun className="h-6 w-6 mr-3" />
                <h3 className="text-xl font-semibold">Air Quality</h3>
              </div>
              <p className="text-white/90">
                Cleaner air reduces respiratory diseases and improves overall public health.
              </p>
            </div>
          </div>
        </div>

        {/* Latest Environmental News */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-forest-green-900">
              Latest Environmental News
            </h2>
            <button
              onClick={handleRefresh}
              disabled={loading}
              className="flex items-center space-x-2 bg-forest-green-600 text-white px-4 py-2 rounded-md hover:bg-forest-green-700 disabled:opacity-50 transition-colors"
            >
              <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
              <span>Refresh</span>
            </button>
          </div>

          {/* Category Filter */}
          <div className="mb-6">
            <div className="flex flex-wrap gap-2">
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    selectedCategory === category
                      ? 'bg-forest-green-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* News Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredNews.map((article) => (
              <div key={article.id} className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
                <div className="aspect-w-16 aspect-h-9">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-48 object-cover"
                  />
                </div>
                
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-medium text-forest-green-600 bg-forest-green-100 px-2 py-1 rounded">
                      {article.category}
                    </span>
                    <div className="flex items-center text-xs text-gray-500">
                      <Calendar className="h-3 w-3 mr-1" />
                      {formatDate(article.date)}
                    </div>
                  </div>
                  
                  <h3 className="text-lg font-semibold text-forest-green-900 mb-2 line-clamp-2">
                    {article.title}
                  </h3>
                  
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                    {article.summary}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500">
                      {article.source}
                    </span>
                    <a
                      href={article.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center text-forest-green-600 hover:text-forest-green-700 text-sm font-medium"
                    >
                      Read More
                      <ExternalLink className="h-3 w-3 ml-1" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredNews.length === 0 && (
            <div className="text-center py-12">
              <TrendingUp className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No articles found</h3>
              <p className="text-gray-600">Try selecting a different category or refresh for new content.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
