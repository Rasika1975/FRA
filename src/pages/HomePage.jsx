import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, MapPin, BarChart3, Users, TreePine, Shield, Zap } from 'lucide-react';
import DashboardCards from '../components/DashboardCards';

const HomePage = () => {
  const features = [
    {
      icon: MapPin,
      title: 'Interactive FRA Atlas',
      description: 'Visualize forest rights data with advanced mapping and spatial analysis tools.',
      color: 'bg-emerald-500',
    },
    {
      icon: BarChart3,
      title: 'Analytics Dashboard',
      description: 'Real-time insights and progress tracking for FRA implementation.',
      color: 'bg-blue-500',
    },
    {
      icon: Users,
      title: 'Community Management',
      description: 'Manage Individual and Community Forest Rights with digital workflows.',
      color: 'bg-purple-500',
    },
    {
      icon: TreePine,
      title: 'Asset Mapping',
      description: 'AI-powered detection of forest resources, water bodies, and agricultural land.',
      color: 'bg-green-500',
    },
    {
      icon: Shield,
      title: 'Decision Support',
      description: 'Smart recommendations for Central Sector Schemes and policy formulation.',
      color: 'bg-orange-500',
    },
    {
      icon: Zap,
      title: 'AI Integration',
      description: 'Machine learning models for data processing and predictive analytics.',
      color: 'bg-yellow-500',
    },
  ];

  const states = [
    { name: 'Madhya Pradesh', districts: 52, villages: 1247, color: 'bg-emerald-100 text-emerald-800' },
    { name: 'Tripura', districts: 8, villages: 342, color: 'bg-blue-100 text-blue-800' },
    { name: 'Odisha', districts: 30, villages: 895, color: 'bg-purple-100 text-purple-800' },
    { name: 'Telangana', districts: 33, villages: 678, color: 'bg-orange-100 text-orange-800' },
  ];

  return (
    <div className="min-h-screen font-sans">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-emerald-900 via-emerald-800 to-emerald-600 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            FRA Atlas
            <span className="block text-2xl md:text-3xl font-normal mt-2 text-emerald-200">
              Forest Rights Monitoring System
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-emerald-100 mb-8 max-w-3xl mx-auto leading-relaxed">
            AI-powered WebGIS platform for integrated monitoring of Forest Rights Act 
            implementation across India's tribal regions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/dashboard"
              className="inline-flex items-center px-8 py-4 bg-white text-emerald-800 rounded-lg font-semibold hover:bg-emerald-50 transition-all duration-300 group shadow-md hover:shadow-lg"
            >
              View Dashboard
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
            <Link
              to="/map"
              className="inline-flex items-center px-8 py-4 border-2 border-white text-white rounded-lg font-semibold hover:bg-white hover:text-emerald-800 transition-all duration-300 shadow-md hover:shadow-lg"
            >
              Explore Atlas
            </Link>
          </div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <DashboardCards />
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Comprehensive Forest Rights Management
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Advanced tools and AI-powered insights for effective FRA implementation and monitoring.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className="bg-white rounded-xl p-8 shadow-md hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 cursor-pointer"
                >
                  <div className={`w-14 h-14 ${feature.color} rounded-lg flex items-center justify-center mb-6`}>
                    <Icon className="w-7 h-7 text-white animate-bounce-slow" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Coverage States */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Coverage States
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Comprehensive monitoring across four key states with significant tribal populations.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {states.map((state, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-6 shadow-md border border-gray-200 hover:shadow-xl transition-all duration-300 cursor-pointer hover:-translate-y-1"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">{state.name}</h3>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${state.color}`}>
                    Active
                  </span>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Districts</span>
                    <span className="font-medium">{state.districts}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Villages</span>
                    <span className="font-medium">{state.villages}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-emerald-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Explore Forest Rights Data?
          </h2>
          <p className="text-xl text-emerald-100 mb-8 max-w-2xl mx-auto">
            Access comprehensive insights, interactive maps, and decision support tools 
            for effective FRA implementation.
          </p>
          <Link
            to="/login"
            className="inline-flex items-center px-8 py-4 bg-white text-emerald-800 rounded-lg font-semibold hover:bg-emerald-50 transition-all duration-300 text-lg shadow-md hover:shadow-lg"
          >
            Get Started Today
            <ArrowRight className="ml-2 w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
