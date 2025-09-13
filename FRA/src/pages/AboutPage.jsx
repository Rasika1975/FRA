import React from 'react';
import { Users, Target, Award, Globe, TreePine, Shield } from 'lucide-react';

const AboutPage = () => {
  const objectives = [
    {
      icon: TreePine,
      title: 'Digitize Legacy Data',
      description: 'Standardize and digitize scattered FRA claims, verifications, and pattas with AI-powered processing.',
    },
    {
      icon: Globe,
      title: 'Create FRA Atlas',
      description: 'Build comprehensive atlas showing potential and granted FRA areas using satellite data and AI.',
    },
    {
      icon: Shield,
      title: 'WebGIS Integration',
      description: 'Develop interactive portal to visualize and manage spatial and socio-economic data.',
    },
    {
      icon: Target,
      title: 'AI Asset Mapping',
      description: 'Use remote sensing and ML to map capital and social assets of FRA-holding villages.',
    },
  ];

  const stakeholders = [
    'Ministry of Tribal Affairs',
    'District-level Tribal Welfare Departments',
    'Forest and Revenue Departments',
    'Planning & Development Authorities',
    'NGOs working with tribal communities',
  ];

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-emerald-800 to-emerald-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-6">About FRA Atlas</h1>
          <p className="text-xl md:text-2xl text-emerald-100 max-w-3xl mx-auto leading-relaxed">
            AI-powered Forest Rights Act monitoring and decision support system for 
            integrated tribal welfare and forest conservation.
          </p>
        </div>
      </section>

      {/* Problem Statement */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Problem Statement</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              The Forest Rights Act, 2006 recognizes the rights of forest-dwelling communities, 
              but significant challenges persist in implementation and monitoring.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-red-50 border border-red-200 rounded-lg p-6 hover:shadow-lg transition-shadow duration-300">
              <h3 className="text-lg font-semibold text-red-800 mb-4">Current Challenges</h3>
              <ul className="space-y-2 text-red-700 list-disc list-inside">
                <li>Legacy records are scattered and non-digitized</li>
                <li>No centralized visual repository of FRA claims</li>
                <li>Missing satellite-based asset mapping integration</li>
                <li>Lack of decision support for scheme benefits</li>
              </ul>
            </div>
            <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-6 hover:shadow-lg transition-shadow duration-300">
              <h3 className="text-lg font-semibold text-emerald-800 mb-4">Our Solution</h3>
              <ul className="space-y-2 text-emerald-700 list-disc list-inside">
                <li>AI-powered data digitization and standardization</li>
                <li>Interactive WebGIS atlas with real-time updates</li>
                <li>Satellite imagery analysis for asset mapping</li>
                <li>Intelligent decision support system</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Objectives */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Project Objectives</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Comprehensive goals designed to transform FRA implementation through 
              technology and data-driven insights.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {objectives.map((objective, index) => {
              const Icon = objective.icon;
              return (
                <div
                  key={index}
                  className="bg-white rounded-lg p-8 shadow-md border border-gray-200 hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="flex items-start space-x-4">
                    <div className="bg-emerald-100 p-3 rounded-lg flex-shrink-0">
                      <Icon className="w-6 h-6 text-emerald-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">
                        {objective.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed">{objective.description}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Coverage */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Geographic Coverage</h2>
            <p className="text-lg text-gray-600 mb-8">
              The FRA Atlas focuses on four states with significant tribal populations 
              and complex forest rights scenarios.
            </p>
            <div className="grid grid-cols-2 gap-6">
              {[
                { state: 'Madhya Pradesh', area: '308,245 km²', tribes: '46' },
                { state: 'Tripura', area: '10,486 km²', tribes: '19' },
                { state: 'Odisha', area: '155,707 km²', tribes: '62' },
                { state: 'Telangana', area: '112,077 km²', tribes: '32' },
              ].map((data, index) => (
                <div key={index} className="bg-gray-50 rounded-lg p-4 hover:bg-emerald-50 transition-colors duration-300">
                  <h4 className="font-semibold text-gray-900">{data.state}</h4>
                  <p className="text-sm text-gray-600">Area: {data.area}</p>
                  <p className="text-sm text-gray-600">Tribes: {data.tribes}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-emerald-50 rounded-xl p-8 text-center shadow-md hover:shadow-xl transition-shadow duration-300">
            <div className="text-4xl font-bold text-emerald-600 mb-2">3,162</div>
            <p className="text-gray-700 mb-4">Total Villages Covered</p>
            <div className="grid grid-cols-2 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-emerald-600">123</div>
                <p className="text-sm text-gray-600">Districts</p>
              </div>
              <div>
                <div className="text-2xl font-bold text-emerald-600">159</div>
                <p className="text-sm text-gray-600">Tribal Groups</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stakeholders */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Target Stakeholders</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-8">
            Serving diverse stakeholders involved in forest rights administration 
            and tribal welfare across government and civil society.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {stakeholders.map((stakeholder, index) => (
              <div
                key={index}
                className="bg-white rounded-lg p-6 shadow-md border border-gray-200 text-center hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
              >
                <Users className="w-8 h-8 text-emerald-600 mx-auto mb-4" />
                <h3 className="font-semibold text-gray-900">{stakeholder}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Future Scope */}
      <section className="py-16 bg-emerald-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Future Scope</h2>
          <p className="text-xl text-emerald-100 max-w-3xl mx-auto mb-12">
            Expanding capabilities for comprehensive forest and tribal welfare monitoring
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-emerald-700 rounded-lg p-8 hover:bg-emerald-600 transition-colors duration-300 shadow-md hover:shadow-xl">
              <Award className="w-12 h-12 text-emerald-200 mb-4 mx-auto" />
              <h3 className="text-xl font-semibold mb-4">Real-time Monitoring</h3>
              <p className="text-emerald-100">
                Incorporate real-time satellite feeds for continuous monitoring of 
                CFR forests and environmental changes.
              </p>
            </div>
            <div className="bg-emerald-700 rounded-lg p-8 hover:bg-emerald-600 transition-colors duration-300 shadow-md hover:shadow-xl">
              <Target className="w-12 h-12 text-emerald-200 mb-4 mx-auto" />
              <h3 className="text-xl font-semibold mb-4">IoT Integration</h3>
              <p className="text-emerald-100">
                Integrate IoT sensors for soil health, water quality, and environmental 
                monitoring in FRA lands for comprehensive data collection.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
