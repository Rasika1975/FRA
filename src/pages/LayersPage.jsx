import React from "react";
import { Layers } from "lucide-react";

const LayersPage = () => {
  const layers = [
    { id: "satellite", name: "Satellite", active: true },
    { id: "fra-claims", name: "FRA Claims", active: true },
    { id: "forest-cover", name: "Forest Cover", active: false },
    { id: "water-bodies", name: "Water Bodies", active: true },
    { id: "settlements", name: "Settlements", active: false },
  ];

  return (
    <div className="p-6">
      <div className="flex items-center space-x-2 mb-4">
        <Layers className="w-5 h-5 text-emerald-600" />
        <h2 className="text-xl font-bold">Map Layers</h2>
      </div>
      <div className="space-y-3">
        {layers.map((layer) => (
          <label
            key={layer.id}
            className="flex items-center space-x-2 cursor-pointer text-gray-700"
          >
            <input
              type="checkbox"
              defaultChecked={layer.active}
              className="w-4 h-4 text-emerald-600"
            />
            <span>{layer.name}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default LayersPage;
