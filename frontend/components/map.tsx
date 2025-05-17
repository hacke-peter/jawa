'use client';

import { FC, useEffect, useState } from 'react';
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
} from 'react-simple-maps';
import { Tooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css';
import * as Popover from '@radix-ui/react-popover';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';

interface City {
  name: string;
  description: string;
  images: string[];
  coords: [number];
}

const Modal: FC<City> = (city) => {
  const id = `marker-${city.name.replace(/\s+/g, '-')}`;
  return (
    <Popover.Root>
      <Popover.Trigger asChild>
        <circle
          id={id}
          r={6}
          fill="#E91E63"
          stroke="#FFF"
          strokeWidth={2}
          className="cursor-pointer"
        />
      </Popover.Trigger>

      <Popover.Portal>
        <Popover.Content
          side="right"
          align="center"
          sideOffset={8}
          className="bg-white p-4 rounded-lg shadow-lg w-64 z-50"
        >
          <h3 className="text-lg font-semibold mb-2">{city.name}</h3>
          <p className="text-sm mb-4">{city.description}</p>

          <Swiper
            modules={[Navigation, Pagination]}
            navigation
            pagination={{ clickable: true }}
            spaceBetween={10}
            slidesPerView={1}
          >
            {city.images.map((src, i) => (
              <SwiperSlide key={i}>
                <img
                  src={src}
                  alt={`${city.name} ${i + 1}`}
                  className="w-full h-32 object-cover rounded"
                />
              </SwiperSlide>
            ))}
          </Swiper>

          <Popover.Arrow className="fill-white" />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
};

export default function MapChart() {
  const [mapData, setMapData] = useState<City[]>([]);

  useEffect(() => {
    fetch('/api/map-data/spain')
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setMapData(data);
      });
  }, []);
  const [selectedCity, setSelectedCity] = useState<string>('');
  useEffect(() => {
    if (selectedCity) {
    }
  }, [selectedCity]);
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
                onClick={() => setSelectedCity(city.name)}
              >
                <Modal
                  name={city.name}
                  description={city.description}
                  images={city.images}
                  coords={city.coords}
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
