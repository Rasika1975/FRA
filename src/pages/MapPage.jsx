import React from 'react';
import MapView from '../components/MapView';
import Sidebar from '../components/Sidebar';

const MapPage = () => {
  return (
    <div className="h-screen flex overflow-hidden">
      {/* Sidebar */}
      <Sidebar />

      {/* Map Container */}
      <main className="flex-1 relative">
        <MapView className="w-full h-full" />
      </main>
    </div>
  );
};

export default MapPage;
