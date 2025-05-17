import { AlertCircle, MapPin, Plus, Shield } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

export function DestinationHealth() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Paris, France</CardTitle>
            <div className="rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-800">
              Low Risk
            </div>
          </div>
          <CardDescription>June 15-22, 2023</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-3">
          <div className="aspect-video overflow-hidden rounded-md">
            <img
              src="/placeholder.svg?height=200&width=400"
              alt="Paris"
              className="h-full w-full object-cover"
            />
          </div>
          <div className="grid gap-2">
            <div className="flex items-start gap-2">
              <AlertCircle className="mt-0.5 h-4 w-4 text-amber-500" />
              <div>
                <p className="text-sm font-medium">Health Advisory</p>
                <p className="text-xs text-muted-foreground">
                  No significant health risks. Standard precautions advised.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <Shield className="mt-0.5 h-4 w-4 text-teal-500" />
              <div>
                <p className="text-sm font-medium">Recommended Vaccinations</p>
                <p className="text-xs text-muted-foreground">
                  Routine vaccines up to date. No additional vaccines required.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <MapPin className="mt-0.5 h-4 w-4 text-red-500" />
              <div>
                <p className="text-sm font-medium">Emergency Services</p>
                <p className="text-xs text-muted-foreground">
                  Emergency: 112, Police: 17, Ambulance: 15
                </p>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button variant="outline" size="sm" className="w-full">
            View Details
          </Button>
        </CardFooter>
      </Card>
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Tokyo, Japan</CardTitle>
            <div className="rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-800">
              Low Risk
            </div>
          </div>
          <CardDescription>August 10-20, 2023</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-3">
          <div className="aspect-video overflow-hidden rounded-md">
            <img
              src="/placeholder.svg?height=200&width=400"
              alt="Tokyo"
              className="h-full w-full object-cover"
            />
          </div>
          <div className="grid gap-2">
            <div className="flex items-start gap-2">
              <AlertCircle className="mt-0.5 h-4 w-4 text-amber-500" />
              <div>
                <p className="text-sm font-medium">Health Advisory</p>
                <p className="text-xs text-muted-foreground">
                  No significant health risks. Be aware of summer heat.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <Shield className="mt-0.5 h-4 w-4 text-teal-500" />
              <div>
                <p className="text-sm font-medium">Recommended Vaccinations</p>
                <p className="text-xs text-muted-foreground">
                  Routine vaccines up to date. Consider Japanese Encephalitis
                  for rural areas.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <MapPin className="mt-0.5 h-4 w-4 text-red-500" />
              <div>
                <p className="text-sm font-medium">Emergency Services</p>
                <p className="text-xs text-muted-foreground">
                  Emergency: 119, Police: 110
                </p>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button variant="outline" size="sm" className="w-full">
            View Details
          </Button>
        </CardFooter>
      </Card>
      <Dialog>
        <DialogTrigger asChild>
          <Card className="flex h-full cursor-pointer flex-col items-center justify-center p-6 text-muted-foreground hover:border-teal-500 hover:text-teal-500">
            <Plus className="mb-2 h-6 w-6" />
            <p className="text-sm">Add Destination</p>
          </Card>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Destination</DialogTitle>
            <DialogDescription>
              Enter details about your upcoming trip to receive health
              information.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="destination">Destination</Label>
                <Input id="destination" placeholder="City, Country" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="dates">Travel Dates</Label>
                <div className="flex gap-2">
                  <Input id="start-date" type="date" className="flex-1" />
                  <Input id="end-date" type="date" className="flex-1" />
                </div>
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="purpose">Purpose of Travel</Label>
              <Input id="purpose" placeholder="e.g., Tourism, Business" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="activities">Planned Activities</Label>
              <Textarea
                id="activities"
                placeholder="e.g., Hiking, Swimming, Urban exploration"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="accommodations">Accommodations</Label>
              <Input
                id="accommodations"
                placeholder="e.g., Hotel, Hostel, Airbnb"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Save Destination</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
