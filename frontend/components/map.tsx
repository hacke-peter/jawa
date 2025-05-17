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
import { Heart, User } from 'lucide-react';

interface City {
  name: string;
  description: string;
  images: string[];
  coords: [number];
  currentFactors: { [key: string]: number };
}

function onAddDestination(city: City) {}
function onGetPersonalized() {}

const Modal: FC<
  City & {
    onAddDestination: () => void;
    onGetPersonalized: () => void;
  }
> = ({
  name,
  description,
  images,
  currentFactors,
  onAddDestination,
  onGetPersonalized,
}) => {
  const id = `marker-${name.replace(/\s+/g, '-')}`;
  const [added, setAdded] = useState(false);

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
          {/* Header with title and icon buttons */}
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-semibold">{name}</h3>
            <div className="flex space-x-2">
              <button
                onClick={() => onAddDestination()}
                aria-label="onAddDestination to next destinations"
                className="p-1 rounded hover:bg-gray-100"
              >
                <Heart
                  size={20}
                  className={
                    added ? 'text-red-500 fill-current' : 'text-gray-600'
                  }
                />
              </button>
              <button
                onClick={() => onGetPersonalized()}
                aria-label="Get personalized info"
                className="p-1 rounded hover:bg-gray-100"
              >
                <User size={20} className="text-gray-600" />
              </button>
            </div>
          </div>

          <p className="text-sm mb-4">{description}</p>

          {!!currentFactors &&
            Object.entries(currentFactors).map(([factor, value]) => (
              <div key={factor} className="mb-2">
                <div className="flex items-center justify-between text-sm">
                  <span>{factor[0].toUpperCase() + factor.slice(1)}</span>
                  <span
                    className={`font-medium ${
                      value <= 40
                        ? 'text-green-600'
                        : value <= 60
                        ? 'text-amber-600'
                        : 'text-red-600'
                    }`}
                  >
                    {value}%
                  </span>
                </div>
                <div
                  className={`h-3 w-full rounded-full ${
                    value <= 40
                      ? 'bg-green-400'
                      : value <= 60
                      ? 'bg-amber-400'
                      : 'bg-red-400'
                  }`}
                />
              </div>
            ))}

          <Swiper
            modules={[Navigation, Pagination]}
            navigation
            pagination={{ clickable: true }}
            spaceBetween={10}
            slidesPerView={1}
          >
            {images.map((src, i) => (
              <SwiperSlide key={i}>
                <img
                  src={src}
                  alt={`${name} ${i + 1}`}
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
                  currentFactors={city.currentFactors}
                  onGetPersonalized={onGetPersonalized}
                  onAddDestination={() => onAddDestination(city)}
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
