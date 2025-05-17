import {
  Compass,
  Heart,
  MapPin,
  Phone,
  PlusCircle,
  Shield,
} from 'lucide-react';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { SimpleSpainMap } from '@/components/simple-spain-map';
import MapChart from '@/components/map';

export default function Home() {
  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
        <Link href="#" className="flex items-center gap-2 font-semibold">
          <Heart className="h-6 w-6 text-teal-500" />
          <span>HealthyTravel</span>
        </Link>
        <nav className="ml-auto flex gap-2">
          <Button variant="ghost" size="sm">
            Dashboard
          </Button>
          <Button variant="ghost" size="sm">
            Health Profile
          </Button>
          <Button variant="ghost" size="sm">
            Destinations
          </Button>
          <Button variant="ghost" size="sm">
            Resources
          </Button>
        </nav>
      </header>
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold tracking-tight">
            Spain Health Travel Map
          </h1>
          <p className="text-muted-foreground">
            Explore health conditions across Spain to find the perfect
            destination for your needs
          </p>
        </div>
        <MapChart />
        <SimpleSpainMap />

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle>Travel Health Tips for Spain</CardTitle>
              <CardDescription>
                Stay healthy during your journey
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-2">
              <div className="flex items-start gap-2">
                <div className="rounded-full bg-teal-100 p-1">
                  <Heart className="h-4 w-4 text-teal-600" />
                </div>
                <div className="grid gap-1">
                  <p className="text-sm font-medium">
                    Regional Climate Variations
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Spain has diverse climates - from the humid north to the dry
                    south and the consistent Canary Islands.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <div className="rounded-full bg-teal-100 p-1">
                  <Heart className="h-4 w-4 text-teal-600" />
                </div>
                <div className="grid gap-1">
                  <p className="text-sm font-medium">Siesta Considerations</p>
                  <p className="text-xs text-muted-foreground">
                    Plan activities around the siesta time (2-5pm), especially
                    in summer when temperatures peak.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <div className="rounded-full bg-teal-100 p-1">
                  <Heart className="h-4 w-4 text-teal-600" />
                </div>
                <div className="grid gap-1">
                  <p className="text-sm font-medium">
                    European Health Insurance
                  </p>
                  <p className="text-xs text-muted-foreground">
                    EU citizens should carry their European Health Insurance
                    Card for access to public healthcare.
                  </p>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="ghost" size="sm" className="w-full">
                View All Tips
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Featured Destination</CardTitle>
              <CardDescription>
                Canary Islands - Ideal for respiratory conditions
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-2">
              <div className="aspect-video overflow-hidden rounded-md">
                <img
                  src="/placeholder.svg?height=200&width=400"
                  alt="Canary Islands"
                  className="h-full w-full object-cover"
                />
              </div>
              <h3 className="text-lg font-semibold">Canary Islands, Spain</h3>
              <div className="flex items-center gap-2 text-sm">
                <MapPin className="h-4 w-4 text-teal-500" />
                <span>Atlantic Ocean, off northwest Africa</span>
              </div>
              <div className="mt-2 grid gap-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs">Humidity</span>
                  <span className="text-xs font-medium text-amber-600">
                    Moderate (55-65%)
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs">Air Quality</span>
                  <span className="text-xs font-medium text-green-600">
                    Excellent
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs">Allergen Level</span>
                  <span className="text-xs font-medium text-green-600">
                    Low
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs">Medical Facilities</span>
                  <span className="text-xs font-medium text-green-600">
                    Good
                  </span>
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
              <CardTitle>Spanish Healthcare Information</CardTitle>
              <CardDescription>Important medical resources</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-2">
              <div className="flex items-center justify-between rounded-md border p-2">
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-teal-500" />
                  <span className="text-sm">Emergency Number</span>
                </div>
                <span className="text-sm font-medium">112</span>
              </div>
              <div className="flex items-center justify-between rounded-md border p-2">
                <div className="flex items-center gap-2">
                  <Shield className="h-4 w-4 text-teal-500" />
                  <span className="text-sm">Healthcare System</span>
                </div>
                <span className="text-sm font-medium">Public & Private</span>
              </div>
              <div className="flex items-center justify-between rounded-md border p-2">
                <div className="flex items-center gap-2">
                  <Compass className="h-4 w-4 text-teal-500" />
                  <span className="text-sm">Pharmacy Identifier</span>
                </div>
                <span className="text-sm font-medium">Green Cross</span>
              </div>
              <div className="flex items-center justify-between rounded-md border p-2">
                <div className="flex items-center gap-2">
                  <PlusCircle className="h-4 w-4 text-teal-500" />
                  <span className="text-sm">English-Speaking Doctors</span>
                </div>
                <span className="text-sm font-medium">
                  Major Cities & Tourist Areas
                </span>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" size="sm" className="w-full">
                Download Health Guide
              </Button>
            </CardFooter>
          </Card>
        </div>
      </main>
    </div>
  );
}
