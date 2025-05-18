'use client';

import { useEffect, useState } from 'react';
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
} from 'react-simple-maps';
import { Tooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { City, Modal } from './map-card';

function onGetPersonalized() {}

export default function MapChart() {
  const [mapData, setMapData] = useState<City[]>([]);
  const [destinations, setDestination] = useState<any[]>([]);

  useEffect(() => {
    setDestination(JSON.parse(localStorage.getItem('destinations') || '[]'));
    fetch('/api/map-data/spain')
      .then((response) => response.json())
      .then((data) => {
        setMapData(data);
      });
  }, []);

  useEffect(() => {
    if (JSON.stringify(destinations) !== localStorage.getItem('destinations')) {
      localStorage.setItem('destinations', JSON.stringify(destinations));
    }
  }, [destinations]);

  return (
    <div className="container max-w-[600px] mx-auto">
      <ComposableMap
        projection="geoAzimuthalEqualArea"
        projectionConfig={{ center: [-3.7, 40.4], scale: 3000 }}
      >
        <Geographies geography="/spain.geojson">
          {({ geographies }) =>
            geographies.map((geo) => (
              <Geography
                key={geo.rsmKey}
                geography={geo}
                fill="#ECEFF1"
                stroke="#607D8B"
                style={{
                  default: { outline: 'none' },
                  hover: { fill: '#FFB300', outline: 'none' },
                  pressed: { fill: '#FFA000', outline: 'none' },
                }}
              />
            ))
          }
        </Geographies>
        {mapData?.map((city) => {
          return (
            <Marker key={city.name} coordinates={city.coords as any}>
              <a
                data-tooltip-id="my-tooltip"
                data-tooltip-content={city.name}
                data-tooltip-place="top"
                style={{ cursor: 'pointer' }}
              >
                <Modal
                  name={city.name}
                  description={city.description}
                  images={city.images}
                  coords={city.coords}
                  score={city.score}
                  currentFactors={city.currentFactors}
                  onGetPersonalized={onGetPersonalized}
                  onAddDestination={() => {
                    const index = destinations.findIndex(
                      (des) => des.name === city.name
                    );
                    if (index >= 0) {
                      const newDestinarions = [...destinations];
                      newDestinarions.splice(index, 1);
                      setDestination(newDestinarions);
                    } else {
                      setDestination([...destinations, city]);
                    }
                  }}
                  isAdded={destinations.some((des) => des.name === city.name)}
                />
              </a>
            </Marker>
          );
        })}
      </ComposableMap>
      <Tooltip id="my-tooltip" />
    </div>
  );
}
