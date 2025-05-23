import {
  Compass,
  Heart,
  MapPin,
  Phone,
  PlusCircle,
  Shield,
} from 'lucide-react';

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

export default function Home() {
  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
      <SimpleSpainMap />

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Travel Health Tips for Spain</CardTitle>
            <CardDescription>Stay healthy during your journey</CardDescription>
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
                  Plan activities around the siesta time (2-5pm), especially in
                  summer when temperatures peak.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <div className="rounded-full bg-teal-100 p-1">
                <Heart className="h-4 w-4 text-teal-600" />
              </div>
              <div className="grid gap-1">
                <p className="text-sm font-medium">European Health Insurance</p>
                <p className="text-xs text-muted-foreground">
                  EU citizens should carry their European Health Insurance Card
                  for access to public healthcare.
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
                src="https://encrypted-tbn3.gstatic.com/licensed-image?q=tbn:ANd9GcRl0OHNYbqZMNHggLniCRSdj9FgTHHr5mW9aU55ruIwKFZQmBeENwCz0itxzKZQuPSx9SFVJIAN3evHJgtz4OyLWBytSB0SafqtKZxw6A"
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
                <span className="text-xs font-medium text-green-600">Low</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs">Medical Facilities</span>
                <span className="text-xs font-medium text-green-600">Good</span>
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
  );
}
