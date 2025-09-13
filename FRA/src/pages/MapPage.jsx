import React, { useState, useMemo, useEffect, useRef } from 'react'
import { MapContainer, TileLayer, GeoJSON, Marker, Popup, LayersControl, LayerGroup } from 'react-leaflet'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'
import { Button } from '../components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select'
import { Label } from '../components/ui/label'
import { Layers, Filter, Download } from 'lucide-react'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
import Upload from "./upload"

// Fix for default markers in react-leaflet
delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
})

const MapPage = () => {
  // UI state & filters
  const [selectedState, setSelectedState] = useState('')
  const [selectedDistrict, setSelectedDistrict] = useState('')
  const [selectedVillage, setSelectedVillage] = useState('')
  const [selectedTribe, setSelectedTribe] = useState('')
  const [selectedBoundary, setSelectedBoundary] = useState(null)
  const [layers, setLayers] = useState({
    villages: true,
    claims: true,
    forest: true,
    agriculture: false,
    water: false,
    homesteads: false
  })

  // Map ref to call fitBounds
  const mapRef = useRef(null)

  // -------------------------
  // MOCK DATA (replace with API responses)
  // -------------------------
  const states = ['Chhattisgarh', 'Odisha', 'Jharkhand', 'Madhya Pradesh']
  const districts = ['Bastar', 'Dantewada', 'Kanker', 'Kondagaon', 'Narayanpur']
  const villages = ['Village A', 'Village B', 'Village C', 'Village D', 'Village E']
  const tribes = ['Gond', 'Baiga', 'Pardhan', 'Mariya', 'Halba']

  // Forest areas (GeoJSON)
  const forestAreas = {
    type: "FeatureCollection",
    features: [
      {
        type: "Feature",
        properties: { name: "Bastar Forest", type: "Reserved Forest", area: "500 sq km" },
        geometry: { type: "Polygon", coordinates: [[[81.2, 18.8],[81.8,18.8],[81.8,19.5],[81.2,19.5],[81.2,18.8]]] }
      },
      {
        type: "Feature",
        properties: { name: "Dantewada Forest", type: "Protected Forest", area: "300 sq km" },
        geometry: { type: "Polygon", coordinates: [[[81.0,18.2],[81.5,18.2],[81.5,18.7],[81.0,18.7],[81.0,18.2]]] }
      },
      {
        type: "Feature",
        properties: { name: "Kanker Forest", type: "Community Forest", area: "200 sq km" },
        geometry: { type: "Polygon", coordinates: [[[81.6,19.8],[82.2,19.8],[82.2,20.3],[81.6,20.3],[81.6,19.8]]] }
      }
    ]
  }

  // Agriculture, Water, Homesteads (GeoJSON)
  const agricultureAreas = {
    type: "FeatureCollection",
    features: [
      {
        type: "Feature",
        properties: { name: "Bastar Agriculture", type: "Paddy Fields", area: "150 sq km" },
        geometry: { type: "Polygon", coordinates: [[[81.3,19.0],[81.7,19.0],[81.7,19.3],[81.3,19.3],[81.3,19.0]]] }
      }
      // ... add more features
    ]
  }

  const waterBodies = {
    type: "FeatureCollection",
    features: [
      {
        type: "Feature",
        properties: { name: "Indravati River", type: "River", length: "535 km" },
        geometry: { type: "LineString", coordinates: [[81.0,18.0],[81.2,18.2],[81.4,18.4],[81.6,18.6],[81.8,18.8]] }
      }
      // ... add more features
    ]
  }

  const homesteadAreas = {
    type: "FeatureCollection",
    features: [
      {
        type: "Feature",
        properties: { name: "Bastar Homesteads", type: "Residential", population: "5000" },
        geometry: { type: "Polygon", coordinates: [[[81.5,19.0],[81.6,19.0],[81.6,19.1],[81.5,19.1],[81.5,19.0]]] }
      }
    ]
  }

  // State & district boundaries (GeoJSON - simplified rects)
  const stateBoundaries = {
    type: "FeatureCollection",
    features: [
      {
        type: "Feature",
        properties: { name: "Chhattisgarh", state: "Chhattisgarh" },
        geometry: { type: "Polygon", coordinates: [[[80.0,17.0],[84.0,17.0],[84.0,24.0],[80.0,24.0],[80.0,17.0]]] }
      },
      {
        type: "Feature",
        properties: { name: "Odisha", state: "Odisha" },
        geometry: { type: "Polygon", coordinates: [[[84.0,17.0],[87.0,17.0],[87.0,23.0],[84.0,23.0],[84.0,17.0]]] }
      }
      // ... other states
    ]
  }

  const districtBoundaries = {
    type: "FeatureCollection",
    features: [
      {
        type: "Feature",
        properties: { name: "Bastar", district: "Bastar", state: "Chhattisgarh" },
        geometry: { type: "Polygon", coordinates: [[[81.0,18.5],[82.0,18.5],[82.0,20.0],[81.0,20.0],[81.0,18.5]]] }
      },
      {
        type: "Feature",
        properties: { name: "Dantewada", district: "Dantewada", state: "Chhattisgarh" },
        geometry: { type: "Polygon", coordinates: [[[81.0,18.0],[82.0,18.0],[82.0,18.5],[81.0,18.5],[81.0,18.0]]] }
      }
      // ... other districts
    ]
  }

  const villageBoundaries = {
    type: "FeatureCollection",
    features: [
      { type: "Feature", properties: { name: "Village A", district: "Bastar" }, geometry: { type: "Polygon", coordinates: [[[81.5,19.0],[81.6,19.0],[81.6,19.1],[81.5,19.1],[81.5,19.0]]] } },
      { type: "Feature", properties: { name: "Village B", district: "Dantewada" }, geometry: { type: "Polygon", coordinates: [[[81.7,18.8],[81.8,18.8],[81.8,18.9],[81.7,18.9],[81.7,18.8]]] } },
      { type: "Feature", properties: { name: "Village C", district: "Kanker" }, geometry: { type: "Polygon", coordinates: [[[81.9,20.0],[82.0,20.0],[82.0,20.1],[81.9,20.1],[81.9,20.0]]] } }
    ]
  }

  // FRA claims array — replace with backend/OCR output array when ready
  const allFraClaims = [
    { id: 1, holder: 'Ram Singh', village: 'Village A', district: 'Bastar', state: 'Chhattisgarh', coordinates: [19.05, 81.55], status: 'Approved', area: '2.5 acres', tribe: 'Gond' },
    { id: 2, holder: 'Sita Devi', village: 'Village B', district: 'Dantewada', state: 'Chhattisgarh', coordinates: [18.85, 81.75], status: 'Pending', area: '1.8 acres', tribe: 'Baiga' },
    { id: 3, holder: 'Gopal Yadav', village: 'Village A', district: 'Bastar', state: 'Chhattisgarh', coordinates: [19.08, 81.52], status: 'Approved', area: '3.2 acres', tribe: 'Pardhan' },
    { id: 4, holder: 'Maya Bai', village: 'Village C', district: 'Kanker', state: 'Chhattisgarh', coordinates: [20.12, 81.30], status: 'Rejected', area: '1.5 acres', tribe: 'Halba' },
    { id: 5, holder: 'Kumar Singh', village: 'Village D', district: 'Kondagaon', state: 'Chhattisgarh', coordinates: [19.80, 81.90], status: 'Under Review', area: '2.8 acres', tribe: 'Mariya' }
  ]

  // -------------------------
  // Derived / memoized data
  // -------------------------
  const filteredFraClaims = useMemo(() => {
    return allFraClaims.filter(claim => {
      const stateMatch = !selectedState || claim.state === selectedState
      const districtMatch = !selectedDistrict || claim.district === selectedDistrict
      const villageMatch = !selectedVillage || claim.village === selectedVillage
      const tribeMatch = !selectedTribe || claim.tribe === selectedTribe
      return stateMatch && districtMatch && villageMatch && tribeMatch
    })
  }, [selectedState, selectedDistrict, selectedVillage, selectedTribe])

  const filteredVillageBoundaries = useMemo(() => {
    const features = villageBoundaries.features.filter(f => {
      return !selectedDistrict || f.properties.district === selectedDistrict
    })
    return { ...villageBoundaries, features }
  }, [selectedDistrict])

  // Dynamic center (if no claims, default central India)
  const mapCenter = useMemo(() => {
    if (filteredFraClaims.length === 0) return [22.0, 81.5]
    const avgLat = filteredFraClaims.reduce((s, c) => s + c.coordinates[0], 0) / filteredFraClaims.length
    const avgLng = filteredFraClaims.reduce((s, c) => s + c.coordinates[1], 0) / filteredFraClaims.length
    return [avgLat, avgLng]
  }, [filteredFraClaims])

  // -------------------------
  // Update selected Boundary when state/district changes + fitBounds
  // -------------------------
  useEffect(() => {
    if (selectedDistrict) {
      const districtFeature = districtBoundaries.features.find(f => f.properties.district === selectedDistrict)
      setSelectedBoundary(districtFeature || null)
    } else if (selectedState) {
      const stateFeature = stateBoundaries.features.find(f => f.properties.state === selectedState)
      setSelectedBoundary(stateFeature || null)
    } else {
      setSelectedBoundary(null)
    }
  }, [selectedState, selectedDistrict])

  // When selectedBoundary changes, fit map bounds to it
  useEffect(() => {
    if (!selectedBoundary || !mapRef.current) return
    try {
      const bounds = L.geoJSON(selectedBoundary).getBounds()
      if (bounds.isValid && mapRef.current.fitBounds) {
        mapRef.current.fitBounds(bounds, { padding: [40, 40] })
      }
    } catch (err) {
      console.warn('Could not fit bounds for selected boundary', err)
    }
  }, [selectedBoundary])

  // -------------------------
  // Export CSV function
  // -------------------------
  const handleExport = () => {
    const headers = ["ID", "Holder", "Village", "District", "State", "Latitude", "Longitude", "Status", "Area", "Tribe"]
    const rows = filteredFraClaims.map(c => [c.id, c.holder, c.village, c.district, c.state, c.coordinates[0], c.coordinates[1], c.status, c.area, c.tribe])
    let csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map(r => r.map(String).map(s => `"${s.replace(/"/g,'""')}"`).join(","))].join("\n")
    const encodedUri = encodeURI(csvContent)
    const link = document.createElement("a")
    link.setAttribute("href", encodedUri)
    link.setAttribute("download", "fra_claims.csv")
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  // -------------------------
  // Styles & popup helpers
  // -------------------------
  const villageStyle = () => ({ fillColor: '#3B82F6', weight: 2, opacity: 1, color: 'white', dashArray: '3', fillOpacity: 0.3 })
  const forestStyle = () => ({ fillColor: '#22C55E', weight: 2, opacity: 1, color: '#16A34A', fillOpacity: 0.4 })
  const agricultureStyle = () => ({ fillColor: '#F59E0B', weight: 2, opacity: 1, color: '#D97706', fillOpacity: 0.4 })
  const waterStyle = () => ({ fillColor: '#3B82F6', weight: 3, opacity: 1, color: '#1D4ED8', fillOpacity: 0.6 })
  const homesteadStyle = () => ({ fillColor: '#EF4444', weight: 2, opacity: 1, color: '#DC2626', fillOpacity: 0.4 })
  const boundaryStyle = { color: "black", weight: 4, fillOpacity: 0, dashArray: "5, 5" }
  const getBoundaryStyle = () => boundaryStyle

  const onEachVillage = (feature, layer) => {
    const name = feature.properties?.name || 'Village'
    const district = feature.properties?.district || ''
    layer.bindPopup(`<div><h3>${name}</h3><p>District: ${district}</p></div>`)
  }
  const onEachForest = (feature, layer) => {
    const p = feature.properties || {}
    layer.bindPopup(`<div><h3>${p.name}</h3><p>Type: ${p.type}</p><p>Area: ${p.area}</p></div>`)
  }
  const onEachAgriculture = (feature, layer) => {
    const p = feature.properties || {}
    layer.bindPopup(`<div><h3>${p.name}</h3><p>Type: ${p.type}</p><p>Area: ${p.area}</p></div>`)
  }
  const onEachWater = (feature, layer) => {
    const p = feature.properties || {}
    const lenOrArea = p.length ? `Length: ${p.length}` : `Area: ${p.area || 'N/A'}`
    layer.bindPopup(`<div><h3>${p.name}</h3><p>Type: ${p.type}</p><p>${lenOrArea}</p></div>`)
  }
  const onEachHomestead = (feature, layer) => {
    const p = feature.properties || {}
    layer.bindPopup(`<div><h3>${p.name}</h3><p>Type: ${p.type}</p><p>Population: ${p.population || 'N/A'}</p></div>`)
  }
  const onEachBoundary = (feature, layer) => {
    const p = feature.properties || {}
    const name = p.name || 'Boundary'
    const type = p.state ? 'State' : p.district ? 'District' : 'Boundary'
    layer.bindPopup(`<div><h3>${name}</h3><p>Type: ${type}</p></div>`)
  }

  // -------------------------
  // Render
  // -------------------------
  return (
    <div className="space-y-6 px-6 lg:px-12">
      {/* Header */}
      <div className="flex flex-col space-y-4">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">FRA Atlas</h1>
            <p className="text-gray-600">Interactive map showing forest rights claims and boundaries</p>
          </div>
          <div className="flex items-center space-x-4">
            <Upload />
            <Button onClick={handleExport} className="flex items-center space-x-2">
              <Download className="h-4 w-4" />
              <span>Export Data</span>
            </Button>
          </div>
        </div>

        <div className="flex flex-col space-y-2">
          <div className="flex flex-wrap gap-2">
            {selectedState && <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">State: {selectedState}</span>}
            {selectedDistrict && <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">District: {selectedDistrict}</span>}
            {selectedVillage && <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full">Village: {selectedVillage}</span>}
            {selectedTribe && <span className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded-full">Tribe: {selectedTribe}</span>}
            {selectedBoundary && <span className="px-2 py-1 bg-black text-white text-xs rounded-full">{selectedBoundary.properties.state ? 'State' : 'District'}: {selectedBoundary.properties.name}</span>}
            {(selectedState || selectedDistrict || selectedVillage || selectedTribe) && (
              <button
                onClick={() => {
                  setSelectedState('')
                  setSelectedDistrict('')
                  setSelectedVillage('')
                  setSelectedTribe('')
                  setSelectedBoundary(null)
                }}
                className="px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded-full hover:bg-gray-200"
              >
                Clear All Filters
              </button>
            )}
          </div>

          <div className="flex space-x-4 text-sm text-gray-500">
            <p>Showing {filteredFraClaims.length} of {allFraClaims.length} claims</p>
            {selectedBoundary && <p className="text-blue-600">Selected: {selectedBoundary.properties.name} ({selectedBoundary.properties.state ? 'State' : 'District'})</p>}
          </div>
        </div>
      </div>

      {/* Main grid: filters + map */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Filters panel */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Filter className="h-5 w-5" />
                <span>Filters</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>State</Label>
                <Select value={selectedState || undefined} onValueChange={(val) => { setSelectedState(val || ''); setSelectedDistrict('') }}>
                  <SelectTrigger><SelectValue placeholder="Select State" /></SelectTrigger>
                  <SelectContent>
                    {states.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>District</Label>
                <Select value={selectedDistrict || undefined} onValueChange={(val) => setSelectedDistrict(val || '')}>
                  <SelectTrigger><SelectValue placeholder="Select District" /></SelectTrigger>
                  <SelectContent>
                    {districts.map(d => <SelectItem key={d} value={d}>{d}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Village</Label>
                <Select value={selectedVillage || undefined} onValueChange={(val) => setSelectedVillage(val || '')}>
                  <SelectTrigger><SelectValue placeholder="Select Village" /></SelectTrigger>
                  <SelectContent>
                    {villages.map(v => <SelectItem key={v} value={v}>{v}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Tribal Group</Label>
                <Select value={selectedTribe || undefined} onValueChange={(val) => setSelectedTribe(val || '')}>
                  <SelectTrigger><SelectValue placeholder="Select Tribe" /></SelectTrigger>
                  <SelectContent>
                    {tribes.map(t => <SelectItem key={t} value={t}>{t}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Layers */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Layers className="h-5 w-5" />
                <span>Layers</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {Object.entries(layers).map(([layerKey, visible]) => (
                <div key={layerKey} className="flex items-center space-x-2">
                  <input type="checkbox" id={layerKey} checked={visible} onChange={(e) => setLayers(prev => ({ ...prev, [layerKey]: e.target.checked }))} className="rounded border-gray-300" />
                  <Label htmlFor={layerKey} className="capitalize">{layerKey.replace('_', ' ')}</Label>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Map area */}
        <div className="lg:col-span-3">
          <Card>
            <CardContent className="p-0">
              <div className="h-[600px] w-full">
                <MapContainer
                  center={mapCenter}
                  zoom={10}
                  style={{ height: '100%', width: '100%' }}
                  whenCreated={(mapInstance) => { mapRef.current = mapInstance }}
                  key={`${mapCenter[0]}-${mapCenter[1]}`}
                >
                  <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />

                  <LayersControl position="topright">
                    {/* Selected boundary */}
                    {selectedBoundary && (
                      <LayersControl.Overlay name="Selected Boundary" checked>
                        <GeoJSON data={{ type: "FeatureCollection", features: [selectedBoundary] }} style={getBoundaryStyle} onEachFeature={onEachBoundary} />
                      </LayersControl.Overlay>
                    )}

                    {/* Village Boundaries */}
                    {layers.villages && (
                      <LayersControl.Overlay name="Village Boundaries" checked>
                        <GeoJSON data={filteredVillageBoundaries} style={villageStyle} onEachFeature={onEachVillage} />
                      </LayersControl.Overlay>
                    )}

                    {/* FRA Claims Markers */}
                    {layers.claims && (
                      <LayersControl.Overlay name="FRA Claims" checked>
                        <LayerGroup>
                          {filteredFraClaims.map(claim => (
                            <Marker key={claim.id} position={claim.coordinates}>
                              <Popup>
                                <div className="p-2">
                                  <h3 className="font-semibold">{claim.holder}</h3>
                                  <p className="text-sm text-gray-600">Village: {claim.village}</p>
                                  <p className="text-sm text-gray-600">District: {claim.district}</p>
                                  <p className="text-sm text-gray-600">State: {claim.state}</p>
                                  <p className="text-sm text-gray-600">Tribe: {claim.tribe}</p>
                                  <p className="text-sm text-gray-600">Area: {claim.area}</p>
                                  <span className={`inline-block px-2 py-1 text-xs rounded-full ${
                                    claim.status === 'Approved' ? 'bg-green-100 text-green-800' :
                                    claim.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                                    claim.status === 'Rejected' ? 'bg-red-100 text-red-800' : 'bg-blue-100 text-blue-800'
                                  }`}>{claim.status}</span>
                                </div>
                              </Popup>
                            </Marker>
                          ))}
                        </LayerGroup>
                      </LayersControl.Overlay>
                    )}

                    {/* Forest */}
                    {layers.forest && (
                      <LayersControl.Overlay name="Forest Areas" checked>
                        <GeoJSON data={forestAreas} style={forestStyle} onEachFeature={onEachForest} />
                      </LayersControl.Overlay>
                    )}

                    {/* Agriculture */}
                    {layers.agriculture && (
                      <LayersControl.Overlay name="Agriculture Areas" checked>
                        <GeoJSON data={agricultureAreas} style={agricultureStyle} onEachFeature={onEachAgriculture} />
                      </LayersControl.Overlay>
                    )}

                    {/* Water */}
                    {layers.water && (
                      <LayersControl.Overlay name="Water Bodies" checked>
                        <GeoJSON data={waterBodies} style={waterStyle} onEachFeature={onEachWater} />
                      </LayersControl.Overlay>
                    )}

                    {/* Homesteads */}
                    {layers.homesteads && (
                      <LayersControl.Overlay name="Homestead Areas" checked>
                        <GeoJSON data={homesteadAreas} style={homesteadStyle} onEachFeature={onEachHomestead} />
                      </LayersControl.Overlay>
                    )}
                  </LayersControl>
                </MapContainer>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default MapPage
