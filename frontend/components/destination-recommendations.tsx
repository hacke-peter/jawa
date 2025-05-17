import { Filter, Heart, MapPin, ThumbsUp } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"

export function DestinationRecommendations() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Recommended Destinations</h2>
          <p className="text-sm text-muted-foreground">
            Based on your respiratory condition and environmental sensitivities
          </p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline">
              <Filter className="mr-2 h-4 w-4" /> Filter Results
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Filter Destinations</DialogTitle>
              <DialogDescription>Customize your search criteria</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label>Destination Type</Label>
                <RadioGroup defaultValue="all" className="flex flex-wrap gap-4">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="all" id="all" />
                    <Label htmlFor="all">All</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="beach" id="beach" />
                    <Label htmlFor="beach">Beach</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="mountain" id="mountain" />
                    <Label htmlFor="mountain">Mountain</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="city" id="city" />
                    <Label htmlFor="city">City</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="countryside" id="countryside" />
                    <Label htmlFor="countryside">Countryside</Label>
                  </div>
                </RadioGroup>
              </div>
              <div className="space-y-2">
                <Label>Region</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select region" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="europe">Europe</SelectItem>
                    <SelectItem value="north-america">North America</SelectItem>
                    <SelectItem value="south-america">South America</SelectItem>
                    <SelectItem value="asia">Asia</SelectItem>
                    <SelectItem value="oceania">Oceania</SelectItem>
                    <SelectItem value="africa">Africa</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Maximum Humidity (%)</Label>
                <div className="flex items-center gap-4">
                  <Slider defaultValue={[50]} max={100} step={5} className="flex-1" />
                  <span className="w-12 text-center text-sm">50%</span>
                </div>
              </div>
              <div className="space-y-2">
                <Label>Temperature Range (°C)</Label>
                <div className="flex items-center gap-4">
                  <Slider defaultValue={[15, 25]} min={-10} max={40} step={1} className="flex-1" />
                  <span className="w-20 text-center text-sm">15°C - 25°C</span>
                </div>
              </div>
              <div className="space-y-2">
                <Label>Maximum Altitude (m)</Label>
                <div className="flex items-center gap-4">
                  <Slider defaultValue={[1000]} max={3000} step={100} className="flex-1" />
                  <span className="w-16 text-center text-sm">1000m</span>
                </div>
              </div>
              <div className="space-y-2">
                <Label>Medical Facilities</Label>
                <Select defaultValue="good">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="excellent">Excellent</SelectItem>
                    <SelectItem value="good">Good</SelectItem>
                    <SelectItem value="basic">Basic</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Apply Filters</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Tuscany, Italy</CardTitle>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Heart className="h-4 w-4" />
                <span className="sr-only">Add to favorites</span>
              </Button>
            </div>
            <CardDescription>Ideal for respiratory conditions</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-3">
            <div className="aspect-video overflow-hidden rounded-md">
              <img src="/placeholder.svg?height=200&width=400" alt="Tuscany" className="h-full w-full object-cover" />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <ThumbsUp className="h-4 w-4 text-green-500" />
                  <span className="text-sm font-medium">Health Compatibility</span>
                </div>
                <span className="text-sm font-medium text-green-600">95%</span>
              </div>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="flex flex-col">
                  <span className="text-muted-foreground">Humidity</span>
                  <span className="font-medium text-green-600">Low (40-50%)</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-muted-foreground">Air Quality</span>
                  <span className="font-medium text-green-600">Excellent</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-muted-foreground">Allergens</span>
                  <span className="font-medium text-amber-600">Moderate</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-muted-foreground">Medical Care</span>
                  <span className="font-medium text-green-600">High Quality</span>
                </div>
              </div>
              <div className="mt-2 flex items-center gap-2 text-sm">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <span>Best time to visit: April-June, September-October</span>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" size="sm">
              View Details
            </Button>
            <Button size="sm">Save Destination</Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>San Diego, USA</CardTitle>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Heart className="h-4 w-4" />
                <span className="sr-only">Add to favorites</span>
              </Button>
            </div>
            <CardDescription>Great for respiratory health</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-3">
            <div className="aspect-video overflow-hidden rounded-md">
              <img src="/placeholder.svg?height=200&width=400" alt="San Diego" className="h-full w-full object-cover" />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <ThumbsUp className="h-4 w-4 text-green-500" />
                  <span className="text-sm font-medium">Health Compatibility</span>
                </div>
                <span className="text-sm font-medium text-green-600">92%</span>
              </div>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="flex flex-col">
                  <span className="text-muted-foreground">Humidity</span>
                  <span className="font-medium text-amber-600">Moderate (60-70%)</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-muted-foreground">Air Quality</span>
                  <span className="font-medium text-green-600">Good</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-muted-foreground">Allergens</span>
                  <span className="font-medium text-green-600">Low</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-muted-foreground">Medical Care</span>
                  <span className="font-medium text-green-600">Excellent</span>
                </div>
              </div>
              <div className="mt-2 flex items-center gap-2 text-sm">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <span>Best time to visit: Year-round</span>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" size="sm">
              View Details
            </Button>
            <Button size="sm">Save Destination</Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Canary Islands, Spain</CardTitle>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Heart className="h-4 w-4" />
                <span className="sr-only">Add to favorites</span>
              </Button>
            </div>
            <CardDescription>Excellent for respiratory health</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-3">
            <div className="aspect-video overflow-hidden rounded-md">
              <img
                src="/placeholder.svg?height=200&width=400"
                alt="Canary Islands"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <ThumbsUp className="h-4 w-4 text-green-500" />
                  <span className="text-sm font-medium">Health Compatibility</span>
                </div>
                <span className="text-sm font-medium text-green-600">90%</span>
              </div>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="flex flex-col">
                  <span className="text-muted-foreground">Humidity</span>
                  <span className="font-medium text-amber-600">Moderate (50-60%)</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-muted-foreground">Air Quality</span>
                  <span className="font-medium text-green-600">Excellent</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-muted-foreground">Allergens</span>
                  <span className="font-medium text-green-600">Low</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-muted-foreground">Medical Care</span>
                  <span className="font-medium text-green-600">Good</span>
                </div>
              </div>
              <div className="mt-2 flex items-center gap-2 text-sm">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <span>Best time to visit: Year-round</span>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" size="sm">
              View Details
            </Button>
            <Button size="sm">Save Destination</Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Arizona, USA</CardTitle>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Heart className="h-4 w-4" />
                <span className="sr-only">Add to favorites</span>
              </Button>
            </div>
            <CardDescription>Dry climate ideal for respiratory issues</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-3">
            <div className="aspect-video overflow-hidden rounded-md">
              <img src="/placeholder.svg?height=200&width=400" alt="Arizona" className="h-full w-full object-cover" />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <ThumbsUp className="h-4 w-4 text-green-500" />
                  <span className="text-sm font-medium">Health Compatibility</span>
                </div>
                <span className="text-sm font-medium text-green-600">88%</span>
              </div>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="flex flex-col">
                  <span className="text-muted-foreground">Humidity</span>
                  <span className="font-medium text-green-600">Very Low (20-30%)</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-muted-foreground">Air Quality</span>
                  <span className="font-medium text-green-600">Good</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-muted-foreground">Allergens</span>
                  <span className="font-medium text-amber-600">Moderate</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-muted-foreground">Medical Care</span>
                  <span className="font-medium text-green-600">Excellent</span>
                </div>
              </div>
              <div className="mt-2 flex items-center gap-2 text-sm">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <span>Best time to visit: October-April</span>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" size="sm">
              View Details
            </Button>
            <Button size="sm">Save Destination</Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Swiss Alps (Lower Elevations)</CardTitle>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Heart className="h-4 w-4" />
                <span className="sr-only">Add to favorites</span>
              </Button>
            </div>
            <CardDescription>Clean air, moderate altitude</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-3">
            <div className="aspect-video overflow-hidden rounded-md">
              <img
                src="/placeholder.svg?height=200&width=400"
                alt="Swiss Alps"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <ThumbsUp className="h-4 w-4 text-green-500" />
                  <span className="text-sm font-medium">Health Compatibility</span>
                </div>
                <span className="text-sm font-medium text-amber-600">85%</span>
              </div>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="flex flex-col">
                  <span className="text-muted-foreground">Humidity</span>
                  <span className="font-medium text-amber-600">Moderate (50-60%)</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-muted-foreground">Air Quality</span>
                  <span className="font-medium text-green-600">Excellent</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-muted-foreground">Allergens</span>
                  <span className="font-medium text-green-600">Low</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-muted-foreground">Medical Care</span>
                  <span className="font-medium text-green-600">Excellent</span>
                </div>
              </div>
              <div className="mt-2 flex items-center gap-2 text-sm">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <span>Best time to visit: May-September</span>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" size="sm">
              View Details
            </Button>
            <Button size="sm">Save Destination</Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Greek Islands</CardTitle>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Heart className="h-4 w-4" />
                <span className="sr-only">Add to favorites</span>
              </Button>
            </div>
            <CardDescription>Mediterranean climate benefits</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-3">
            <div className="aspect-video overflow-hidden rounded-md">
              <img
                src="/placeholder.svg?height=200&width=400"
                alt="Greek Islands"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <ThumbsUp className="h-4 w-4 text-green-500" />
                  <span className="text-sm font-medium">Health Compatibility</span>
                </div>
                <span className="text-sm font-medium text-amber-600">82%</span>
              </div>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="flex flex-col">
                  <span className="text-muted-foreground">Humidity</span>
                  <span className="font-medium text-amber-600">Moderate (60-70%)</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-muted-foreground">Air Quality</span>
                  <span className="font-medium text-green-600">Good</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-muted-foreground">Allergens</span>
                  <span className="font-medium text-amber-600">Moderate</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-muted-foreground">Medical Care</span>
                  <span className="font-medium text-amber-600">Varies by island</span>
                </div>
              </div>
              <div className="mt-2 flex items-center gap-2 text-sm">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <span>Best time to visit: May-June, September-October</span>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" size="sm">
              View Details
            </Button>
            <Button size="sm">Save Destination</Button>
          </CardFooter>
        </Card>
      </div>

      <div className="flex justify-center">
        <Button variant="outline">Load More Destinations</Button>
      </div>
    </div>
  )
}
