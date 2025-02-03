import React, { useEffect, useRef, useState } from 'react';
import Map from 'ol/Map.js';
import View from 'ol/View.js';
import TileLayer from 'ol/layer/Tile.js';
import OSM from 'ol/source/OSM.js';
import { Draw } from 'ol/interaction.js';
import { Vector as VectorLayer } from 'ol/layer.js';
import { Vector as VectorSource } from 'ol/source.js';
import { GPX } from 'ol/format.js';
import { transform } from 'ol/proj.js';
import 'ol/ol.css';

const MapComponent: React.FC = () => {
 const mapRef = useRef<HTMLDivElement>(null);
 const [drawType, setDrawType] = useState<string>('None');
 const [map, setMap] = useState<Map | null>(null);
 const [source, setSource] = useState<VectorSource | null>(null);
 const [drawInteraction, setDrawInteraction] = useState<Draw | null>(null);

 useEffect(() => {
   if (!mapRef.current) return;

   const initialSource = new VectorSource();
   const initialMap = new Map({
     target: mapRef.current,
     layers: [
       new TileLayer({
         source: new OSM(),
       }),
       new VectorLayer({
         source: initialSource,
       }),
     ],
     view: new View({
       center: [1390659.798668, 5144570.023792],
       zoom: 17,
     }),
   });

   setMap(initialMap);
   setSource(initialSource);

   return () => {
     initialMap.setTarget(undefined);
   };
 }, []);

 useEffect(() => {
   if (!map || !source || drawType === 'None') return;

   if (drawInteraction) {
     map.removeInteraction(drawInteraction);
   }

   const newDrawInteraction = new Draw({
     source: source,
     type: drawType,
     freehand: true,
   });
   map.addInteraction(newDrawInteraction);
   setDrawInteraction(newDrawInteraction);

   return () => {
     if (newDrawInteraction) {
       map.removeInteraction(newDrawInteraction);
     }
   };
 }, [drawType, map, source]);

 const downloadGPX = () => {
  if (!source) return;

  const features = source.getFeatures();
  // Get all coordinates from the geometry
  const allCoords = features.flatMap(feature => {
    const clone = feature.clone();
    const geometry = clone.getGeometry();
    geometry.transform('EPSG:3857', 'EPSG:4326');
    return clone;
  });

  const gpxFormat = new GPX();
  const gpxStr = gpxFormat.writeFeatures(allCoords);

  const blob = new Blob([gpxStr], { type: 'application/gpx+xml' });
  const url = URL.createObjectURL(blob);

  const link = document.createElement('a');
  link.href = url;
  link.download = 'map-features.gpx';
  link.click();

  URL.revokeObjectURL(url);
 };

 return (
   <div>
     <div className="mb-4">
       <label htmlFor="type" className="block text-sm font-medium text-gray-700">
         Drawing Type
       </label>
       <select
         id="type"
         value={drawType}
         onChange={(e) => setDrawType(e.target.value)}
         className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
       >
         <option value="None">None</option>
         <option value="Point">Point</option>
         <option value="LineString">LineString</option>
         <option value="Polygon">Polygon</option>
         <option value="Circle">Circle</option>
       </select>
     </div>

     <button
       onClick={downloadGPX}
       className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
     >
       Download GPX
     </button>

     <div
       ref={mapRef}
       className="w-full h-screen border-4 border-blue-500 rounded-lg shadow-lg"
     />
   </div>
 );
};

export default MapComponent;