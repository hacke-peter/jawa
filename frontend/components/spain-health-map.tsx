"use client"

import { Calendar, ChevronLeft, ChevronRight, Info, Play, Square } from "lucide-react"
import { useState } from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Slider } from "@/components/ui/slider"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
]

// Health data by location and month for Spain regions
const spainHealthData = {
  canaryIslands: {
    name: "Canary Islands",
    data: [
      { month: 0, humidity: 65, airQuality: 90, allergens: 20, temperature: 18 }, // Jan
      { month: 1, humidity: 65, airQuality: 90, allergens: 25, temperature: 18 }, // Feb
      { month: 2, humidity: 60, airQuality: 90, allergens: 35, temperature: 19 }, // Mar
      { month: 3, humidity: 60, airQuality: 95, allergens: 45, temperature: 20 }, // Apr
      { month: 4, humidity: 60, airQuality: 95, allergens: 40, temperature: 21 }, // May
      { month: 5, humidity: 55, airQuality: 90, allergens: 30, temperature: 23 }, // Jun
      { month: 6, humidity: 55, airQuality: 90, allergens: 25, temperature: 24 }, // Jul
      { month: 7, humidity: 60, airQuality: 85, allergens: 20, temperature: 25 }, // Aug
      { month: 8, humidity: 65, airQuality: 90, allergens: 25, temperature: 24 }, // Sep
      { month: 9, humidity: 65, airQuality: 95, allergens: 30, temperature: 23 }, // Oct
      { month: 10, humidity: 70, airQuality: 90, allergens: 25, temperature: 21 }, // Nov
      { month: 11, humidity: 70, airQuality: 90, allergens: 20, temperature: 19 }, // Dec
    ],
    position: { left: "15%", top: "80%" },
    description:
      "The Canary Islands enjoy a year-round spring-like climate with minimal temperature fluctuations. The steady climate is beneficial for many health conditions, especially respiratory issues.",
  },
  barcelona: {
    name: "Barcelona",
    data: [
      { month: 0, humidity: 70, airQuality: 75, allergens: 15, temperature: 10 }, // Jan
      { month: 1, humidity: 70, airQuality: 75, allergens: 20, temperature: 11 }, // Feb
      { month: 2, humidity: 65, airQuality: 70, allergens: 45, temperature: 13 }, // Mar
      { month: 3, humidity: 65, airQuality: 75, allergens: 65, temperature: 15 }, // Apr
      { month: 4, humidity: 65, airQuality: 80, allergens: 70, temperature: 19 }, // May
      { month: 5, humidity: 65, airQuality: 75, allergens: 50, temperature: 23 }, // Jun
      { month: 6, humidity: 70, airQuality: 70, allergens: 35, temperature: 26 }, // Jul
      { month: 7, humidity: 70, airQuality: 65, allergens: 30, temperature: 26 }, // Aug
      { month: 8, humidity: 70, airQuality: 75, allergens: 35, temperature: 23 }, // Sep
      { month: 9, humidity: 70, airQuality: 80, allergens: 30, temperature: 19 }, // Oct
      { month: 10, humidity: 75, airQuality: 75, allergens: 20, temperature: 14 }, // Nov
      { month: 11, humidity: 75, airQuality: 75, allergens: 15, temperature: 11 }, // Dec
    ],
    position: { left: "75%", top: "25%" },
    description:
      "Barcelona has a Mediterranean climate with moderate humidity year-round. Air quality can be affected by urban pollution, especially in summer. Spring has higher allergen levels due to pollen.",
  },
  madrid: {
    name: "Madrid",
    data: [
      { month: 0, humidity: 65, airQuality: 70, allergens: 10, temperature: 6 }, // Jan
      { month: 1, humidity: 60, airQuality: 70, allergens: 15, temperature: 8 }, // Feb
      { month: 2, humidity: 55, airQuality: 65, allergens: 50, temperature: 11 }, // Mar
      { month: 3, humidity: 50, airQuality: 70, allergens: 70, temperature: 14 }, // Apr
      { month: 4, humidity: 45, airQuality: 75, allergens: 65, temperature: 18 }, // May
      { month: 5, humidity: 40, airQuality: 65, allergens: 45, temperature: 24 }, // Jun
      { month: 6, humidity: 35, airQuality: 60, allergens: 30, temperature: 28 }, // Jul
      { month: 7, humidity: 35, airQuality: 55, allergens: 25, temperature: 28 }, // Aug
      { month: 8, humidity: 40, airQuality: 65, allergens: 30, temperature: 24 }, // Sep
      { month: 9, humidity: 50, airQuality: 75, allergens: 25, temperature: 17 }, // Oct
      { month: 10, humidity: 60, airQuality: 70, allergens: 15, temperature: 11 }, // Nov
      { month: 11, humidity: 65, airQuality: 70, allergens: 10, temperature: 7 }, // Dec
    ],
    position: { left: "50%", top: "35%" },
    description:
      "Madrid has a continental Mediterranean climate with very hot, dry summers and cool winters. The low humidity in summer is beneficial for respiratory conditions, but high temperatures can be challenging.",
  },
  andalusia: {
    name: "Andalusia",
    data: [
      { month: 0, humidity: 70, airQuality: 80, allergens: 15, temperature: 12 }, // Jan
      { month: 1, humidity: 65, airQuality: 80, allergens: 25, temperature: 13 }, // Feb
      { month: 2, humidity: 60, airQuality: 75, allergens: 55, temperature: 16 }, // Mar
      { month: 3, humidity: 55, airQuality: 80, allergens: 70, temperature: 18 }, // Apr
      { month: 4, humidity: 50, airQuality: 85, allergens: 60, temperature: 22 }, // May
      { month: 5, humidity: 45, airQuality: 80, allergens: 40, temperature: 27 }, // Jun
      { month: 6, humidity: 40, airQuality: 75, allergens: 25, temperature: 31 }, // Jul
      { month: 7, humidity: 40, airQuality: 70, allergens: 20, temperature: 31 }, // Aug
      { month: 8, humidity: 45, airQuality: 80, allergens: 25, temperature: 27 }, // Sep
      { month: 9, humidity: 55, airQuality: 85, allergens: 30, temperature: 22 }, // Oct
      { month: 10, humidity: 65, airQuality: 80, allergens: 20, temperature: 16 }, // Nov
      { month: 11, humidity: 70, airQuality: 80, allergens: 15, temperature: 13 }, // Dec
    ],
    position: { left: "45%", top: "70%" },
    description:
      "Andalusia has a Mediterranean climate with very hot summers and mild winters. The region has low humidity in summer months which can benefit respiratory conditions, but extreme heat can be challenging.",
  },
  valencia: {
    name: "Valencia",
    data: [
      { month: 0, humidity: 65, airQuality: 80, allergens: 15, temperature: 12 }, // Jan
      { month: 1, humidity: 65, airQuality: 80, allergens: 25, temperature: 13 }, // Feb
      { month: 2, humidity: 60, airQuality: 75, allergens: 50, temperature: 15 }, // Mar
      { month: 3, humidity: 60, airQuality: 80, allergens: 65, temperature: 17 }, // Apr
      { month: 4, humidity: 60, airQuality: 85, allergens: 60, temperature: 20 }, // May
      { month: 5, humidity: 60, airQuality: 80, allergens: 45, temperature: 24 }, // Jun
      { month: 6, humidity: 65, airQuality: 75, allergens: 30, temperature: 27 }, // Jul
      { month: 7, humidity: 65, airQuality: 70, allergens: 25, temperature: 27 }, // Aug
      { month: 8, humidity: 65, airQuality: 80, allergens: 30, temperature: 24 }, // Sep
      { month: 9, humidity: 65, airQuality: 85, allergens: 25, temperature: 20 }, // Oct
      { month: 10, humidity: 65, airQuality: 80, allergens: 20, temperature: 16 }, // Nov
      { month: 11, humidity: 65, airQuality: 80, allergens: 15, temperature: 13 }, // Dec
    ],
    position: { left: "70%", top: "45%" },
    description:
      "Valencia has a Mediterranean climate with moderate humidity year-round. The coastal location provides good air quality, and the climate is generally favorable for respiratory conditions.",
  },
  galicia: {
    name: "Galicia",
    data: [
      { month: 0, humidity: 80, airQuality: 85, allergens: 10, temperature: 10 }, // Jan
      { month: 1, humidity: 75, airQuality: 85, allergens: 15, temperature: 11 }, // Feb
      { month: 2, humidity: 75, airQuality: 80, allergens: 40, temperature: 13 }, // Mar
      { month: 3, humidity: 70, airQuality: 85, allergens: 60, temperature: 14 }, // Apr
      { month: 4, humidity: 70, airQuality: 90, allergens: 65, temperature: 16 }, // May
      { month: 5, humidity: 70, airQuality: 90, allergens: 50, temperature: 19 }, // Jun
      { month: 6, humidity: 70, airQuality: 85, allergens: 35, temperature: 21 }, // Jul
      { month: 7, humidity: 70, airQuality: 85, allergens: 30, temperature: 21 }, // Aug
      { month: 8, humidity: 75, airQuality: 90, allergens: 35, temperature: 20 }, // Sep
      { month: 9, humidity: 75, airQuality: 90, allergens: 25, temperature: 17 }, // Oct
      { month: 10, humidity: 80, airQuality: 85, allergens: 15, temperature: 13 }, // Nov
      { month: 11, humidity: 80, airQuality: 85, allergens: 10, temperature: 11 }, // Dec
    ],
    position: { left: "25%", top: "15%" },
    description:
      "Galicia has an Atlantic climate with higher humidity and rainfall. The air quality is excellent due to low pollution, but the high humidity may be challenging for some respiratory conditions.",
  },
}

// Helper function to determine color based on value
const getHumidityColor = (value) => {
  if (value <= 40) return "bg-green-500"
  if (value <= 60) return "bg-amber-500"
  return "bg-red-500"
}

const getAirQualityColor = (value) => {
  if (value >= 85) return "bg-green-500"
  if (value >= 70) return "bg-amber-500"
  return "bg-red-500"
}

const getAllergenColor = (value) => {
  if (value <= 30) return "bg-green-500"
  if (value <= 60) return "bg-amber-500"
  return "bg-red-500"
}

const getTemperatureColor = (value) => {
  if (value >= 15 && value <= 25) return "bg-green-500"
  if ((value >= 10 && value < 15) || (value > 25 && value <= 30)) return "bg-amber-500"
  return "bg-red-500"
}

export function SpainHealthMap() {
  const [currentMonth, setCurrentMonth] = useState(0) // January
  const [activeTab, setActiveTab] = useState("humidity")
  const [isPlaying, setIsPlaying] = useState(false)
  const [condition, setCondition] = useState("respiratory")

  // Function to handle auto-play of months
  const togglePlay = () => {
    if (isPlaying) {
      setIsPlaying(false)
      return
    }

    setIsPlaying(true)
    const interval = setInterval(() => {
      setCurrentMonth((prev) => {
        const nextMonth = (prev + 1) % 12
        if (nextMonth === 0 && isPlaying) {
          clearInterval(interval)
          setIsPlaying(false)
        }
        return nextMonth
      })
    }, 1000)

    return () => clearInterval(interval)
  }

  // Function to get color for a location based on the current factor and month
  const getLocationColor = (location) => {
    const monthData = spainHealthData[location].data[currentMonth]

    switch (activeTab) {
      case "humidity":
        return getHumidityColor(monthData.humidity)
      case "air-quality":
        return getAirQualityColor(monthData.airQuality)
      case "allergens":
        return getAllergenColor(monthData.allergens)
      case "temperature":
        return getTemperatureColor(monthData.temperature)
      default:
        return "bg-gray-500"
    }
  }

  // Function to get the value for the current factor and month
  const getLocationValue = (location, factor) => {
    const monthData = spainHealthData[location].data[currentMonth]
    return monthData[factor]
  }

  // Function to get the label for the current value
  const getValueLabel = (factor, value) => {
    switch (factor) {
      case "humidity":
        return `${value}%`
      case "airQuality":
        return value >= 85 ? "Excellent" : value >= 70 ? "Good" : "Poor"
      case "allergens":
        return value <= 30 ? "Low" : value <= 60 ? "Moderate" : "High"
      case "temperature":
        return `${value}°C`
      default:
        return value
    }
  }

  // Function to get the factor name for display
  const getFactorName = (factor) => {
    switch (factor) {
      case "humidity":
        return "Humidity"
      case "airQuality":
        return "Air Quality"
      case "allergens":
        return "Allergen Level"
      case "temperature":
        return "Temperature"
      default:
        return factor
    }
  }

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
          <RadioGroup defaultValue="respiratory" className="flex" value={condition} onValueChange={setCondition}>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="respiratory" id="map-respiratory" />
              <Label htmlFor="map-respiratory">Respiratory</Label>
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

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>
                Spain -{" "}
                {condition === "respiratory"
                  ? "Respiratory"
                  : condition === "cardiovascular"
                    ? "Cardiovascular"
                    : "Allergy"}{" "}
                Health Map
              </CardTitle>
              <CardDescription>See how conditions change throughout the year</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="humidity">Humidity</TabsTrigger>
              <TabsTrigger value="air-quality">Air Quality</TabsTrigger>
              <TabsTrigger value="allergens">Allergens</TabsTrigger>
              <TabsTrigger value="temperature">Temperature</TabsTrigger>
            </TabsList>
            <TabsContent value="humidity" className="pt-4">
              <div className="relative aspect-video overflow-hidden rounded-md border bg-muted/20">
                <img
                  src="/placeholder.svg?height=400&width=800"
                  alt="Spain Map"
                  className="h-full w-full object-cover opacity-50"
                />

                {/* Map markers for each region */}
                {Object.keys(spainHealthData).map((region) => (
                  <HoverCard key={region}>
                    <HoverCardTrigger asChild>
                      <Button
                        variant="ghost"
                        className={`absolute left-[${spainHealthData[region].position.left}] top-[${spainHealthData[region].position.top}] h-8 w-8 rounded-full ${getLocationColor(region)} p-0 text-white hover:opacity-90`}
                        style={{
                          left: spainHealthData[region].position.left,
                          top: spainHealthData[region].position.top,
                        }}
                      >
                        <span className="sr-only">{spainHealthData[region].name}</span>
                        <Info className="h-4 w-4" />
                      </Button>
                    </HoverCardTrigger>
                    <HoverCardContent className="w-80">
                      <div className="space-y-2">
                        <h4 className="text-sm font-semibold">{spainHealthData[region].name}</h4>
                        <div className="flex items-center justify-between text-sm">
                          <span>Humidity ({months[currentMonth]})</span>
                          <span
                            className={`font-medium ${getLocationValue(region, "humidity") <= 40 ? "text-green-600" : getLocationValue(region, "humidity") <= 60 ? "text-amber-600" : "text-red-600"}`}
                          >
                            {getLocationValue(region, "humidity")}%
                          </span>
                        </div>
                        <p className="text-xs text-muted-foreground">{spainHealthData[region].description}</p>
                        <Button size="sm" className="w-full">
                          View Details
                        </Button>
                      </div>
                    </HoverCardContent>
                  </HoverCard>
                ))}

                <div className="absolute bottom-4 right-4 flex items-center gap-2 rounded-md bg-background/90 p-2 text-xs">
                  <div className="flex items-center gap-1">
                    <div className="h-3 w-3 rounded-full bg-green-500"></div>
                    <span>Low Humidity</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="h-3 w-3 rounded-full bg-amber-500"></div>
                    <span>Moderate Humidity</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="h-3 w-3 rounded-full bg-red-500"></div>
                    <span>High Humidity</span>
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* Similar content for other tabs, with appropriate legends */}
            <TabsContent value="air-quality" className="pt-4">
              <div className="relative aspect-video overflow-hidden rounded-md border bg-muted/20">
                <img
                  src="/placeholder.svg?height=400&width=800"
                  alt="Spain Air Quality Map"
                  className="h-full w-full object-cover opacity-50"
                />

                {/* Map markers for each region */}
                {Object.keys(spainHealthData).map((region) => (
                  <HoverCard key={region}>
                    <HoverCardTrigger asChild>
                      <Button
                        variant="ghost"
                        className={`absolute h-8 w-8 rounded-full ${getLocationColor(region)} p-0 text-white hover:opacity-90`}
                        style={{
                          left: spainHealthData[region].position.left,
                          top: spainHealthData[region].position.top,
                        }}
                      >
                        <span className="sr-only">{spainHealthData[region].name}</span>
                        <Info className="h-4 w-4" />
                      </Button>
                    </HoverCardTrigger>
                    <HoverCardContent className="w-80">
                      <div className="space-y-2">
                        <h4 className="text-sm font-semibold">{spainHealthData[region].name}</h4>
                        <div className="flex items-center justify-between text-sm">
                          <span>Air Quality ({months[currentMonth]})</span>
                          <span
                            className={`font-medium ${getLocationValue(region, "airQuality") >= 85 ? "text-green-600" : getLocationValue(region, "airQuality") >= 70 ? "text-amber-600" : "text-red-600"}`}
                          >
                            {getValueLabel("airQuality", getLocationValue(region, "airQuality"))}
                          </span>
                        </div>
                        <p className="text-xs text-muted-foreground">{spainHealthData[region].description}</p>
                        <Button size="sm" className="w-full">
                          View Details
                        </Button>
                      </div>
                    </HoverCardContent>
                  </HoverCard>
                ))}

                <div className="absolute bottom-4 right-4 flex items-center gap-2 rounded-md bg-background/90 p-2 text-xs">
                  <div className="flex items-center gap-1">
                    <div className="h-3 w-3 rounded-full bg-green-500"></div>
                    <span>Excellent</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="h-3 w-3 rounded-full bg-amber-500"></div>
                    <span>Good</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="h-3 w-3 rounded-full bg-red-500"></div>
                    <span>Poor</span>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="allergens" className="pt-4">
              <div className="relative aspect-video overflow-hidden rounded-md border bg-muted/20">
                <img
                  src="/placeholder.svg?height=400&width=800"
                  alt="Spain Allergens Map"
                  className="h-full w-full object-cover opacity-50"
                />

                {/* Map markers for each region */}
                {Object.keys(spainHealthData).map((region) => (
                  <HoverCard key={region}>
                    <HoverCardTrigger asChild>
                      <Button
                        variant="ghost"
                        className={`absolute h-8 w-8 rounded-full ${getLocationColor(region)} p-0 text-white hover:opacity-90`}
                        style={{
                          left: spainHealthData[region].position.left,
                          top: spainHealthData[region].position.top,
                        }}
                      >
                        <span className="sr-only">{spainHealthData[region].name}</span>
                        <Info className="h-4 w-4" />
                      </Button>
                    </HoverCardTrigger>
                    <HoverCardContent className="w-80">
                      <div className="space-y-2">
                        <h4 className="text-sm font-semibold">{spainHealthData[region].name}</h4>
                        <div className="flex items-center justify-between text-sm">
                          <span>Allergen Level ({months[currentMonth]})</span>
                          <span
                            className={`font-medium ${getLocationValue(region, "allergens") <= 30 ? "text-green-600" : getLocationValue(region, "allergens") <= 60 ? "text-amber-600" : "text-red-600"}`}
                          >
                            {getValueLabel("allergens", getLocationValue(region, "allergens"))}
                          </span>
                        </div>
                        <p className="text-xs text-muted-foreground">{spainHealthData[region].description}</p>
                        <Button size="sm" className="w-full">
                          View Details
                        </Button>
                      </div>
                    </HoverCardContent>
                  </HoverCard>
                ))}

                <div className="absolute bottom-4 right-4 flex items-center gap-2 rounded-md bg-background/90 p-2 text-xs">
                  <div className="flex items-center gap-1">
                    <div className="h-3 w-3 rounded-full bg-green-500"></div>
                    <span>Low</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="h-3 w-3 rounded-full bg-amber-500"></div>
                    <span>Moderate</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="h-3 w-3 rounded-full bg-red-500"></div>
                    <span>High</span>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="temperature" className="pt-4">
              <div className="relative aspect-video overflow-hidden rounded-md border bg-muted/20">
                <img
                  src="/placeholder.svg?height=400&width=800"
                  alt="Spain Temperature Map"
                  className="h-full w-full object-cover opacity-50"
                />

                {/* Map markers for each region */}
                {Object.keys(spainHealthData).map((region) => (
                  <HoverCard key={region}>
                    <HoverCardTrigger asChild>
                      <Button
                        variant="ghost"
                        className={`absolute h-8 w-8 rounded-full ${getLocationColor(region)} p-0 text-white hover:opacity-90`}
                        style={{
                          left: spainHealthData[region].position.left,
                          top: spainHealthData[region].position.top,
                        }}
                      >
                        <span className="sr-only">{spainHealthData[region].name}</span>
                        <Info className="h-4 w-4" />
                      </Button>
                    </HoverCardTrigger>
                    <HoverCardContent className="w-80">
                      <div className="space-y-2">
                        <h4 className="text-sm font-semibold">{spainHealthData[region].name}</h4>
                        <div className="flex items-center justify-between text-sm">
                          <span>Temperature ({months[currentMonth]})</span>
                          <span
                            className={`font-medium ${
                              getLocationValue(region, "temperature") >= 15 &&
                              getLocationValue(region, "temperature") <= 25
                                ? "text-green-600"
                                : (getLocationValue(region, "temperature") >= 10 &&
                                      getLocationValue(region, "temperature") < 15) ||
                                    (getLocationValue(region, "temperature") > 25 &&
                                      getLocationValue(region, "temperature") <= 30)
                                  ? "text-amber-600"
                                  : "text-red-600"
                            }`}
                          >
                            {getLocationValue(region, "temperature")}°C
                          </span>
                        </div>
                        <p className="text-xs text-muted-foreground">{spainHealthData[region].description}</p>
                        <Button size="sm" className="w-full">
                          View Details
                        </Button>
                      </div>
                    </HoverCardContent>
                  </HoverCard>
                ))}

                <div className="absolute bottom-4 right-4 flex items-center gap-2 rounded-md bg-background/90 p-2 text-xs">
                  <div className="flex items-center gap-1">
                    <div className="h-3 w-3 rounded-full bg-green-500"></div>
                    <span>Ideal (15-25°C)</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="h-3 w-3 rounded-full bg-amber-500"></div>
                    <span>Moderate (10-15°C, 25-30°C)</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="h-3 w-3 rounded-full bg-red-500"></div>
                    <span>Extreme (&lt;10°C, &gt;30°C)</span>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>

          {/* Time slider control */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-medium">Time of Year</h3>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => setCurrentMonth((prev) => (prev === 0 ? 11 : prev - 1))}
                >
                  <ChevronLeft className="h-4 w-4" />
                  <span className="sr-only">Previous Month</span>
                </Button>
                <Button variant="outline" size="icon" className="h-8 w-8" onClick={togglePlay}>
                  {isPlaying ? <Square className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                  <span className="sr-only">{isPlaying ? "Stop" : "Play"}</span>
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => setCurrentMonth((prev) => (prev === 11 ? 0 : prev + 1))}
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

          {/* Current conditions summary */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {Object.keys(spainHealthData).map((region) => (
              <Card key={region} className="overflow-hidden">
                <CardHeader className="p-4">
                  <CardTitle className="text-sm">{spainHealthData[region].name}</CardTitle>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="flex flex-col">
                      <span className="text-muted-foreground">Humidity</span>
                      <span
                        className={`font-medium ${getLocationValue(region, "humidity") <= 40 ? "text-green-600" : getLocationValue(region, "humidity") <= 60 ? "text-amber-600" : "text-red-600"}`}
                      >
                        {getLocationValue(region, "humidity")}%
                      </span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-muted-foreground">Air Quality</span>
                      <span
                        className={`font-medium ${getLocationValue(region, "airQuality") >= 85 ? "text-green-600" : getLocationValue(region, "airQuality") >= 70 ? "text-amber-600" : "text-red-600"}`}
                      >
                        {getValueLabel("airQuality", getLocationValue(region, "airQuality"))}
                      </span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-muted-foreground">Allergens</span>
                      <span
                        className={`font-medium ${getLocationValue(region, "allergens") <= 30 ? "text-green-600" : getLocationValue(region, "allergens") <= 60 ? "text-amber-600" : "text-red-600"}`}
                      >
                        {getValueLabel("allergens", getLocationValue(region, "allergens"))}
                      </span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-muted-foreground">Temperature</span>
                      <span
                        className={`font-medium ${
                          getLocationValue(region, "temperature") >= 15 && getLocationValue(region, "temperature") <= 25
                            ? "text-green-600"
                            : (getLocationValue(region, "temperature") >= 10 &&
                                  getLocationValue(region, "temperature") < 15) ||
                                (getLocationValue(region, "temperature") > 25 &&
                                  getLocationValue(region, "temperature") <= 30)
                              ? "text-amber-600"
                              : "text-red-600"
                        }`}
                      >
                        {getLocationValue(region, "temperature")}°C
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Seasonal Health Recommendations for Spain</CardTitle>
            <CardDescription>Best times to visit based on your health condition</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <h4 className="font-medium">Canary Islands</h4>
              <div className="grid grid-cols-4 gap-1 text-xs">
                <div
                  className={`rounded-md p-1 text-center ${currentMonth >= 2 && currentMonth <= 4 ? "bg-green-100 text-green-800 font-medium" : ""}`}
                >
                  Spring
                </div>
                <div
                  className={`rounded-md p-1 text-center ${currentMonth >= 5 && currentMonth <= 7 ? "bg-green-100 text-green-800 font-medium" : ""}`}
                >
                  Summer
                </div>
                <div
                  className={`rounded-md p-1 text-center ${currentMonth >= 8 && currentMonth <= 10 ? "bg-green-100 text-green-800 font-medium" : ""}`}
                >
                  Fall
                </div>
                <div
                  className={`rounded-md p-1 text-center ${currentMonth >= 11 || currentMonth <= 1 ? "bg-green-100 text-green-800 font-medium" : ""}`}
                >
                  Winter
                </div>
              </div>
              <p className="text-xs text-muted-foreground">
                Excellent year-round with minimal seasonal variations. Consistent climate benefits respiratory health.
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium">Madrid</h4>
              <div className="grid grid-cols-4 gap-1 text-xs">
                <div
                  className={`rounded-md p-1 text-center ${currentMonth >= 2 && currentMonth <= 4 ? "bg-amber-100 text-amber-800 font-medium" : ""}`}
                >
                  Spring
                </div>
                <div
                  className={`rounded-md p-1 text-center ${currentMonth >= 5 && currentMonth <= 7 ? "bg-red-100 text-red-800 font-medium" : ""}`}
                >
                  Summer
                </div>
                <div
                  className={`rounded-md p-1 text-center ${currentMonth >= 8 && currentMonth <= 10 ? "bg-green-100 text-green-800 font-medium" : ""}`}
                >
                  Fall
                </div>
                <div
                  className={`rounded-md p-1 text-center ${currentMonth >= 11 || currentMonth <= 1 ? "bg-amber-100 text-amber-800 font-medium" : ""}`}
                >
                  Winter
                </div>
              </div>
              <p className="text-xs text-muted-foreground">
                Best in fall when temperatures are moderate and humidity is low. Summer can be extremely hot.
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium">Andalusia</h4>
              <div className="grid grid-cols-4 gap-1 text-xs">
                <div
                  className={`rounded-md p-1 text-center ${currentMonth >= 2 && currentMonth <= 4 ? "bg-green-100 text-green-800 font-medium" : ""}`}
                >
                  Spring
                </div>
                <div
                  className={`rounded-md p-1 text-center ${currentMonth >= 5 && currentMonth <= 7 ? "bg-red-100 text-red-800 font-medium" : ""}`}
                >
                  Summer
                </div>
                <div
                  className={`rounded-md p-1 text-center ${currentMonth >= 8 && currentMonth <= 10 ? "bg-green-100 text-green-800 font-medium" : ""}`}
                >
                  Fall
                </div>
                <div
                  className={`rounded-md p-1 text-center ${currentMonth >= 11 || currentMonth <= 1 ? "bg-amber-100 text-amber-800 font-medium" : ""}`}
                >
                  Winter
                </div>
              </div>
              <p className="text-xs text-muted-foreground">
                Best in spring and fall. Summer is very hot with temperatures often exceeding 30°C.
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium">Galicia</h4>
              <div className="grid grid-cols-4 gap-1 text-xs">
                <div
                  className={`rounded-md p-1 text-center ${currentMonth >= 2 && currentMonth <= 4 ? "bg-amber-100 text-amber-800 font-medium" : ""}`}
                >
                  Spring
                </div>
                <div
                  className={`rounded-md p-1 text-center ${currentMonth >= 5 && currentMonth <= 7 ? "bg-amber-100 text-amber-800 font-medium" : ""}`}
                >
                  Summer
                </div>
                <div
                  className={`rounded-md p-1 text-center ${currentMonth >= 8 && currentMonth <= 10 ? "bg-amber-100 text-amber-800 font-medium" : ""}`}
                >
                  Fall
                </div>
                <div
                  className={`rounded-md p-1 text-center ${currentMonth >= 11 || currentMonth <= 1 ? "bg-red-100 text-red-800 font-medium" : ""}`}
                >
                  Winter
                </div>
              </div>
              <p className="text-xs text-muted-foreground">
                High humidity year-round may be challenging for respiratory conditions, but air quality is excellent.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Spain Regional Health Comparison</CardTitle>
            <CardDescription>Best regions for different health conditions</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <h4 className="font-medium">Respiratory Conditions</h4>
              <ol className="ml-6 list-decimal text-sm text-muted-foreground space-y-1">
                <li>
                  <span className="font-medium">Canary Islands</span> - Year-round mild climate with stable humidity
                </li>
                <li>
                  <span className="font-medium">Madrid</span> - Low humidity in summer, but avoid extreme heat
                </li>
                <li>
                  <span className="font-medium">Andalusia</span> - Dry climate in spring and fall
                </li>
              </ol>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium">Cardiovascular Conditions</h4>
              <ol className="ml-6 list-decimal text-sm text-muted-foreground space-y-1">
                <li>
                  <span className="font-medium">Valencia</span> - Moderate temperatures and good medical facilities
                </li>
                <li>
                  <span className="font-medium">Barcelona</span> - Excellent healthcare and moderate climate
                </li>
                <li>
                  <span className="font-medium">Canary Islands</span> - Minimal temperature fluctuations
                </li>
              </ol>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium">Allergies</h4>
              <ol className="ml-6 list-decimal text-sm text-muted-foreground space-y-1">
                <li>
                  <span className="font-medium">Canary Islands</span> - Low pollen counts and consistent climate
                </li>
                <li>
                  <span className="font-medium">Coastal areas</span> - Sea breezes help clear allergens
                </li>
                <li>
                  <span className="font-medium">Avoid inland areas in spring</span> - High pollen seasons
                </li>
              </ol>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium">Arthritis & Joint Pain</h4>
              <ol className="ml-6 list-decimal text-sm text-muted-foreground space-y-1">
                <li>
                  <span className="font-medium">Andalusia</span> - Warm, dry climate beneficial for joint pain
                </li>
                <li>
                  <span className="font-medium">Canary Islands</span> - Consistent warm temperatures
                </li>
                <li>
                  <span className="font-medium">Costa del Sol</span> - Sunny climate with minimal rainfall
                </li>
              </ol>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
