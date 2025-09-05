import React, { useState } from 'react';
import { Layers, ZoomIn, ZoomOut, Home, Maximize, Search, Info } from 'lucide-react';

const MapView = () => {
  const [selectedLayer, setSelectedLayer] = useState('satellite');
  const [zoomLevel, setZoomLevel] = useState(8);

  const layers = [
    { id: 'satellite', name: 'Satellite', active: true },
    { id: 'fra-claims', name: 'FRA Claims', active: true },
    { id: 'forest-cover', name: 'Forest Cover', active: false },
    { id: 'water-bodies', name: 'Water Bodies', active: true },
    { id: 'settlements', name: 'Settlements', active: false },
  ];

  const mockLocations = [
    { id: 1, name: 'Balaghat Village', type: 'IFR', status: 'approved', lat: 21.8, lng: 80.2 },
    { id: 2, name: 'Khargone Settlement', type: 'CFR', status: 'pending', lat: 21.9, lng: 75.6 },
    { id: 3, name: 'Dantewada Area', type: 'IFR', status: 'approved', lat: 18.9, lng: 81.4 },
  ];

  return (
    <div className="relative h-full w-full bg-gray-100">
      {/* Map Container */}
      <div className="w-full h-full bg-gradient-to-br from-green-200 to-emerald-200 relative overflow-hidden rounded-xl shadow-lg">
        {/* Simulated Map Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-300 via-green-300 to-emerald-400 opacity-70"></div>

        {/* Mock Map Elements */}
        <div className="absolute inset-0">
          {/* Forest Areas */}
          <div className="absolute top-1/4 left-1/4 w-36 h-24 bg-emerald-600 opacity-70 rounded-lg transform rotate-12 shadow-inner"></div>
          <div className="absolute top-1/2 right-1/4 w-28 h-32 bg-emerald-700 opacity-60 rounded-lg transform -rotate-45 shadow-inner"></div>
          <div className="absolute bottom-1/4 left-1/3 w-40 h-20 bg-emerald-500 opacity-80 rounded-lg transform rotate-6 shadow-inner"></div>

          {/* Water Bodies */}
          <div className="absolute top-1/3 left-1/2 w-16 h-16 bg-blue-500 opacity-80 rounded-full shadow"></div>
          <div className="absolute bottom-1/3 right-1/3 w-20 h-12 bg-blue-600 opacity-70 rounded-full transform rotate-12 shadow"></div>

          {/* Location Markers */}
          {mockLocations.map((location) => (
            <div
              key={location.id}
              className={`absolute w-6 h-6 rounded-full border-2 border-white shadow-lg cursor-pointer group transform -translate-x-1/2 -translate-y-1/2 ${
                location.status === 'approved' ? 'bg-emerald-500 hover:ring-2 hover:ring-emerald-400' : 'bg-orange-500 hover:ring-2 hover:ring-orange-400'
              }`}
              style={{
                top: `${(location.lat - 18) * 10}%`,
                left: `${(location.lng - 75) * 8}%`,
              }}
              title={`${location.name} - ${location.type} (${location.status})`}
            >
              <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-white px-2 py-1 rounded shadow-lg text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                {location.name}
              </div>
            </div>
          ))}
        </div>

        {/* Search Bar */}
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-20 w-3/4 max-w-lg">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search villages, districts, or coordinates..."
              className="w-full pl-12 pr-4 py-3 bg-white rounded-full shadow-md border border-gray-200 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
            />
          </div>
        </div>

        {/* Map Controls */}
        <div className="absolute right-4 top-24 z-20 space-y-2">
          {[{icon: ZoomIn, action: () => setZoomLevel(Math.min(zoomLevel + 1, 18))},
            {icon: ZoomOut, action: () => setZoomLevel(Math.max(zoomLevel - 1, 1))},
            {icon: Home, action: () => setZoomLevel(8)},
            {icon: Maximize, action: () => alert('Full screen clicked')}].map((btn, idx) => {
              const Icon = btn.icon;
              return (
                <button
                  key={idx}
                  onClick={btn.action}
                  className="w-10 h-10 bg-white rounded-lg shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors"
                >
                  <Icon className="w-5 h-5 text-gray-600" />
                </button>
              )
            })}
        </div>

        {/* Layer Control */}
        <div className="absolute left-4 top-24 z-20 bg-white rounded-lg shadow-lg p-4 max-w-xs">
          <div className="flex items-center space-x-2 mb-3">
            <Layers className="w-4 h-4 text-gray-600" />
            <h3 className="font-semibold text-gray-900">Map Layers</h3>
          </div>
          <div className="space-y-2">
            {layers.map((layer) => (
              <label key={layer.id} className="flex items-center space-x-2 cursor-pointer text-gray-700 hover:text-gray-900 transition-colors">
                <input
                  type="checkbox"
                  defaultChecked={layer.active}
                  className="w-4 h-4 text-emerald-600 rounded focus:ring-emerald-500"
                />
                <span>{layer.name}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Legend */}
        <div className="absolute bottom-4 left-4 bg-white rounded-lg shadow-lg p-4 max-w-xs">
          <div className="flex items-center space-x-2 mb-3">
            <Info className="w-4 h-4 text-gray-600" />
            <h4 className="font-semibold text-gray-900">Legend</h4>
          </div>
          <div className="space-y-2 text-sm">
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-emerald-500 rounded-full"></div>
              <span>Approved FRA Claims</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-orange-500 rounded-full"></div>
              <span>Pending FRA Claims</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-emerald-600 rounded"></div>
              <span>Forest Cover</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
              <span>Water Bodies</span>
            </div>
          </div>
        </div>

        {/* Status Bar */}
        <div className="absolute bottom-4 right-4 bg-white rounded-lg shadow-lg p-3">
          <div className="text-sm text-gray-600 font-medium">
            Zoom: {zoomLevel} | Lat: 21.2787° | Lng: 78.1278°
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapView;
