'use client';

import { useState, useEffect } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
} from 'react-simple-maps';
import AutocompleteSearch from './search';
import { City } from './map-card';
import 'react-tooltip/dist/react-tooltip.css';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import ScoreDonut from './score-donut';

export default function MapChart() {
  const [mapData, setMapData] = useState<City[]>([]);
  const [openCity, setOpenCity] = useState<City | null>(null);

  // ← NEW: whether to show the per-factor bars
  const [showFactorsScore, setShowFactorsScore] = useState(false);

  // fetch your data once
  useEffect(() => {
    fetch('/api/map-data/spain')
      .then((res) => res.json())
      .then(setMapData);
  }, []);

  // reset the factor view any time you open a different city
  useEffect(() => {
    setShowFactorsScore(false);
  }, [openCity]);

  return (
    <>
      {/* search can open the dialog too */}
      <div className="flex justify-end mb-4">
        <AutocompleteSearch
          options={mapData.map((c) => c.name)}
          onSearch={(name) => {
            const city = mapData.find((c) => c.name === name);
            if (city) setOpenCity(city);
          }}
        />
      </div>

      <div className="container mx-auto max-w-lg">
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
                  }}
                />
              ))
            }
          </Geographies>

          {mapData.map((city) => (
            <Marker key={city.name} coordinates={city.coords as any}>
              <circle
                r={6}
                fill="#E91E63"
                stroke="#FFF"
                strokeWidth={2}
                className="cursor-pointer"
                onClick={() => setOpenCity(city)}
              />
            </Marker>
          ))}
        </ComposableMap>
      </div>

      {/* Controlled Dialog */}
      <Dialog.Root
        open={!!openCity}
        onOpenChange={(isOpen) => {
          if (!isOpen) setOpenCity(null);
        }}
      >
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black/40" />
          <Dialog.Content
            className="fixed top-1/2 left-1/2 w-full max-w-md -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-lg shadow-lg"
            style={{ maxWidth: '320px' }}
          >
            {openCity && (
              <>
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-semibold">{openCity.name}</h3>
                  <Dialog.Close asChild>
                    <button className="text-gray-500 hover:text-gray-700">
                      &times;
                    </button>
                  </Dialog.Close>
                </div>

                <p className="text-sm text-gray-600 mb-4">
                  {openCity.description}
                </p>

                {/* ← THIS is your “click the donut to toggle factors” */}
                <div
                  onClick={() => setShowFactorsScore((f) => !f)}
                  className="inline-block mb-4 cursor-pointer flex justify-center items-center"
                >
                  <ScoreDonut score={openCity.score} size={100} thickness={6} />
                </div>

                {showFactorsScore &&
                  openCity.currentFactors &&
                  Object.entries(openCity.currentFactors).map(
                    ([factor, value]) => {
                      const width =
                        factor === 'temperature' ? '100%' : `${value}%`;
                      const colorClass =
                        value <= 40
                          ? 'bg-green-400'
                          : value <= 60
                          ? 'bg-amber-400'
                          : 'bg-red-400';
                      const textColor =
                        value <= 40
                          ? 'text-green-600'
                          : value <= 60
                          ? 'text-amber-600'
                          : 'text-red-600';
                      return (
                        <div key={factor} className="mb-2">
                          <div className="flex items-center justify-between text-sm">
                            <span>
                              {factor[0].toUpperCase() + factor.slice(1)}
                            </span>
                            <span className={`font-medium ${textColor}`}>
                              {value}
                              {factor === 'temperature' ? '°' : '%'}
                            </span>
                          </div>
                          <div
                            className={`h-3 rounded-full ${colorClass}`}
                            style={{ width }}
                          />
                        </div>
                      );
                    }
                  )}

                <Swiper
                  modules={[Navigation, Pagination]}
                  navigation
                  pagination={{ clickable: true }}
                  spaceBetween={10}
                  slidesPerView={1}
                  className="mt-4"
                >
                  {openCity.images.map((src, i) => (
                    <SwiperSlide key={i}>
                      <img
                        src={src}
                        alt={`${openCity.name} ${i + 1}`}
                        className="w-full h-32 object-cover rounded"
                      />
                    </SwiperSlide>
                  ))}
                </Swiper>
              </>
            )}
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </>
  );
}
