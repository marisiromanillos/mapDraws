import React, { useEffect, useRef, useState } from 'react';
import Map from 'ol/Map.js';
import View from 'ol/View.js';
import TileLayer from 'ol/layer/Tile.js';
import OSM from 'ol/source/OSM.js';
import { Draw } from 'ol/interaction.js';
import { Vector as VectorLayer } from 'ol/layer.js';
import { Vector as VectorSource } from 'ol/source.js';
import { GPX } from 'ol/format.js';
import { Type } from 'ol/geom/Geometry';
import 'ol/ol.css';

const MapComponent: React.FC = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [drawType, setDrawType] = useState<Type | null>(null);
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
        center: [0, 0],
        zoom: 2,
      }),
    });

    setMap(initialMap);
    setSource(initialSource);

    return () => {
      initialMap.setTarget(undefined);
    };
  }, []);

  useEffect(() => {
    if (!map || !source || drawType === null) {
      // Clean up any existing interaction when conditions aren't met
      if (drawInteraction) {
        map?.removeInteraction(drawInteraction);
        setDrawInteraction(null);
      }
      return;
    }

    // Create new interaction
    const newDrawInteraction = new Draw({
      source: source,
      type: drawType,
      freehand: true,
    });

    // Add the interaction to the map
    map.addInteraction(newDrawInteraction);

    // Update state
    setDrawInteraction(newDrawInteraction);

    // Cleanup function
    return () => {
      if (map && newDrawInteraction) {
        map.removeInteraction(newDrawInteraction);
      }
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [map, source, drawType]);

  const downloadGPX = () => {
    if (!source) return;

    const features = source.getFeatures();
    const allCoords = features.flatMap(feature => {
      const clone = feature.clone();
      const geometry = clone.getGeometry();
      if (geometry) {
        geometry.transform('EPSG:3857', 'EPSG:4326');
      }
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

  const clearDrawings = () => {
    if (!source) return;
    source.clear();
  };

  return (
    <section id='map-component' className='lg:py-12 py-8 px-4 sm:px-6 lg:px-8 dark:bg-zinc-950'>
      <div className="container">
        <div className="backdrop-blur-md card-black rounded-2xl p-6 mb-6">
          <div className="space-y-4">
            <div className="max-w-md">
              <label
                htmlFor="type"
                className="block md:text-2xl text-lg font-semibold text-white/90"
              >
                Drawing Type
              </label>
              <select
                id="type"
                value={drawType || ''}
                onChange={(e) => {
                  const value = e.target.value;
                  setDrawType(value === '' ? null : value as Type);
                }}
                className="mt-4 card-black w-full border-none text-white text-sm
                  rounded-2xl p-4 appearance-none cursor-pointer
                  focus:ring-2 focus:ring-gray-600 focus:outline-none"
              >
                <option value="">Select line string to draw</option>
                <option value="LineString">LineString</option>
              </select>
            </div>

            <div className="pt-4 flex flex-col md:flex-row gap-4">
              <button
                onClick={downloadGPX}
                className="px-8 py-3 text-base font-semibold text-center uppercase
                  bg-white hover:bg-slate-300 rounded-3xl transition-colors"
              >
                Download GPX
              </button>
              <button
                onClick={clearDrawings}
                className="px-8 py-3 text-base text-white font-semibold text-center uppercase
                  hover:bg-red-700 bg-red-600 rounded-3xl transition-colors"
              >
                Clear Drawings
              </button>
            </div>
          </div>
        </div>

        <div
          ref={mapRef}
          className="w-full h-[calc(100vh-16rem)] rounded-2xl shadow-xl overflow-hidden
            border border-gray-800/50 bg-gray-900/60 backdrop-blur-md"
        />
      </div>
    </section>
  );
};

export default MapComponent;