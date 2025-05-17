'use client';

import { useState } from 'react';
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
} from 'react-simple-maps';
import { Tooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css';

const cities = [
  { name: 'Barcelona', coords: [2.1734, 41.3851] },
  { name: 'Madrid', coords: [-3.7038, 40.4168] },
  { name: 'Valencia', coords: [-0.3763, 39.4699] },
  { name: 'Seville', coords: [-5.9845, 37.3891] },
  { name: 'Granada', coords: [-3.5986, 37.1773] },
  { name: 'Málaga', coords: [-4.4214, 36.7213] },
  { name: 'Bilbao', coords: [-2.9349, 43.263] },
  { name: 'Córdoba', coords: [-4.7794, 37.8882] },
  { name: 'Zaragoza', coords: [-0.8787, 41.6488] },
  { name: 'Alicante', coords: [-0.481, 38.3452] },
  { name: 'Palma de Mallorca', coords: [2.6502, 39.5696] },
  { name: 'Murcia', coords: [-1.1307, 37.9922] },
  { name: 'San Sebastián', coords: [-1.9812, 43.3183] },
  { name: 'Salamanca', coords: [-5.6753, 40.9701] },
  { name: 'Toledo', coords: [-4.0244, 39.8628] },
  { name: 'Segovia', coords: [-4.1183, 40.947] },
  { name: 'Cuenca', coords: [-2.1331, 40.0704] },
  { name: 'Ávila', coords: [-4.7069, 40.6565] },
  { name: 'Burgos', coords: [-3.6969, 42.3439] },
  { name: 'Oviedo', coords: [-5.8518, 43.3619] },
  { name: 'Santander', coords: [-3.8078, 43.4623] },
  { name: 'Tarragona', coords: [1.2546, 41.1189] },
  { name: 'Ronda', coords: [-5.1638, 36.7423] },
  { name: 'Marbella', coords: [-4.8825, 36.5101] },
  { name: 'Girona', coords: [2.8214, 41.9794] },
];

export default function MapChart() {
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
        {cities.map((city) => {
          const id = `marker-${city.name.replace(/\s+/g, '-')}`;
          return (
            <Marker key={city.name} coordinates={city.coords as any}>
              <a
                data-tooltip-id="my-tooltip"
                data-tooltip-content={city.name}
                data-tooltip-place="top"
              >
                <circle
                  id={id}
                  r={7}
                  fill="#E91E63"
                  stroke="#FFF"
                  strokeWidth={2}
                  data-tooltip-content={city.name}
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
