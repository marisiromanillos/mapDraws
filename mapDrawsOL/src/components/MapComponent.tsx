import React, { useEffect, useRef } from 'react';
import Map from 'ol/Map.js';
import View from 'ol/View.js';
import TileLayer from 'ol/layer/Tile.js';
import OSM from 'ol/source/OSM';
import 'ol/ol.css';

const MapComponent: React.FC = () => {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mapRef.current) return;

    // Initialize the OpenLayers map
    const map = new Map({
      target: mapRef.current,
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
      ],
      view: new View({
        center: [1390659.798668, 5144570.023792],
        zoom: 17,
      }),
    });

    // Cleanup on unmount
    return () => {
      map.setTarget(undefined);
    };
  }, []);

  return <div ref={mapRef} className="w-full h-screen" />;};

export default MapComponent;