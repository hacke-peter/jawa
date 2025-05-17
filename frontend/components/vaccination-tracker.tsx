import { Clock, Plus, Shield } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"

export function VaccinationTracker() {
  return (
    <div className="grid gap-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-medium">Vaccination Status</h3>
          <p className="text-sm text-muted-foreground">Track your travel vaccinations</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" /> Add Vaccination
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Vaccination Record</DialogTitle>
              <DialogDescription>Enter details about your vaccination.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="vaccine-name">Vaccine Name</Label>
                <Input id="vaccine-name" placeholder="e.g., Hepatitis A, Yellow Fever" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="date-received">Date Received</Label>
                  <Input id="date-received" type="date" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="expiration">Expiration Date</Label>
                  <Input id="expiration" type="date" />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="provider">Healthcare Provider</Label>
                <Input id="provider" placeholder="Doctor or clinic name" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="lot-number">Lot Number</Label>
                <Input id="lot-number" placeholder="Vaccine lot number" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="notes">Notes</Label>
                <Input id="notes" placeholder="Additional information" />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Save Vaccination</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Hepatitis A</CardTitle>
            <div className="rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-800">Valid</div>
          </CardHeader>
          <CardContent className="grid gap-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4 text-teal-500" />
                <span className="text-xs">Protection Level</span>
              </div>
              <Progress value={100} className="w-24" />
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-amber-500" />
                <span className="text-xs">Received</span>
              </div>
              <span className="text-xs">Jan 15, 2023</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-amber-500" />
                <span className="text-xs">Expires</span>
              </div>
              <span className="text-xs">Jan 15, 2033</span>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" size="sm" className="w-full">
              View Details
            </Button>
          </CardFooter>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Typhoid</CardTitle>
            <div className="rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-800">Valid</div>
          </CardHeader>
          <CardContent className="grid gap-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4 text-teal-500" />
                <span className="text-xs">Protection Level</span>
              </div>
              <Progress value={80} className="w-24" />
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-amber-500" />
                <span className="text-xs">Received</span>
              </div>
              <span className="text-xs">Mar 10, 2023</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-amber-500" />
                <span className="text-xs">Expires</span>
              </div>
              <span className="text-xs">Mar 10, 2025</span>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" size="sm" className="w-full">
              View Details
            </Button>
          </CardFooter>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Yellow Fever</CardTitle>
            <div className="rounded-full bg-amber-100 px-2 py-1 text-xs font-medium text-amber-800">Needed</div>
          </CardHeader>
          <CardContent className="grid gap-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4 text-teal-500" />
                <span className="text-xs">Protection Level</span>
              </div>
              <Progress value={0} className="w-24" />
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-amber-500" />
                <span className="text-xs">Required for</span>
              </div>
              <span className="text-xs">Multiple destinations</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-amber-500" />
                <span className="text-xs">Recommended by</span>
              </div>
              <span className="text-xs">June 1, 2023</span>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" size="sm" className="w-full">
              Schedule
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
