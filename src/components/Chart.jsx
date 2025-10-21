import React from 'react';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const COLORS = ['#22c55e', '#16a34a', '#15803d', '#166534', '#14532d'];

export default function Chart({ emissions }) {
  const pieData = [
    { name: 'Transportation', value: emissions.car, color: '#22c55e' },
    { name: 'Electricity', value: emissions.electricity, color: '#16a34a' },
    { name: 'Air Travel', value: emissions.flight, color: '#15803d' },
    { name: 'Diet', value: emissions.diet, color: '#166534' },
    { name: 'Domestic', value: emissions.domestic, color: '#14532d' }
  ].filter(item => item.value > 0);

  const barData = [
    { category: 'Transportation', emissions: emissions.car },
    { category: 'Electricity', emissions: emissions.electricity },
    { category: 'Air Travel', emissions: emissions.flight },
    { category: 'Diet', emissions: emissions.diet },
    { category: 'Domestic', emissions: emissions.domestic }
  ];

  const formatTooltip = (value) => `${value.toFixed(2)} kg CO₂e`;

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-semibold text-forest-green-900 mb-6">
        Your Carbon Footprint Breakdown
      </h3>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Pie Chart */}
        <div>
          <h4 className="text-lg font-medium text-gray-800 mb-4">Daily Emissions by Category</h4>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip formatter={formatTooltip} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Bar Chart */}
        <div>
          <h4 className="text-lg font-medium text-gray-800 mb-4">Emissions Comparison</h4>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={barData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="category" />
              <YAxis />
              <Tooltip formatter={formatTooltip} />
              <Bar dataKey="emissions" fill="#22c55e" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-mint-50 p-4 rounded-lg">
          <h5 className="text-sm font-medium text-gray-600">Daily Total</h5>
          <p className="text-2xl font-bold text-forest-green-600">
            {emissions.total.toFixed(2)} kg CO₂e
          </p>
        </div>
        
        <div className="bg-mint-50 p-4 rounded-lg">
          <h5 className="text-sm font-medium text-gray-600">Monthly Estimate</h5>
          <p className="text-2xl font-bold text-forest-green-600">
            {(emissions.total * 30).toFixed(1)} kg CO₂e
          </p>
        </div>
        
        <div className="bg-mint-50 p-4 rounded-lg">
          <h5 className="text-sm font-medium text-gray-600">Annual Estimate</h5>
          <p className="text-2xl font-bold text-forest-green-600">
            {(emissions.total * 365).toFixed(0)} kg CO₂e
          </p>
        </div>
      </div>

      {/* Insight Card */}
      <div className="mt-6 bg-gradient-to-r from-mint-100 to-forest-green-100 p-4 rounded-lg">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <div className="w-8 h-8 bg-forest-green-600 rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-bold">🌱</span>
            </div>
          </div>
          <div className="ml-3">
            <p className="text-sm text-forest-green-800">
              <span className="font-medium">Great work!</span> Your daily emissions are 
              <span className="font-bold"> {((4.7 * 1000 / 365 - emissions.total) / (4.7 * 1000 / 365) * 100).toFixed(0)}%</span> below 
              the global average of 4.7 tons per year.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
