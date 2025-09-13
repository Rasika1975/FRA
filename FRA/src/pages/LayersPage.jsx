import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/Card';
import { MapPin, FileText, Trees, Droplets } from 'lucide-react';

// Mock data for different map layers
const initialLayers = [
  {
    id: 'districts',
    name: 'District Boundaries',
    description: 'Administrative boundaries of districts.',
    visible: true,
    opacity: 100,
    icon: MapPin,
    legend: [
      { color: '#A9A9A9', label: 'Boundary' }
    ]
  },
  {
    id: 'claims',
    name: 'FRA Claims',
    description: 'Individual and Community Forest Rights claims.',
    visible: true,
    opacity: 80,
    icon: FileText,
    legend: [
      { color: '#3B82F6', label: 'Individual Claim (IFR)' },
      { color: '#10B981', label: 'Community Claim (CFR)' }
    ]
  },
  {
    id: 'forests',
    name: 'Forest Cover',
    description: 'Different types of forest areas.',
    visible: false,
    opacity: 60,
    icon: Trees,
    legend: [
      { color: '#22C55E', label: 'Dense Forest' },
      { color: '#84CC16', label: 'Open Forest' }
    ]
  },
  {
    id: 'water',
    name: 'Water Bodies',
    description: 'Rivers, lakes, and other water sources.',
    visible: true,
    opacity: 70,
    icon: Droplets,
    legend: [
      { color: '#0EA5E9', label: 'River' },
      { color: '#3B82F6', label: 'Lake / Pond' }
    ]
  }
];

const LayersPage = () => {
  const [layers, setLayers] = useState(initialLayers);

  const handleVisibilityChange = (index) => {
    const newLayers = [...layers];
    newLayers[index].visible = !newLayers[index].visible;
    setLayers(newLayers);
  };

  const handleOpacityChange = (index, newOpacity) => {
    const newLayers = [...layers];
    newLayers[index].opacity = newOpacity;
    setLayers(newLayers);
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Map Layers</h1>
        <p className="text-gray-600">Manage and visualize different data layers on the map.</p>
      </div>

      {/* Layers List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {layers.map((layer, index) => (
          <Card key={layer.id}>
            <CardHeader>
              <CardTitle className="flex items-center text-lg">
                <layer.icon className="h-5 w-5 mr-3 text-gray-700" />
                {layer.name}
              </CardTitle>
              <CardDescription>{layer.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <label htmlFor={`visibility-${layer.id}`} className="font-medium text-sm text-gray-700">Visibility</label>
                  <input type="checkbox" id={`visibility-${layer.id}`} checked={layer.visible} onChange={() => handleVisibilityChange(index)} className="h-4 w-4 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500" />
                </div>
                <div className="space-y-2">
                  <label htmlFor={`opacity-${layer.id}`} className="font-medium text-sm text-gray-700">Opacity ({layer.opacity}%)</label>
                  <input id={`opacity-${layer.id}`} type="range" min="0" max="100" value={layer.opacity} onChange={(e) => handleOpacityChange(index, parseInt(e.target.value, 10))} className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer" />
                </div>
              </div>
              <div className="mt-6">
                <h4 className="text-sm font-semibold mb-2 text-gray-800">Legend</h4>
                <div className="space-y-1.5">
                  {layer.legend.map((item, i) => (
                    <div key={i} className="flex items-center">
                      <span className="h-4 w-4 rounded-sm mr-2 border border-gray-300" style={{ backgroundColor: item.color }}></span>
                      <span className="text-sm text-gray-600">{item.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default LayersPage;
