import React, { useState } from 'react';
import { Leaf, TrendingUp, Lightbulb, BarChart3, Target, Zap, Car, Plane } from 'lucide-react';
import Calculator from '../components/Calculator';
import Chart from '../components/Chart';

export default function Dashboard() {
  const [emissions, setEmissions] = useState(null);
  const [showCalculator, setShowCalculator] = useState(true);

  const handleCalculate = (calculatedEmissions) => {
    setEmissions(calculatedEmissions);
    setShowCalculator(false);
  };

  const resetCalculator = () => {
    setEmissions(null);
    setShowCalculator(true);
  };

  const features = [
    {
      icon: BarChart3,
      title: 'Track Smarter',
      description: 'Calculate your CO₂ emissions in minutes with our comprehensive calculator.',
      color: 'text-mint-600'
    },
    {
      icon: Target,
      title: 'Reduce Easier',
      description: 'Get personalized tips to lower your environmental impact.',
      color: 'text-forest-green-600'
    },
    {
      icon: TrendingUp,
      title: 'Visualize Progress',
      description: 'See your monthly emission trends and track improvements.',
      color: 'text-mint-600'
    },
    {
      icon: Lightbulb,
      title: 'Stay Informed',
      description: 'Learn from the latest sustainability news and insights.',
      color: 'text-forest-green-600'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-mint-50 to-forest-green-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-forest-green-600 to-mint-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="bg-white/20 p-4 rounded-full">
                <Leaf className="h-12 w-12" />
              </div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              Small Steps. Big Impact
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-white/90">
              with CarbonBuddy
            </p>
            <p className="text-lg max-w-3xl mx-auto text-white/80">
              CarbonBuddy helps you understand your carbon footprint and take small, 
              meaningful steps toward a cleaner planet.
            </p>
          </div>
        </div>
      </div>

      {/* Why Use CarbonBuddy */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-forest-green-900 mb-4">
              Why Use CarbonBuddy?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Make informed decisions about your environmental impact with our comprehensive tools.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="text-center group">
                  <div className="bg-mint-50 p-6 rounded-full w-20 h-20 mx-auto mb-4 group-hover:bg-forest-green-50 transition-colors">
                    <Icon className={`h-8 w-8 mx-auto ${feature.color}`} />
                  </div>
                  <h3 className="text-xl font-semibold text-forest-green-900 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Calculator Section */}
      <div className="py-16 bg-mint-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-forest-green-900 mb-4">
              Calculate Your Carbon Footprint
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Get an accurate measurement of your daily emissions across all major categories.
            </p>
          </div>

          {showCalculator ? (
            <Calculator onCalculate={handleCalculate} />
          ) : (
            <div className="space-y-8">
              <div className="flex justify-between items-center">
                <h3 className="text-2xl font-semibold text-forest-green-900">
                  Your Results
                </h3>
                <button
                  onClick={resetCalculator}
                  className="bg-forest-green-600 text-white px-4 py-2 rounded-md hover:bg-forest-green-700 transition-colors"
                >
                  Calculate Again
                </button>
              </div>
              <Chart emissions={emissions} />
            </div>
          )}
        </div>
      </div>

      {/* Quick Stats */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-forest-green-900 mb-4">
              Global Impact
            </h2>
            <p className="text-lg text-gray-600">
              Understanding the bigger picture
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center bg-mint-50 p-8 rounded-lg">
              <div className="bg-forest-green-600 p-4 rounded-full w-16 h-16 mx-auto mb-4">
                <Zap className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-forest-green-900 mb-2">4.7 tons</h3>
              <p className="text-gray-600">Average annual CO₂ emissions per person globally</p>
            </div>

            <div className="text-center bg-mint-50 p-8 rounded-lg">
              <div className="bg-forest-green-600 p-4 rounded-full w-16 h-16 mx-auto mb-4">
                <Car className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-forest-green-900 mb-2">2.4 tons</h3>
              <p className="text-gray-600">Average annual CO₂ emissions from transportation</p>
            </div>

            <div className="text-center bg-mint-50 p-8 rounded-lg">
              <div className="bg-forest-green-600 p-4 rounded-full w-16 h-16 mx-auto mb-4">
                <Plane className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-forest-green-900 mb-2">1.5 tons</h3>
              <p className="text-gray-600">Average annual CO₂ emissions from air travel</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
