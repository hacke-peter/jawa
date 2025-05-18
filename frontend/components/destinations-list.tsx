'use client';

import React, { FC, useEffect, useState } from 'react';
import * as ScrollArea from '@radix-ui/react-scroll-area';
import ScoreDonut from '@/components/score-donut';
import { City } from '@/components/map-card';
import { Heart } from 'lucide-react';

const FavoritesList: FC = () => {
  const [destinations, setDestination] = useState<City[]>([]);

  useEffect(() => {
    setDestination(JSON.parse(localStorage.getItem('destinations') || '[]'));
  }, []);

  return (
    <div className="h-full w-full flex">
      <ScrollArea.Root className="h-full w-full">
        <ScrollArea.Viewport className="p-4 ">
          {destinations.length === 0 ? (
            <div className="text-gray-600 flex items-center justify-center">
              <span className="">No favorites added yet.</span>
            </div>
          ) : (
            destinations?.map((city) => {
              return (
                <div className="flex items-center bg-white p-4 rounded-lg shadow space-x-4 mb-2">
                  <button
                    onClick={() => {}}
                    aria-label="onAddDestination to next destinations"
                    className="p-1 rounded hover:bg-gray-100"
                  >
                    <Heart size={20} className={'text-red-500 fill-current'} />
                  </button>
                  {/* 1. City name */}
                  <h2 className="flex-none text-xl font-semibold w-32">
                    {city.name}
                  </h2>

                  {/* 2. Description */}
                  <p className="flex-auto text-sm text-gray-600">
                    {city.description}
                  </p>

                  {/* 3. Score donut */}
                  <div className="flex-none">
                    <ScoreDonut score={city.score} size={48} thickness={6} />
                  </div>

                  {/* 4. Thumbnail image */}
                  <img
                    src={city.images[0]}
                    alt={city.name}
                    className="flex-none w-24 h-16 object-cover rounded"
                  />
                </div>
              );
            })
          )}
        </ScrollArea.Viewport>

        <ScrollArea.Scrollbar
          orientation="vertical"
          className="flex touch-none p-1"
        >
          <ScrollArea.Thumb className="flex-1 bg-gray-400 rounded-full" />
        </ScrollArea.Scrollbar>

        <ScrollArea.Corner />
      </ScrollArea.Root>
    </div>
  );
};

export default FavoritesList;
