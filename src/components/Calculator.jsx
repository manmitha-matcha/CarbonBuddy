import React, { useState } from 'react';
import { Car, Zap, Plane, Utensils, Home, Droplets, Wind, Bike, Bus, Users, Star, Battery } from 'lucide-react';
import StarRating from './StarRating';
import { useAuth } from '../contexts/AuthContext';
import CarbonFootprintService from '../firebase/database';
import toast from 'react-hot-toast';

const CO2_FACTORS = {
  transport: {
  car: {
    petrol: 0.271, // kg CO2e/km
    diesel: 0.300
  },
    bike: 0.05, // kg CO2e/km (minimal)
    public: 0.089, // kg CO2e/km (bus/train average)
    electric: 0.053, // kg CO2e/km (electric vehicle with grid electricity)
  },
  electricity: 0.82, // kg CO2e/kWh (Indian grid)
  flight: 0.115, // kg CO2e/km
  diet: {
    'meat-heavy': 3.3, // kg CO2e/day
    'balanced': 2.5,
    'vegetarian': 1.7,
    'vegan': 1.5
  },
  domestic: {
    laundry: 0.6, // kg CO2e/load
    dishwasher: 0.4, // kg CO2e/cycle
    shower: 0.1, // kg CO2e/minute
    heating: 0.2, // kg CO2e/hour
    cooking: 0.3 // kg CO2e/meal
  },
  appliances: {
    fan: 75, // watts
    light: 20, // watts
    tv: 100, // watts
    fridge: 150, // watts
    ac: 2000, // watts
    washing_machine: 500, // watts
    microwave: 1000, // watts
    geyser: 2000 // watts
  }
};

export default function Calculator({ onCalculate }) {
  const { currentUser } = useAuth();
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState({
    // Transport
    transportType: 'car',
    carMileage: '',
    fuelType: 'petrol',
    bikeMileage: '',
    publicMileage: '',
    electricMileage: '',
    
    // Household
    householdType: 'urban',
    roomCount: '',
    applianceCount: '',
    
    // Energy
    electricityUsage: '',
    applianceEstimation: false,
    fanHours: '',
    lightHours: '',
    tvHours: '',
    fridgeHours: '',
    acHours: '',
    washingMachineHours: '',
    microwaveHours: '',
    geyserHours: '',
    
    // Appliance Ratings
    fanRating: 0,
    lightRating: 0,
    tvRating: 0,
    fridgeRating: 0,
    acRating: 0,
    washingMachineRating: 0,
    microwaveRating: 0,
    geyserRating: 0,
    
    // Travel
    flightHours: '',
    
    // Lifestyle
    dietType: 'balanced',
    laundryLoads: '',
    dishwasherCycles: '',
    showerMinutes: '',
    heatingHours: '',
    cookingMeals: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleRatingChange = (appliance, rating) => {
    setFormData(prev => ({
      ...prev,
      [`${appliance}Rating`]: rating
    }));
  };

  const calculateEmissions = () => {
    const emissions = {
      transport: 0,
      electricity: 0,
      flight: 0,
      diet: 0,
      domestic: 0,
      total: 0
    };

    // Transport emissions
    if (formData.transportType === 'car' && formData.carMileage) {
      emissions.transport = parseFloat(formData.carMileage) * CO2_FACTORS.transport.car[formData.fuelType];
    } else if (formData.transportType === 'bike' && formData.bikeMileage) {
      emissions.transport = parseFloat(formData.bikeMileage) * CO2_FACTORS.transport.bike;
    } else if (formData.transportType === 'public' && formData.publicMileage) {
      emissions.transport = parseFloat(formData.publicMileage) * CO2_FACTORS.transport.public;
    } else if (formData.transportType === 'electric' && formData.electricMileage) {
      emissions.transport = parseFloat(formData.electricMileage) * CO2_FACTORS.transport.electric;
    }

    // Electricity emissions - two methods
    if (formData.applianceEstimation) {
      // Appliance-based estimation
      let totalWatts = 0;
      const appliances = [
        { key: 'fanHours', watts: CO2_FACTORS.appliances.fan },
        { key: 'lightHours', watts: CO2_FACTORS.appliances.light },
        { key: 'tvHours', watts: CO2_FACTORS.appliances.tv },
        { key: 'fridgeHours', watts: CO2_FACTORS.appliances.fridge },
        { key: 'acHours', watts: CO2_FACTORS.appliances.ac },
        { key: 'washingMachineHours', watts: CO2_FACTORS.appliances.washing_machine },
        { key: 'microwaveHours', watts: CO2_FACTORS.appliances.microwave },
        { key: 'geyserHours', watts: CO2_FACTORS.appliances.geyser }
      ];

      appliances.forEach(appliance => {
        if (formData[appliance.key]) {
          totalWatts += parseFloat(formData[appliance.key]) * appliance.watts;
        }
      });

      // Convert to kWh and apply CO2 factor
      const kwh = (totalWatts * 30) / 1000; // 30 days
      emissions.electricity = kwh * CO2_FACTORS.electricity;
    } else if (formData.electricityUsage) {
      // Direct electricity usage - convert hours to kWh
      // Assuming average household power consumption of 1kW per hour
      const dailyKwh = parseFloat(formData.electricityUsage) * 1; // 1kW per hour
      const monthlyKwh = dailyKwh * 30; // 30 days
      emissions.electricity = monthlyKwh * CO2_FACTORS.electricity;
    } else {
      // Default estimation based on household type
      const defaultHours = formData.householdType === 'urban' ? 10 : 5; // hours per day
      const dailyKwh = defaultHours * 1; // 1kW per hour
      const monthlyKwh = dailyKwh * 30; // 30 days
      emissions.electricity = monthlyKwh * CO2_FACTORS.electricity;
    }

    // Flight emissions (assuming average speed of 800 km/h)
    if (formData.flightHours) {
      const flightKm = parseFloat(formData.flightHours) * 800;
      emissions.flight = flightKm * CO2_FACTORS.flight;
    }

    // Diet emissions (daily)
    emissions.diet = CO2_FACTORS.diet[formData.dietType];

    // Domestic emissions
    if (formData.laundryLoads) {
      emissions.domestic += parseFloat(formData.laundryLoads) * CO2_FACTORS.domestic.laundry;
    }
    if (formData.dishwasherCycles) {
      emissions.domestic += parseFloat(formData.dishwasherCycles) * CO2_FACTORS.domestic.dishwasher;
    }
    if (formData.showerMinutes) {
      emissions.domestic += parseFloat(formData.showerMinutes) * CO2_FACTORS.domestic.shower;
    }
    if (formData.heatingHours) {
      emissions.domestic += parseFloat(formData.heatingHours) * CO2_FACTORS.domestic.heating;
    }
    if (formData.cookingMeals) {
      emissions.domestic += parseFloat(formData.cookingMeals) * CO2_FACTORS.domestic.cooking;
    }

    emissions.total = emissions.transport + emissions.electricity + emissions.flight + emissions.diet + emissions.domestic;

    return emissions;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const emissions = calculateEmissions();
    
    // Save to database if user is logged in
    if (currentUser) {
      setIsSaving(true);
      try {
        const footprintData = {
          formData,
          emissions,
          calculatedAt: new Date().toISOString()
        };
        
        await CarbonFootprintService.saveFootprintData(currentUser.uid, footprintData);
        toast.success('Carbon footprint data saved successfully!');
      } catch (error) {
        console.error('Error saving footprint data:', error);
        toast.error('Failed to save data. Please try again.');
      } finally {
        setIsSaving(false);
      }
    }
    
    onCalculate(emissions);
  };

  return (
    <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-2xl shadow-xl p-8 border border-green-100">
      <div className="text-center mb-8">
        <h3 className="text-3xl font-bold text-gray-800 mb-2">
          🌱 Your Carbon Footprint Calculator
      </h3>
        <p className="text-gray-600">
          Discover your environmental impact and take steps towards a greener future
        </p>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Household Type */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h4 className="text-xl font-semibold text-gray-800 flex items-center mb-4">
            <Users className="h-6 w-6 mr-3 text-green-600" />
            Your Household
          </h4>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Household Type
              </label>
              <select
                name="householdType"
                value={formData.householdType}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all"
              >
                <option value="urban">🏙️ Urban</option>
                <option value="rural">🌾 Rural</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Number of Rooms
              </label>
              <input
                type="number"
                name="roomCount"
                value={formData.roomCount}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all"
                placeholder="e.g., 3"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Number of Appliances
              </label>
              <input
                type="number"
                name="applianceCount"
                value={formData.applianceCount}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all"
                placeholder="e.g., 8"
              />
            </div>
          </div>
        </div>

        {/* Transportation */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h4 className="text-xl font-semibold text-gray-800 flex items-center mb-4">
            <Car className="h-6 w-6 mr-3 text-green-600" />
            Daily Transportation
          </h4>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                How do you usually travel?
              </label>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                <label className={`flex items-center p-4 border rounded-lg cursor-pointer transition-all ${
                  formData.transportType === 'car' ? 'border-green-500 bg-green-50' : 'border-gray-200'
                }`}>
                  <input
                    type="radio"
                    name="transportType"
                    value="car"
                    checked={formData.transportType === 'car'}
                    onChange={handleChange}
                    className="mr-3"
                  />
                  <Car className="h-5 w-5 mr-2" />
                  Car
                </label>
                
                <label className={`flex items-center p-4 border rounded-lg cursor-pointer transition-all ${
                  formData.transportType === 'bike' ? 'border-green-500 bg-green-50' : 'border-gray-200'
                }`}>
                  <input
                    type="radio"
                    name="transportType"
                    value="bike"
                    checked={formData.transportType === 'bike'}
                    onChange={handleChange}
                    className="mr-3"
                  />
                  <Bike className="h-5 w-5 mr-2" />
                  Bike
                </label>
                
                <label className={`flex items-center p-4 border rounded-lg cursor-pointer transition-all ${
                  formData.transportType === 'public' ? 'border-green-500 bg-green-50' : 'border-gray-200'
                }`}>
                  <input
                    type="radio"
                    name="transportType"
                    value="public"
                    checked={formData.transportType === 'public'}
                    onChange={handleChange}
                    className="mr-3"
                  />
                  <Bus className="h-5 w-5 mr-2" />
                  Public Transport
                </label>
                
                <label className={`flex items-center p-4 border rounded-lg cursor-pointer transition-all ${
                  formData.transportType === 'electric' ? 'border-green-500 bg-green-50' : 'border-gray-200'
                }`}>
                  <input
                    type="radio"
                    name="transportType"
                    value="electric"
                    checked={formData.transportType === 'electric'}
                    onChange={handleChange}
                    className="mr-3"
                  />
                  <Battery className="h-5 w-5 mr-2" />
                  Electric Vehicle
                </label>
              </div>
            </div>
            
            {formData.transportType === 'car' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Daily Distance (km)
                  </label>
                  <input
                    type="number"
                    name="carMileage"
                    value={formData.carMileage}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all"
                    placeholder="e.g., 25"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Fuel Type
              </label>
              <select
                name="fuelType"
                value={formData.fuelType}
                onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all"
              >
                    <option value="petrol">⛽ Petrol</option>
                    <option value="diesel">🚗 Diesel</option>
              </select>
            </div>
              </div>
            )}
            
            {formData.transportType === 'bike' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Daily Distance (km)
                </label>
                <input
                  type="number"
                  name="bikeMileage"
                  value={formData.bikeMileage}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all"
                  placeholder="e.g., 10"
                />
              </div>
            )}
            
            {formData.transportType === 'public' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Daily Distance (km)
                </label>
                <input
                  type="number"
                  name="publicMileage"
                  value={formData.publicMileage}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all"
                  placeholder="e.g., 15"
                />
              </div>
            )}
            
            {formData.transportType === 'electric' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Daily Distance (km)
                </label>
                <input
                  type="number"
                  name="electricMileage"
                  value={formData.electricMileage}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all"
                  placeholder="e.g., 30"
                />
                <p className="text-xs text-gray-500 mt-1">
                  🔋 Electric vehicles have significantly lower emissions per km
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Energy Usage */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h4 className="text-xl font-semibold text-gray-800 flex items-center mb-4">
            <Zap className="h-6 w-6 mr-3 text-green-600" />
            Energy Consumption
          </h4>
          
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="applianceEstimation"
                  checked={!formData.applianceEstimation}
                  onChange={() => setFormData(prev => ({ ...prev, applianceEstimation: false }))}
                  className="mr-2"
                />
                <span className="text-sm font-medium text-gray-700">Daily Hours</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="applianceEstimation"
                  checked={formData.applianceEstimation}
                  onChange={() => setFormData(prev => ({ ...prev, applianceEstimation: true }))}
                  className="mr-2"
                />
                <span className="text-sm font-medium text-gray-700">Appliance-Based</span>
              </label>
            </div>
            
            {!formData.applianceEstimation ? (
          <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Hours of Electricity Consumption (per day)
            </label>
            <input
              type="number"
              name="electricityUsage"
              value={formData.electricityUsage}
              onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all"
                  placeholder="e.g., 8"
                />
                <p className="text-xs text-gray-500 mt-1">
                  💡 Average daily hours of electricity consumption (Urban: ~8-12 hours | Rural: ~4-6 hours)
                </p>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-200">
                  <h5 className="text-sm font-semibold text-gray-700 mb-3 flex items-center">
                    <Star className="h-4 w-4 mr-2 text-yellow-500" />
                    Rate Your Appliances (Energy Efficiency)
                  </h5>
                  <p className="text-xs text-gray-600 mb-4">
                    Help us provide better estimates by rating your appliances' energy efficiency
                  </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-white rounded-lg p-4 border border-gray-200">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      🌀 Fan Hours/Day
                    </label>
                    <input
                      type="number"
                      name="fanHours"
                      value={formData.fanHours}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all mb-3"
                      placeholder="e.g., 8"
                    />
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-600">Efficiency Rating:</span>
                      <StarRating
                        rating={formData.fanRating}
                        onRatingChange={(rating) => handleRatingChange('fan', rating)}
                        size="sm"
                        showLabel={false}
                      />
                    </div>
                  </div>
                
                  <div className="bg-white rounded-lg p-4 border border-gray-200">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      💡 Light Hours/Day
                    </label>
                    <input
                      type="number"
                      name="lightHours"
                      value={formData.lightHours}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all mb-3"
                      placeholder="e.g., 6"
                    />
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-600">Efficiency Rating:</span>
                      <StarRating
                        rating={formData.lightRating}
                        onRatingChange={(rating) => handleRatingChange('light', rating)}
                        size="sm"
                        showLabel={false}
                      />
                    </div>
                  </div>
                
                  <div className="bg-white rounded-lg p-4 border border-gray-200">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      📺 TV Hours/Day
                    </label>
                    <input
                      type="number"
                      name="tvHours"
                      value={formData.tvHours}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all mb-3"
                      placeholder="e.g., 3"
                    />
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-600">Efficiency Rating:</span>
                      <StarRating
                        rating={formData.tvRating}
                        onRatingChange={(rating) => handleRatingChange('tv', rating)}
                        size="sm"
                        showLabel={false}
                      />
                    </div>
                  </div>
                  
                  <div className="bg-white rounded-lg p-4 border border-gray-200">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      ❄️ Fridge Hours/Day
                    </label>
                    <input
                      type="number"
                      name="fridgeHours"
                      value={formData.fridgeHours}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all mb-3"
                      placeholder="24"
                    />
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-600">Efficiency Rating:</span>
                      <StarRating
                        rating={formData.fridgeRating}
                        onRatingChange={(rating) => handleRatingChange('fridge', rating)}
                        size="sm"
                        showLabel={false}
                      />
                    </div>
                  </div>
                  
                  <div className="bg-white rounded-lg p-4 border border-gray-200">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      🌡️ AC Hours/Day
                    </label>
                    <input
                      type="number"
                      name="acHours"
                      value={formData.acHours}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all mb-3"
                      placeholder="e.g., 4"
                    />
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-600">Efficiency Rating:</span>
                      <StarRating
                        rating={formData.acRating}
                        onRatingChange={(rating) => handleRatingChange('ac', rating)}
                        size="sm"
                        showLabel={false}
                      />
                    </div>
                  </div>
                  
                  <div className="bg-white rounded-lg p-4 border border-gray-200">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      🧺 Washing Machine Hours/Day
                    </label>
                    <input
                      type="number"
                      name="washingMachineHours"
                      value={formData.washingMachineHours}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all mb-3"
                      placeholder="e.g., 1"
                    />
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-600">Efficiency Rating:</span>
                      <StarRating
                        rating={formData.washingMachineRating}
                        onRatingChange={(rating) => handleRatingChange('washingMachine', rating)}
                        size="sm"
                        showLabel={false}
                      />
                    </div>
                  </div>
                  
                  <div className="bg-white rounded-lg p-4 border border-gray-200">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      🍽️ Microwave Hours/Day
                    </label>
                    <input
                      type="number"
                      name="microwaveHours"
                      value={formData.microwaveHours}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all mb-3"
                      placeholder="e.g., 0.5"
                    />
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-600">Efficiency Rating:</span>
                      <StarRating
                        rating={formData.microwaveRating}
                        onRatingChange={(rating) => handleRatingChange('microwave', rating)}
                        size="sm"
                        showLabel={false}
                      />
                    </div>
                  </div>
                  
                  <div className="bg-white rounded-lg p-4 border border-gray-200">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      🚿 Geyser Hours/Day
                    </label>
                    <input
                      type="number"
                      name="geyserHours"
                      value={formData.geyserHours}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all mb-3"
                      placeholder="e.g., 2"
                    />
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-600">Efficiency Rating:</span>
                      <StarRating
                        rating={formData.geyserRating}
                        onRatingChange={(rating) => handleRatingChange('geyser', rating)}
                        size="sm"
                        showLabel={false}
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Air Travel */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h4 className="text-xl font-semibold text-gray-800 flex items-center mb-4">
            <Plane className="h-6 w-6 mr-3 text-green-600" />
            Air Travel
          </h4>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              ✈️ Flight Hours (total)
            </label>
            <input
              type="number"
              name="flightHours"
              value={formData.flightHours}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all"
              placeholder="e.g., 5"
            />
            <p className="text-xs text-gray-500 mt-1">
              💡 Enter total flight hours (not monthly)
            </p>
          </div>
        </div>

        {/* Diet */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h4 className="text-xl font-semibold text-gray-800 flex items-center mb-4">
            <Utensils className="h-6 w-6 mr-3 text-green-600" />
            Diet & Lifestyle
          </h4>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              🍽️ Diet Type
            </label>
            <select
              name="dietType"
              value={formData.dietType}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all"
            >
              <option value="meat-heavy">🥩 Meat-heavy (High Impact)</option>
              <option value="balanced">🍖 Balanced (Medium Impact)</option>
              <option value="vegetarian">🥬 Vegetarian (Low Impact)</option>
              <option value="vegan">🌱 Vegan (Lowest Impact)</option>
            </select>
            <p className="text-xs text-gray-500 mt-1">
              💡 Your diet significantly impacts your carbon footprint
            </p>
          </div>
        </div>

        {/* Domestic Activities */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h4 className="text-xl font-semibold text-gray-800 flex items-center mb-4">
            <Home className="h-6 w-6 mr-3 text-green-600" />
            Daily Activities
          </h4>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                🧺 Laundry Loads (per week)
              </label>
              <input
                type="number"
                name="laundryLoads"
                value={formData.laundryLoads}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all"
                placeholder="e.g., 3"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                🍽️ Dishwasher Cycles (per week)
              </label>
              <input
                type="number"
                name="dishwasherCycles"
                value={formData.dishwasherCycles}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all"
                placeholder="e.g., 5"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                🚿 Shower Duration (minutes/day)
              </label>
              <input
                type="number"
                name="showerMinutes"
                value={formData.showerMinutes}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all"
                placeholder="e.g., 10"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                🌡️ Heating/AC Hours (per day)
              </label>
              <input
                type="number"
                name="heatingHours"
                value={formData.heatingHours}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all"
                placeholder="e.g., 6"
              />
            </div>
            
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                👨‍🍳 Cooking Meals (per day)
              </label>
              <input
                type="number"
                name="cookingMeals"
                value={formData.cookingMeals}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all"
                placeholder="e.g., 3"
              />
            </div>
          </div>
        </div>

        <button
          type="submit"
          disabled={isSaving}
          className={`w-full bg-gradient-to-r from-green-600 to-green-700 text-white py-4 px-6 rounded-xl hover:from-green-700 hover:to-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 focus:ring-offset-2 transition-all duration-300 transform hover:scale-105 shadow-lg text-lg font-semibold ${
            isSaving ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          {isSaving ? '💾 Saving...' : '🌱 Calculate My Carbon Footprint'}
        </button>
      </form>
    </div>
  );
}
