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

// Health data by location and month
const healthData = {
  italy: {
    name: "Tuscany, Italy",
    data: [
      { month: 0, humidity: 70, airQuality: 85, allergens: 30, temperature: 8 }, // Jan
      { month: 1, humidity: 65, airQuality: 85, allergens: 40, temperature: 10 }, // Feb
      { month: 2, humidity: 60, airQuality: 80, allergens: 60, temperature: 13 }, // Mar
      { month: 3, humidity: 55, airQuality: 90, allergens: 70, temperature: 16 }, // Apr
      { month: 4, humidity: 50, airQuality: 95, allergens: 75, temperature: 20 }, // May
      { month: 5, humidity: 45, airQuality: 90, allergens: 65, temperature: 24 }, // Jun
      { month: 6, humidity: 40, airQuality: 85, allergens: 50, temperature: 27 }, // Jul
      { month: 7, humidity: 40, airQuality: 80, allergens: 40, temperature: 27 }, // Aug
      { month: 8, humidity: 50, airQuality: 90, allergens: 45, temperature: 23 }, // Sep
      { month: 9, humidity: 60, airQuality: 95, allergens: 40, temperature: 18 }, // Oct
      { month: 10, humidity: 65, airQuality: 90, allergens: 30, temperature: 13 }, // Nov
      { month: 11, humidity: 70, airQuality: 85, allergens: 25, temperature: 9 }, // Dec
    ],
    position: { left: "45%", top: "42%" },
    description:
      "Tuscany has a Mediterranean climate with hot, dry summers and mild, wet winters. Spring and fall offer the best conditions for respiratory health.",
  },
  spain: {
    name: "Canary Islands, Spain",
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
    position: { left: "25%", top: "40%" },
    description:
      "The Canary Islands enjoy a year-round spring-like climate with minimal temperature fluctuations. The steady climate is beneficial for many health conditions.",
  },
  switzerland: {
    name: "Swiss Alps (Lower Elevations)",
    data: [
      { month: 0, humidity: 75, airQuality: 95, allergens: 10, temperature: -2 }, // Jan
      { month: 1, humidity: 70, airQuality: 95, allergens: 15, temperature: 0 }, // Feb
      { month: 2, humidity: 65, airQuality: 90, allergens: 30, temperature: 4 }, // Mar
      { month: 3, humidity: 60, airQuality: 90, allergens: 60, temperature: 8 }, // Apr
      { month: 4, humidity: 60, airQuality: 95, allergens: 75, temperature: 13 }, // May
      { month: 5, humidity: 60, airQuality: 100, allergens: 65, temperature: 16 }, // Jun
      { month: 6, humidity: 55, airQuality: 100, allergens: 50, temperature: 18 }, // Jul
      { month: 7, humidity: 60, airQuality: 95, allergens: 40, temperature: 18 }, // Aug
      { month: 8, humidity: 65, airQuality: 100, allergens: 35, temperature: 14 }, // Sep
      { month: 9, humidity: 70, airQuality: 100, allergens: 25, temperature: 9 }, // Oct
      { month: 10, humidity: 75, airQuality: 95, allergens: 15, temperature: 3 }, // Nov
      { month: 11, humidity: 75, airQuality: 95, allergens: 10, temperature: -1 }, // Dec
    ],
    position: { left: "42%", top: "32%" },
    description:
      "Lower elevations in the Swiss Alps offer clean mountain air but can be cold in winter. Summer and early fall provide ideal conditions for respiratory health.",
  },
  greece: {
    name: "Greek Islands",
    data: [
      { month: 0, humidity: 70, airQuality: 85, allergens: 20, temperature: 12 }, // Jan
      { month: 1, humidity: 70, airQuality: 85, allergens: 25, temperature: 13 }, // Feb
      { month: 2, humidity: 65, airQuality: 80, allergens: 45, temperature: 15 }, // Mar
      { month: 3, humidity: 65, airQuality: 85, allergens: 65, temperature: 18 }, // Apr
      { month: 4, humidity: 60, airQuality: 85, allergens: 70, temperature: 22 }, // May
      { month: 5, humidity: 55, airQuality: 80, allergens: 55, temperature: 26 }, // Jun
      { month: 6, humidity: 50, airQuality: 75, allergens: 40, temperature: 28 }, // Jul
      { month: 7, humidity: 55, airQuality: 75, allergens: 30, temperature: 28 }, // Aug
      { month: 8, humidity: 60, airQuality: 80, allergens: 35, temperature: 25 }, // Sep
      { month: 9, humidity: 65, airQuality: 85, allergens: 30, temperature: 21 }, // Oct
      { month: 10, humidity: 70, airQuality: 85, allergens: 25, temperature: 17 }, // Nov
      { month: 11, humidity: 75, airQuality: 85, allergens: 20, temperature: 14 }, // Dec
    ],
    position: { left: "55%", top: "48%" },
    description:
      "The Greek Islands have a Mediterranean climate with hot, dry summers and mild winters. Spring and fall offer moderate temperatures ideal for most health conditions.",
  },
  uk: {
    name: "United Kingdom",
    data: [
      { month: 0, humidity: 85, airQuality: 70, allergens: 15, temperature: 4 }, // Jan
      { month: 1, humidity: 80, airQuality: 75, allergens: 20, temperature: 5 }, // Feb
      { month: 2, humidity: 75, airQuality: 75, allergens: 40, temperature: 7 }, // Mar
      { month: 3, humidity: 70, airQuality: 80, allergens: 65, temperature: 9 }, // Apr
      { month: 4, humidity: 70, airQuality: 80, allergens: 80, temperature: 13 }, // May
      { month: 5, humidity: 70, airQuality: 75, allergens: 75, temperature: 16 }, // Jun
      { month: 6, humidity: 70, airQuality: 75, allergens: 65, temperature: 18 }, // Jul
      { month: 7, humidity: 75, airQuality: 75, allergens: 55, temperature: 18 }, // Aug
      { month: 8, humidity: 75, airQuality: 80, allergens: 45, temperature: 15 }, // Sep
      { month: 9, humidity: 80, airQuality: 75, allergens: 30, temperature: 11 }, // Oct
      { month: 10, humidity: 85, airQuality: 70, allergens: 20, temperature: 7 }, // Nov
      { month: 11, humidity: 85, airQuality: 70, allergens: 15, temperature: 5 }, // Dec
    ],
    position: { left: "35%", top: "25%" },
    description:
      "The UK has high humidity year-round with mild temperatures. This climate can be challenging for those with respiratory conditions sensitive to humidity.",
  },
  arizona: {
    name: "Arizona, USA",
    data: [
      { month: 0, humidity: 45, airQuality: 85, allergens: 20, temperature: 14 }, // Jan
      { month: 1, humidity: 40, airQuality: 85, allergens: 30, temperature: 16 }, // Feb
      { month: 2, humidity: 35, airQuality: 80, allergens: 50, temperature: 19 }, // Mar
      { month: 3, humidity: 25, airQuality: 80, allergens: 65, temperature: 24 }, // Apr
      { month: 4, humidity: 20, airQuality: 75, allergens: 60, temperature: 29 }, // May
      { month: 5, humidity: 15, airQuality: 70, allergens: 45, temperature: 34 }, // Jun
      { month: 6, humidity: 30, airQuality: 65, allergens: 30, temperature: 36 }, // Jul
      { month: 7, humidity: 35, airQuality: 65, allergens: 25, temperature: 35 }, // Aug
      { month: 8, humidity: 30, airQuality: 75, allergens: 30, temperature: 32 }, // Sep
      { month: 9, humidity: 30, airQuality: 85, allergens: 35, temperature: 26 }, // Oct
      { month: 10, humidity: 35, airQuality: 85, allergens: 25, temperature: 19 }, // Nov
      { month: 11, humidity: 40, airQuality: 85, allergens: 20, temperature: 14 }, // Dec
    ],
    position: { left: "15%", top: "35%" },
    description:
      "Arizona has a very dry desert climate with extremely hot summers and mild winters. The very low humidity is excellent for respiratory conditions, but extreme heat can be challenging.",
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

export function HealthRiskMap() {
  const [currentMonth, setCurrentMonth] = useState(0) // January
  const [activeTab, setActiveTab] = useState("humidity")
  const [isPlaying, setIsPlaying] = useState(false)
  const [region, setRegion] = useState("europe")
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
    const monthData = healthData[location].data[currentMonth]

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
    const monthData = healthData[location].data[currentMonth]
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
          <h2 className="text-2xl font-bold">Health Risk Map</h2>
          <p className="text-sm text-muted-foreground">Visualize how health factors change throughout the year</p>
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
                Europe -{" "}
                {condition === "respiratory"
                  ? "Respiratory"
                  : condition === "cardiovascular"
                    ? "Cardiovascular"
                    : "Allergy"}{" "}
                Health Map
              </CardTitle>
              <CardDescription>See how conditions change throughout the year</CardDescription>
            </div>
            <RadioGroup defaultValue="europe" className="flex" value={region} onValueChange={setRegion}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="europe" id="region-europe" />
                <Label htmlFor="region-europe">Europe</Label>
              </div>
              <div className="flex items-center space-x-2 ml-4">
                <RadioGroupItem value="north-america" id="region-north-america" />
                <Label htmlFor="region-north-america">North America</Label>
              </div>
            </RadioGroup>
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
                  alt="Europe Map"
                  className="h-full w-full object-cover opacity-50"
                />

                {/* Italy */}
                <HoverCard>
                  <HoverCardTrigger asChild>
                    <Button
                      variant="ghost"
                      className={`absolute left-[45%] top-[42%] h-8 w-8 rounded-full ${getLocationColor("italy")} p-0 text-white hover:opacity-90`}
                    >
                      <span className="sr-only">Italy</span>
                      <Info className="h-4 w-4" />
                    </Button>
                  </HoverCardTrigger>
                  <HoverCardContent className="w-80">
                    <div className="space-y-2">
                      <h4 className="text-sm font-semibold">{healthData.italy.name}</h4>
                      <div className="flex items-center justify-between text-sm">
                        <span>Humidity ({months[currentMonth]})</span>
                        <span
                          className={`font-medium ${getLocationValue("italy", "humidity") <= 40 ? "text-green-600" : getLocationValue("italy", "humidity") <= 60 ? "text-amber-600" : "text-red-600"}`}
                        >
                          {getLocationValue("italy", "humidity")}%
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground">{healthData.italy.description}</p>
                      <Button size="sm" className="w-full">
                        View Details
                      </Button>
                    </div>
                  </HoverCardContent>
                </HoverCard>

                {/* Spain */}
                <HoverCard>
                  <HoverCardTrigger asChild>
                    <Button
                      variant="ghost"
                      className={`absolute left-[25%] top-[40%] h-8 w-8 rounded-full ${getLocationColor("spain")} p-0 text-white hover:opacity-90`}
                    >
                      <span className="sr-only">Spain</span>
                      <Info className="h-4 w-4" />
                    </Button>
                  </HoverCardTrigger>
                  <HoverCardContent className="w-80">
                    <div className="space-y-2">
                      <h4 className="text-sm font-semibold">{healthData.spain.name}</h4>
                      <div className="flex items-center justify-between text-sm">
                        <span>Humidity ({months[currentMonth]})</span>
                        <span
                          className={`font-medium ${getLocationValue("spain", "humidity") <= 40 ? "text-green-600" : getLocationValue("spain", "humidity") <= 60 ? "text-amber-600" : "text-red-600"}`}
                        >
                          {getLocationValue("spain", "humidity")}%
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground">{healthData.spain.description}</p>
                      <Button size="sm" className="w-full">
                        View Details
                      </Button>
                    </div>
                  </HoverCardContent>
                </HoverCard>

                {/* Switzerland */}
                <HoverCard>
                  <HoverCardTrigger asChild>
                    <Button
                      variant="ghost"
                      className={`absolute left-[42%] top-[32%] h-8 w-8 rounded-full ${getLocationColor("switzerland")} p-0 text-white hover:opacity-90`}
                    >
                      <span className="sr-only">Switzerland</span>
                      <Info className="h-4 w-4" />
                    </Button>
                  </HoverCardTrigger>
                  <HoverCardContent className="w-80">
                    <div className="space-y-2">
                      <h4 className="text-sm font-semibold">{healthData.switzerland.name}</h4>
                      <div className="flex items-center justify-between text-sm">
                        <span>Humidity ({months[currentMonth]})</span>
                        <span
                          className={`font-medium ${getLocationValue("switzerland", "humidity") <= 40 ? "text-green-600" : getLocationValue("switzerland", "humidity") <= 60 ? "text-amber-600" : "text-red-600"}`}
                        >
                          {getLocationValue("switzerland", "humidity")}%
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground">{healthData.switzerland.description}</p>
                      <Button size="sm" className="w-full">
                        View Details
                      </Button>
                    </div>
                  </HoverCardContent>
                </HoverCard>

                {/* Greece */}
                <HoverCard>
                  <HoverCardTrigger asChild>
                    <Button
                      variant="ghost"
                      className={`absolute left-[55%] top-[48%] h-8 w-8 rounded-full ${getLocationColor("greece")} p-0 text-white hover:opacity-90`}
                    >
                      <span className="sr-only">Greece</span>
                      <Info className="h-4 w-4" />
                    </Button>
                  </HoverCardTrigger>
                  <HoverCardContent className="w-80">
                    <div className="space-y-2">
                      <h4 className="text-sm font-semibold">{healthData.greece.name}</h4>
                      <div className="flex items-center justify-between text-sm">
                        <span>Humidity ({months[currentMonth]})</span>
                        <span
                          className={`font-medium ${getLocationValue("greece", "humidity") <= 40 ? "text-green-600" : getLocationValue("greece", "humidity") <= 60 ? "text-amber-600" : "text-red-600"}`}
                        >
                          {getLocationValue("greece", "humidity")}%
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground">{healthData.greece.description}</p>
                      <Button size="sm" className="w-full">
                        View Details
                      </Button>
                    </div>
                  </HoverCardContent>
                </HoverCard>

                {/* UK */}
                <HoverCard>
                  <HoverCardTrigger asChild>
                    <Button
                      variant="ghost"
                      className={`absolute left-[35%] top-[25%] h-8 w-8 rounded-full ${getLocationColor("uk")} p-0 text-white hover:opacity-90`}
                    >
                      <span className="sr-only">United Kingdom</span>
                      <Info className="h-4 w-4" />
                    </Button>
                  </HoverCardTrigger>
                  <HoverCardContent className="w-80">
                    <div className="space-y-2">
                      <h4 className="text-sm font-semibold">{healthData.uk.name}</h4>
                      <div className="flex items-center justify-between text-sm">
                        <span>Humidity ({months[currentMonth]})</span>
                        <span
                          className={`font-medium ${getLocationValue("uk", "humidity") <= 40 ? "text-green-600" : getLocationValue("uk", "humidity") <= 60 ? "text-amber-600" : "text-red-600"}`}
                        >
                          {getLocationValue("uk", "humidity")}%
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground">{healthData.uk.description}</p>
                      <Button size="sm" className="w-full">
                        View Details
                      </Button>
                    </div>
                  </HoverCardContent>
                </HoverCard>

                {/* Arizona (only shown when North America is selected) */}
                {region === "north-america" && (
                  <HoverCard>
                    <HoverCardTrigger asChild>
                      <Button
                        variant="ghost"
                        className={`absolute left-[15%] top-[35%] h-8 w-8 rounded-full ${getLocationColor("arizona")} p-0 text-white hover:opacity-90`}
                      >
                        <span className="sr-only">Arizona</span>
                        <Info className="h-4 w-4" />
                      </Button>
                    </HoverCardTrigger>
                    <HoverCardContent className="w-80">
                      <div className="space-y-2">
                        <h4 className="text-sm font-semibold">{healthData.arizona.name}</h4>
                        <div className="flex items-center justify-between text-sm">
                          <span>Humidity ({months[currentMonth]})</span>
                          <span
                            className={`font-medium ${getLocationValue("arizona", "humidity") <= 40 ? "text-green-600" : getLocationValue("arizona", "humidity") <= 60 ? "text-amber-600" : "text-red-600"}`}
                          >
                            {getLocationValue("arizona", "humidity")}%
                          </span>
                        </div>
                        <p className="text-xs text-muted-foreground">{healthData.arizona.description}</p>
                        <Button size="sm" className="w-full">
                          View Details
                        </Button>
                      </div>
                    </HoverCardContent>
                  </HoverCard>
                )}

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
                  alt="Europe Air Quality Map"
                  className="h-full w-full object-cover opacity-50"
                />

                {/* Similar hover cards for locations, but showing air quality data */}
                {/* Italy */}
                <HoverCard>
                  <HoverCardTrigger asChild>
                    <Button
                      variant="ghost"
                      className={`absolute left-[45%] top-[42%] h-8 w-8 rounded-full ${getLocationColor("italy")} p-0 text-white hover:opacity-90`}
                    >
                      <span className="sr-only">Italy</span>
                      <Info className="h-4 w-4" />
                    </Button>
                  </HoverCardTrigger>
                  <HoverCardContent className="w-80">
                    <div className="space-y-2">
                      <h4 className="text-sm font-semibold">{healthData.italy.name}</h4>
                      <div className="flex items-center justify-between text-sm">
                        <span>Air Quality ({months[currentMonth]})</span>
                        <span
                          className={`font-medium ${getLocationValue("italy", "airQuality") >= 85 ? "text-green-600" : getLocationValue("italy", "airQuality") >= 70 ? "text-amber-600" : "text-red-600"}`}
                        >
                          {getValueLabel("airQuality", getLocationValue("italy", "airQuality"))}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground">{healthData.italy.description}</p>
                      <Button size="sm" className="w-full">
                        View Details
                      </Button>
                    </div>
                  </HoverCardContent>
                </HoverCard>

                {/* Other locations would be similar */}

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
                  alt="Europe Allergens Map"
                  className="h-full w-full object-cover opacity-50"
                />

                {/* Similar hover cards for locations, but showing allergen data */}
                {/* Italy */}
                <HoverCard>
                  <HoverCardTrigger asChild>
                    <Button
                      variant="ghost"
                      className={`absolute left-[45%] top-[42%] h-8 w-8 rounded-full ${getLocationColor("italy")} p-0 text-white hover:opacity-90`}
                    >
                      <span className="sr-only">Italy</span>
                      <Info className="h-4 w-4" />
                    </Button>
                  </HoverCardTrigger>
                  <HoverCardContent className="w-80">
                    <div className="space-y-2">
                      <h4 className="text-sm font-semibold">{healthData.italy.name}</h4>
                      <div className="flex items-center justify-between text-sm">
                        <span>Allergen Level ({months[currentMonth]})</span>
                        <span
                          className={`font-medium ${getLocationValue("italy", "allergens") <= 30 ? "text-green-600" : getLocationValue("italy", "allergens") <= 60 ? "text-amber-600" : "text-red-600"}`}
                        >
                          {getValueLabel("allergens", getLocationValue("italy", "allergens"))}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground">{healthData.italy.description}</p>
                      <Button size="sm" className="w-full">
                        View Details
                      </Button>
                    </div>
                  </HoverCardContent>
                </HoverCard>

                {/* Other locations would be similar */}

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
                  alt="Europe Temperature Map"
                  className="h-full w-full object-cover opacity-50"
                />

                {/* Similar hover cards for locations, but showing temperature data */}
                {/* Italy */}
                <HoverCard>
                  <HoverCardTrigger asChild>
                    <Button
                      variant="ghost"
                      className={`absolute left-[45%] top-[42%] h-8 w-8 rounded-full ${getLocationColor("italy")} p-0 text-white hover:opacity-90`}
                    >
                      <span className="sr-only">Italy</span>
                      <Info className="h-4 w-4" />
                    </Button>
                  </HoverCardTrigger>
                  <HoverCardContent className="w-80">
                    <div className="space-y-2">
                      <h4 className="text-sm font-semibold">{healthData.italy.name}</h4>
                      <div className="flex items-center justify-between text-sm">
                        <span>Temperature ({months[currentMonth]})</span>
                        <span
                          className={`font-medium ${
                            getLocationValue("italy", "temperature") >= 15 &&
                            getLocationValue("italy", "temperature") <= 25
                              ? "text-green-600"
                              : (getLocationValue("italy", "temperature") >= 10 &&
                                    getLocationValue("italy", "temperature") < 15) ||
                                  (getLocationValue("italy", "temperature") > 25 &&
                                    getLocationValue("italy", "temperature") <= 30)
                                ? "text-amber-600"
                                : "text-red-600"
                          }`}
                        >
                          {getLocationValue("italy", "temperature")}°C
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground">{healthData.italy.description}</p>
                      <Button size="sm" className="w-full">
                        View Details
                      </Button>
                    </div>
                  </HoverCardContent>
                </HoverCard>

                {/* Other locations would be similar */}

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
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {Object.keys(healthData)
              .filter(
                (location) =>
                  (region === "europe" && location !== "arizona") ||
                  (region === "north-america" && location === "arizona"),
              )
              .map((location) => (
                <Card key={location} className="overflow-hidden">
                  <CardHeader className="p-4">
                    <CardTitle className="text-sm">{healthData[location].name}</CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div className="flex flex-col">
                        <span className="text-muted-foreground">Humidity</span>
                        <span
                          className={`font-medium ${getLocationValue(location, "humidity") <= 40 ? "text-green-600" : getLocationValue(location, "humidity") <= 60 ? "text-amber-600" : "text-red-600"}`}
                        >
                          {getLocationValue(location, "humidity")}%
                        </span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-muted-foreground">Air Quality</span>
                        <span
                          className={`font-medium ${getLocationValue(location, "airQuality") >= 85 ? "text-green-600" : getLocationValue(location, "airQuality") >= 70 ? "text-amber-600" : "text-red-600"}`}
                        >
                          {getValueLabel("airQuality", getLocationValue(location, "airQuality"))}
                        </span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-muted-foreground">Allergens</span>
                        <span
                          className={`font-medium ${getLocationValue(location, "allergens") <= 30 ? "text-green-600" : getLocationValue(location, "allergens") <= 60 ? "text-amber-600" : "text-red-600"}`}
                        >
                          {getValueLabel("allergens", getLocationValue(location, "allergens"))}
                        </span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-muted-foreground">Temperature</span>
                        <span
                          className={`font-medium ${
                            getLocationValue(location, "temperature") >= 15 &&
                            getLocationValue(location, "temperature") <= 25
                              ? "text-green-600"
                              : (getLocationValue(location, "temperature") >= 10 &&
                                    getLocationValue(location, "temperature") < 15) ||
                                  (getLocationValue(location, "temperature") > 25 &&
                                    getLocationValue(location, "temperature") <= 30)
                                ? "text-amber-600"
                                : "text-red-600"
                          }`}
                        >
                          {getLocationValue(location, "temperature")}°C
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
            <CardTitle>Seasonal Health Recommendations</CardTitle>
            <CardDescription>Best times to visit based on your health condition</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <h4 className="font-medium">Tuscany, Italy</h4>
              <div className="grid grid-cols-4 gap-1 text-xs">
                <div
                  className={`rounded-md p-1 text-center ${currentMonth >= 2 && currentMonth <= 4 ? "bg-green-100 text-green-800 font-medium" : ""}`}
                >
                  Spring
                </div>
                <div
                  className={`rounded-md p-1 text-center ${currentMonth >= 5 && currentMonth <= 7 ? "bg-amber-100 text-amber-800 font-medium" : ""}`}
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
                Best in spring and fall when humidity is low and temperatures are mild. Summer can be hot but dry.
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium">Canary Islands, Spain</h4>
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
              <h4 className="font-medium">Swiss Alps (Lower Elevations)</h4>
              <div className="grid grid-cols-4 gap-1 text-xs">
                <div
                  className={`rounded-md p-1 text-center ${currentMonth >= 2 && currentMonth <= 4 ? "bg-amber-100 text-amber-800 font-medium" : ""}`}
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
                  className={`rounded-md p-1 text-center ${currentMonth >= 11 || currentMonth <= 1 ? "bg-red-100 text-red-800 font-medium" : ""}`}
                >
                  Winter
                </div>
              </div>
              <p className="text-xs text-muted-foreground">
                Best in summer and early fall. Winter is cold and can exacerbate respiratory conditions.
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium">Arizona, USA</h4>
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
                  className={`rounded-md p-1 text-center ${currentMonth >= 11 || currentMonth <= 1 ? "bg-green-100 text-green-800 font-medium" : ""}`}
                >
                  Winter
                </div>
              </div>
              <p className="text-xs text-muted-foreground">
                Ideal in winter, spring, and fall. Summer is extremely hot and can be dangerous for respiratory
                patients.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Monthly Health Factor Trends</CardTitle>
            <CardDescription>How {getFactorName(activeTab)} changes throughout the year</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="aspect-[4/3] rounded-md border bg-muted/20 p-4">
              <div className="h-full w-full">
                {/* This would be a chart showing the selected factor across months */}
                <div className="flex h-full flex-col">
                  <div className="flex-1 space-y-2">
                    {/* Chart would go here - simplified representation */}
                    <div className="flex h-full items-end gap-1">
                      {months.map((month, index) => {
                        // Get values for all locations for this month and factor
                        const italyValue =
                          healthData.italy.data[index][
                            activeTab === "humidity"
                              ? "humidity"
                              : activeTab === "air-quality"
                                ? "airQuality"
                                : activeTab === "allergens"
                                  ? "allergens"
                                  : "temperature"
                          ]
                        const spainValue =
                          healthData.spain.data[index][
                            activeTab === "humidity"
                              ? "humidity"
                              : activeTab === "air-quality"
                                ? "airQuality"
                                : activeTab === "allergens"
                                  ? "allergens"
                                  : "temperature"
                          ]

                        // Normalize values for display (0-100%)
                        let italyHeight, spainHeight

                        if (activeTab === "humidity") {
                          italyHeight = italyValue // Already 0-100
                          spainHeight = spainValue
                        } else if (activeTab === "air-quality") {
                          italyHeight = italyValue // Already 0-100
                          spainHeight = spainValue
                        } else if (activeTab === "allergens") {
                          italyHeight = italyValue // Already 0-100
                          spainHeight = spainValue
                        } else if (activeTab === "temperature") {
                          // Normalize temperature from -10 to 40 range to 0-100
                          italyHeight = ((italyValue + 10) / 50) * 100
                          spainHeight = ((spainValue + 10) / 50) * 100
                        }

                        return (
                          <div key={month} className="flex flex-1 flex-col items-center gap-1">
                            <div className="relative h-full w-full">
                              <div
                                className={`absolute bottom-0 left-0 w-1/3 ${
                                  activeTab === "humidity"
                                    ? italyValue <= 40
                                      ? "bg-green-500"
                                      : italyValue <= 60
                                        ? "bg-amber-500"
                                        : "bg-red-500"
                                    : activeTab === "air-quality"
                                      ? italyValue >= 85
                                        ? "bg-green-500"
                                        : italyValue >= 70
                                          ? "bg-amber-500"
                                          : "bg-red-500"
                                      : activeTab === "allergens"
                                        ? italyValue <= 30
                                          ? "bg-green-500"
                                          : italyValue <= 60
                                            ? "bg-amber-500"
                                            : "bg-red-500"
                                        : italyValue >= 15 && italyValue <= 25
                                          ? "bg-green-500"
                                          : (italyValue >= 10 && italyValue < 15) ||
                                              (italyValue > 25 && italyValue <= 30)
                                            ? "bg-amber-500"
                                            : "bg-red-500"
                                }`}
                                style={{ height: `${italyHeight}%` }}
                              ></div>
                              <div
                                className={`absolute bottom-0 left-1/3 w-1/3 ${
                                  activeTab === "humidity"
                                    ? spainValue <= 40
                                      ? "bg-green-500"
                                      : spainValue <= 60
                                        ? "bg-amber-500"
                                        : "bg-red-500"
                                    : activeTab === "air-quality"
                                      ? spainValue >= 85
                                        ? "bg-green-500"
                                        : spainValue >= 70
                                          ? "bg-amber-500"
                                          : "bg-red-500"
                                      : activeTab === "allergens"
                                        ? spainValue <= 30
                                          ? "bg-green-500"
                                          : spainValue <= 60
                                            ? "bg-amber-500"
                                            : "bg-red-500"
                                        : spainValue >= 15 && spainValue <= 25
                                          ? "bg-green-500"
                                          : (spainValue >= 10 && spainValue < 15) ||
                                              (spainValue > 25 && spainValue <= 30)
                                            ? "bg-amber-500"
                                            : "bg-red-500"
                                }`}
                                style={{ height: `${spainHeight}%` }}
                              ></div>
                              {/* Additional bars for other locations would go here */}
                            </div>
                            <span className={`text-[0.6rem] ${currentMonth === index ? "font-bold" : ""}`}>
                              {month.substring(0, 3)}
                            </span>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                  <div className="mt-4 flex items-center justify-center gap-4 text-xs">
                    <div className="flex items-center gap-1">
                      <div className="h-3 w-3 bg-green-500"></div>
                      <span>Tuscany</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="h-3 w-3 bg-amber-500"></div>
                      <span>Canary Islands</span>
                    </div>
                    {/* Legend items for other locations would go here */}
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
