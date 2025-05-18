'use client';

import {
  Calendar,
  ChevronLeft,
  ChevronRight,
  Play,
  Square,
} from 'lucide-react';
import { useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Slider } from '@/components/ui/slider';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { getLocationColor } from '@/helpers/helpers';

const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

// Helper function to determine color based on value
const conditionFactors = {
  respiratory: ['humidity', 'air-quality', 'allergens', 'temperature'],
  cardiovascular: ['humidity', 'air-quality', 'temperature'],
  allergies: ['humidity', 'air-quality', 'allergens'],
};
const all_factors = [
  'humidity',
  'air-quality',
  'allergens',
  'temperature',
] as const;

export function SimpleSpainMap() {
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth()); // January
  const [activeTab, setActiveTab] = useState<
    'humidity' | 'air-quality' | 'allergens' | 'temperature'
  >('humidity');
  const [isPlaying, setIsPlaying] = useState(false);
  const [condition, setCondition] = useState<
    'respiratory' | 'cardiovascular' | 'allergies'
  >('respiratory');
  const [healthData, setHealthData] = useState<any>({});

  useEffect(() => {
    fetch('/api/healthdata/spain')
      .then((response) => response.json())
      .then((data) => setHealthData(data));
  }, []);

  useEffect(() => {
    if (
      !conditionFactors[condition].includes(activeTab) &&
      conditionFactors[condition][0]
    ) {
      // @ts-ignore
      setActiveTab(conditionFactors[condition][0]);
    }
  }, [condition]);

  // Function to handle auto-play of months
  const togglePlay = () => {
    if (isPlaying) {
      setIsPlaying(false);
      return;
    }

    setIsPlaying(true);
    const interval = setInterval(() => {
      setCurrentMonth((prev) => {
        const nextMonth = (prev + 1) % 12;
        if (nextMonth === 0 && isPlaying) {
          clearInterval(interval);
          setIsPlaying(false);
        }
        return nextMonth;
      });
    }, 1000);

    return () => clearInterval(interval);
  };

  // Function to get the value for the current factor and month
  const getLocationValue = (location: string, factor: string) => {
    const monthData = healthData[location].data[currentMonth];
    return monthData[factor];
  };

  // Function to get the label for the current value
  const getValueLabel = (factor: string, value: number) => {
    switch (factor) {
      case 'humidity':
        return `${value}%`;
      case 'airQuality':
        return value >= 85 ? 'Excellent' : value >= 70 ? 'Good' : 'Poor';
      case 'allergens':
        return value <= 30 ? 'Low' : value <= 60 ? 'Moderate' : 'High';
      case 'temperature':
        return `${value}°C`;
      default:
        return value;
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Spain Health Risk Map</h2>
          <p className="text-sm text-muted-foreground">
            Visualize how health factors change throughout the year in Spain
          </p>
        </div>

        <div className="flex items-center gap-2">
          <RadioGroup
            defaultValue="respiratory"
            className="flex"
            value={condition}
            // @ts-ignore
            onValueChange={setCondition}
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="respiratory" id="map-respiratory" />
              <Label htmlFor="map-respiratory">Asthma</Label>
            </div>
            <div className="flex items-center space-x-2 ml-4">
              <RadioGroupItem value="cardiovascular" id="map-cardiovascular" />
              <Label htmlFor="map-cardiovascular">Cardiovascular</Label>
            </div>
            <div className="flex items-center space-x-2 ml-4">
              <RadioGroupItem value="allergies" id="map-allergies" />
              <Label htmlFor="map-allergies">Allergies</Label>
            </div>
          </RadioGroup>
        </div>
      </div>
      {/* Time slider control */}
      <div className="space-y-2 p-4 rounded-lg border bg-card text-card-foreground shadow-sm">
        <div className="flex items-center justify-between bg-white">
          <h3 className="text-sm font-medium bg-white">
            Time of Year: {months[currentMonth]}
          </h3>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8"
              onClick={() =>
                setCurrentMonth((prev) => (prev === 0 ? 11 : prev - 1))
              }
            >
              <ChevronLeft className="h-4 w-4" />
              <span className="sr-only">Previous Month</span>
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8"
              onClick={togglePlay}
            >
              {isPlaying ? (
                <Square className="h-4 w-4" />
              ) : (
                <Play className="h-4 w-4" />
              )}
              <span className="sr-only">{isPlaying ? 'Stop' : 'Play'}</span>
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8"
              onClick={() =>
                setCurrentMonth((prev) => (prev === 11 ? 0 : prev + 1))
              }
            >
              <ChevronRight className="h-4 w-4" />
              <span className="sr-only">Next Month</span>
            </Button>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Slider
            value={[currentMonth]}
            min={0}
            max={11}
            step={1}
            onValueChange={(value) => setCurrentMonth(value[0])}
            className="flex-1"
          />
          <div className="flex items-center gap-2 rounded-md border px-3 py-1.5">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-medium">{months[currentMonth]}</span>
          </div>
        </div>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>
                Spain -{' '}
                {condition === 'respiratory'
                  ? 'Asthma'
                  : condition === 'cardiovascular'
                  ? 'Cardiovascular'
                  : 'Allergy'}{' '}
                Health Map
              </CardTitle>
              <CardDescription>
                See how conditions change throughout the year
              </CardDescription>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* @ts-ignore */}
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-4">
              {all_factors.map((factor) => {
                /* @ts-ignore */
                if (!conditionFactors[condition]?.includes(factor))
                  return <></>;
                return (
                  <TabsTrigger key={factor} value={factor}>
                    {factor}
                  </TabsTrigger>
                );
              })}
            </TabsList>
            {/* @ts-ignore */}
            {conditionFactors[condition].includes('humidity') && (
              <TabsContent value="humidity" className="pt-4">
                <div className="grid grid-cols-3 gap-4">
                  {Object.keys(healthData).length > 0 &&
                    Object.keys(healthData).map((region) => (
                      <Card key={region}>
                        <CardHeader className="p-3">
                          <CardTitle className="text-base">
                            {healthData[region].name}
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="p-3 pt-0">
                          <div
                            className={`h-4 w-full rounded-full ${getLocationColor(
                              healthData[region].data[currentMonth],
                              activeTab
                            )}`}
                          />
                          <div className="mt-2 flex items-center justify-between text-sm">
                            <span>Humidity</span>
                            <span
                              className={`font-medium ${
                                getLocationValue(region, 'humidity') <= 40
                                  ? 'text-green-600'
                                  : getLocationValue(region, 'humidity') <= 60
                                  ? 'text-amber-600'
                                  : 'text-red-600'
                              }`}
                            >
                              {getLocationValue(region, 'humidity')}%
                            </span>
                          </div>
                          <p className="mt-2 text-xs text-muted-foreground line-clamp-2">
                            {healthData[region].description}
                          </p>
                        </CardContent>
                      </Card>
                    ))}
                </div>
                <div className="mt-4 flex items-center justify-center gap-4 rounded-md bg-muted p-2 text-sm">
                  <div className="flex items-center gap-1">
                    <div className="h-3 w-3 rounded-full bg-green-500" />
                    <span>Low Humidity (&lt;40%)</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="h-3 w-3 rounded-full bg-amber-500" />
                    <span>Moderate (40-60%)</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="h-3 w-3 rounded-full bg-red-500" />
                    <span>High (&gt;60%)</span>
                  </div>
                </div>
              </TabsContent>
            )}
            {/* @ts-ignore */}
            {conditionFactors[condition].includes('air-quality') && (
              <TabsContent value="air-quality" className="pt-4">
                <div className="grid grid-cols-3 gap-4">
                  {Object.keys(healthData).map((region) => (
                    <Card key={region}>
                      <CardHeader className="p-3">
                        <CardTitle className="text-base">
                          {healthData[region].name}
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="p-3 pt-0">
                        <div
                          className={`h-4 w-full rounded-full ${getLocationColor(
                            healthData[region].data[currentMonth],
                            activeTab
                          )}`}
                        />
                        <div className="mt-2 flex items-center justify-between text-sm">
                          <span>Air Quality</span>
                          <span
                            className={`font-medium ${
                              getLocationValue(region, 'airQuality') >= 85
                                ? 'text-green-600'
                                : getLocationValue(region, 'airQuality') >= 70
                                ? 'text-amber-600'
                                : 'text-red-600'
                            }`}
                          >
                            {getValueLabel(
                              'airQuality',
                              getLocationValue(region, 'airQuality')
                            )}
                          </span>
                        </div>
                        <p className="mt-2 text-xs text-muted-foreground line-clamp-2">
                          {healthData[region].description}
                        </p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
                <div className="mt-4 flex items-center justify-center gap-4 rounded-md bg-muted p-2 text-sm">
                  <div className="flex items-center gap-1">
                    <div className="h-3 w-3 rounded-full bg-green-500" />
                    <span>Excellent (&gt;85)</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="h-3 w-3 rounded-full bg-amber-500" />
                    <span>Good (70-85)</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="h-3 w-3 rounded-full bg-red-500" />
                    <span>Poor (&lt;70)</span>
                  </div>
                </div>
              </TabsContent>
            )}
            {/* @ts-ignore */}
            {conditionFactors[condition].includes('allergens') && (
              <TabsContent value="allergens" className="pt-4">
                <div className="grid grid-cols-3 gap-4">
                  {Object.keys(healthData).map((region) => (
                    <Card key={region}>
                      <CardHeader className="p-3">
                        <CardTitle className="text-base">
                          {healthData[region].name}
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="p-3 pt-0">
                        <div
                          className={`h-4 w-full rounded-full ${getLocationColor(
                            healthData[region].data[currentMonth],
                            activeTab
                          )}`}
                        />
                        <div className="mt-2 flex items-center justify-between text-sm">
                          <span>Allergen Level</span>
                          <span
                            className={`font-medium ${
                              getLocationValue(region, 'allergens') <= 30
                                ? 'text-green-600'
                                : getLocationValue(region, 'allergens') <= 60
                                ? 'text-amber-600'
                                : 'text-red-600'
                            }`}
                          >
                            {getValueLabel(
                              'allergens',
                              getLocationValue(region, 'allergens')
                            )}
                          </span>
                        </div>
                        <p className="mt-2 text-xs text-muted-foreground line-clamp-2">
                          {healthData[region].description}
                        </p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
                <div className="mt-4 flex items-center justify-center gap-4 rounded-md bg-muted p-2 text-sm">
                  <div className="flex items-center gap-1">
                    <div className="h-3 w-3 rounded-full bg-green-500" />
                    <span>Low (&lt;30)</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="h-3 w-3 rounded-full bg-amber-500" />
                    <span>Moderate (30-60)</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="h-3 w-3 rounded-full bg-red-500" />
                    <span>High (&gt;60)</span>
                  </div>
                </div>
              </TabsContent>
            )}
            {/* @ts-ignore */}
            {conditionFactors[condition].includes('temperature') && (
              <TabsContent value="temperature" className="pt-4">
                <div className="grid grid-cols-3 gap-4">
                  {Object.keys(healthData).map((region) => (
                    <Card key={region}>
                      <CardHeader className="p-3">
                        <CardTitle className="text-base">
                          {healthData[region].name}
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="p-3 pt-0">
                        <div
                          className={`h-4 w-full rounded-full ${getLocationColor(
                            healthData[region].data[currentMonth],
                            activeTab
                          )}`}
                        />
                        <div className="mt-2 flex items-center justify-between text-sm">
                          <span>Temperature</span>
                          <span
                            className={`font-medium ${
                              getLocationValue(region, 'temperature') >= 15 &&
                              getLocationValue(region, 'temperature') <= 25
                                ? 'text-green-600'
                                : (getLocationValue(region, 'temperature') >=
                                    10 &&
                                    getLocationValue(region, 'temperature') <
                                      15) ||
                                  (getLocationValue(region, 'temperature') >
                                    25 &&
                                    getLocationValue(region, 'temperature') <=
                                      30)
                                ? 'text-amber-600'
                                : 'text-red-600'
                            }`}
                          >
                            {getLocationValue(region, 'temperature')}°C
                          </span>
                        </div>
                        <p className="mt-2 text-xs text-muted-foreground line-clamp-2">
                          {healthData[region].description}
                        </p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
                <div className="mt-4 flex items-center justify-center gap-4 rounded-md bg-muted p-2 text-sm">
                  <div className="flex items-center gap-1">
                    <div className="h-3 w-3 rounded-full bg-green-500" />
                    <span>Ideal (15-25°C)</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="h-3 w-3 rounded-full bg-amber-500" />
                    <span>Moderate (10-15°C, 25-30°C)</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="h-3 w-3 rounded-full bg-red-500" />
                    <span>Extreme (&lt;10°C, &gt;30°C)</span>
                  </div>
                </div>
              </TabsContent>
            )}
          </Tabs>
        </CardContent>
        <CardFooter>
          <div className="text-sm text-muted-foreground">
            Data shown is for{' '}
            {condition === 'respiratory'
              ? 'respiratory'
              : condition === 'cardiovascular'
              ? 'cardiovascular'
              : 'allergy'}{' '}
            health conditions in {months[currentMonth]}.
          </div>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Seasonal Health Recommendations for Spain</CardTitle>
          <CardDescription>
            Best times to visit based on your health condition
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <h3 className="text-lg font-medium mb-2">
                Best Regions for{' '}
                {condition === 'respiratory'
                  ? 'Respiratory Conditions'
                  : condition === 'cardiovascular'
                  ? 'Cardiovascular Conditions'
                  : 'Allergies'}
              </h3>
              <ol className="ml-6 list-decimal space-y-2">
                {condition === 'respiratory' ? (
                  <>
                    <li className="text-sm">
                      <span className="font-medium">Canary Islands</span> -
                      Year-round mild climate with stable humidity
                    </li>
                    <li className="text-sm">
                      <span className="font-medium">Madrid</span> - Low humidity
                      in summer, but avoid extreme heat
                    </li>
                    <li className="text-sm">
                      <span className="font-medium">Andalusia</span> - Dry
                      climate in spring and fall
                    </li>
                  </>
                ) : condition === 'cardiovascular' ? (
                  <>
                    <li className="text-sm">
                      <span className="font-medium">Valencia</span> - Moderate
                      temperatures and good medical facilities
                    </li>
                    <li className="text-sm">
                      <span className="font-medium">Barcelona</span> - Excellent
                      healthcare and moderate climate
                    </li>
                    <li className="text-sm">
                      <span className="font-medium">Canary Islands</span> -
                      Minimal temperature fluctuations
                    </li>
                  </>
                ) : (
                  <>
                    <li className="text-sm">
                      <span className="font-medium">Canary Islands</span> - Low
                      pollen counts and consistent climate
                    </li>
                    <li className="text-sm">
                      <span className="font-medium">Coastal areas</span> - Sea
                      breezes help clear allergens
                    </li>
                    <li className="text-sm">
                      <span className="font-medium">
                        Avoid inland areas in spring
                      </span>{' '}
                      - High pollen seasons
                    </li>
                  </>
                )}
              </ol>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-2">
                Best Seasons to Visit
              </h3>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="h-4 w-4 rounded-full bg-green-500" />
                  <span className="text-sm">Excellent conditions</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-4 w-4 rounded-full bg-amber-500" />
                  <span className="text-sm">
                    Moderate conditions - exercise caution
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-4 w-4 rounded-full bg-red-500" />
                  <span className="text-sm">
                    Challenging conditions - consider alternatives
                  </span>
                </div>
              </div>

              <div className="mt-4 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Canary Islands:</span>
                  <span className="text-sm text-green-600">Year-round</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Madrid:</span>
                  <span className="text-sm text-green-600">Spring & Fall</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Barcelona:</span>
                  <span className="text-sm text-green-600">Spring & Fall</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Andalusia:</span>
                  <span className="text-sm text-green-600">Spring & Fall</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
