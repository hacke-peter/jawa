import React, { FC } from 'react';
import * as ScrollArea from '@radix-ui/react-scroll-area';
import * as Separator from '@radix-ui/react-separator';
import ScoreDonut from '@/components/score-donut';
import { City } from '@/components/map-card';

interface FavoritesListProps {
  favorites: City[];
}

const FavoritesList: FC<FavoritesListProps> = ({ favorites }) => {
  return (
    <div className="h-full w-full flex">
      <ScrollArea.Root className="h-full w-full">
        <ScrollArea.Viewport className="p-4">
          {favorites?.length === 0 ? (
            <div className="text-gray-600">No favorites added yet.</div>
          ) : (
            favorites?.map((city) => {
              const firstImage = city.images[0];
              const id = `fav-${city.name.replace(/\s+/g, '-').toLowerCase()}`;

              return (
                <React.Fragment key={id}>
                  <div className="flex bg-white rounded-lg shadow overflow-hidden mb-4">
                    <div className="flex-1 p-4 flex flex-col justify-between">
                      <div>
                        <h4 className="text-xl font-semibold mb-1">
                          {city.name}
                        </h4>
                        <p className="text-sm text-gray-700 mb-3">
                          {city.description}
                        </p>
                      </div>
                      <ScoreDonut score={city.score} size={64} />
                    </div>
                    {firstImage && (
                      <div className="w-32 h-32 flex-shrink-0">
                        <img
                          src={firstImage}
                          alt={`${city.name} preview`}
                          className="object-cover w-full h-full"
                        />
                      </div>
                    )}
                  </div>
                  <Separator.Root className="h-px bg-gray-200 my-2" />
                </React.Fragment>
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
