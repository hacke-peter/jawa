'use client';

import { FC, useState } from 'react';

import 'react-tooltip/dist/react-tooltip.css';
import * as Popover from '@radix-ui/react-popover';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import { Heart, User } from 'lucide-react';
import ScoreDonut from './score-donut';

export interface City {
  name: string;
  description: string;
  images: string[];
  coords: [number];
  currentFactors: { [key: string]: number };
  score: number;
}

export const Modal: FC<
  City & {
    onAddDestination: () => void;
    onGetPersonalized: () => void;
    isAdded: boolean;
  }
> = ({
  name,
  description,
  images,
  currentFactors,
  score,
  onAddDestination,
  onGetPersonalized,
  isAdded,
}) => {
  const [showFactorsScore, setShowFactorsScore] = useState(false);
  const id = `marker-${name.replace(/\s+/g, '-')}`;

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
                    isAdded ? 'text-red-500 fill-current' : 'text-gray-600'
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
          <div onClick={() => setShowFactorsScore(!showFactorsScore)}>
            <ScoreDonut score={score} size={100} />
          </div>

          {showFactorsScore &&
            !!currentFactors &&
            Object.entries(currentFactors).map(([factor, value]) => {
              const styles = {
                width: factor === 'temperature' ? '100%' : `${value}%`,
              };

              return (
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
                      {value}
                      {factor === 'temperature' ? '°' : '%'}
                    </span>
                  </div>
                  <div
                    className={`h-3 rounded-full ${
                      value <= 40
                        ? 'bg-green-400'
                        : value <= 60
                        ? 'bg-amber-400'
                        : 'bg-red-400'
                    }`}
                    style={styles}
                  />
                </div>
              );
            })}

          <Swiper
            modules={[Navigation, Pagination]}
            navigation
            pagination={{ clickable: true }}
            spaceBetween={10}
            slidesPerView={1}
            className="mt-3"
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
