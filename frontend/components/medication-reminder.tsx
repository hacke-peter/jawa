import { Check, Clock, Plus } from "lucide-react"

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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function MedicationReminder() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Malaria Prevention</CardTitle>
          <Clock className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-sm">Malarone</div>
          <div className="mt-2 flex items-center gap-2">
            <div className="rounded-full bg-teal-100 p-1">
              <Clock className="h-4 w-4 text-teal-600" />
            </div>
            <span className="text-xs">Daily - 8:00 AM</span>
          </div>
          <div className="mt-2 text-xs text-muted-foreground">Take with food. Start 2 days before travel.</div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" size="sm">
            <Check className="mr-1 h-4 w-4" /> Taken
          </Button>
          <Button variant="ghost" size="sm">
            Skip
          </Button>
        </CardFooter>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Allergy</CardTitle>
          <Clock className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-sm">Cetirizine</div>
          <div className="mt-2 flex items-center gap-2">
            <div className="rounded-full bg-teal-100 p-1">
              <Clock className="h-4 w-4 text-teal-600" />
            </div>
            <span className="text-xs">Daily - 10:00 PM</span>
          </div>
          <div className="mt-2 text-xs text-muted-foreground">Take as needed for allergic symptoms.</div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" size="sm">
            <Check className="mr-1 h-4 w-4" /> Taken
          </Button>
          <Button variant="ghost" size="sm">
            Skip
          </Button>
        </CardFooter>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Traveler's Diarrhea</CardTitle>
          <Clock className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-sm">Ciprofloxacin</div>
          <div className="mt-2 flex items-center gap-2">
            <div className="rounded-full bg-teal-100 p-1">
              <Clock className="h-4 w-4 text-teal-600" />
            </div>
            <span className="text-xs">As needed</span>
          </div>
          <div className="mt-2 text-xs text-muted-foreground">Take only if experiencing symptoms.</div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" size="sm" disabled>
            <Check className="mr-1 h-4 w-4" /> Taken
          </Button>
          <Button variant="ghost" size="sm" disabled>
            Skip
          </Button>
        </CardFooter>
      </Card>
      <Dialog>
        <DialogTrigger asChild>
          <Card className="flex h-full cursor-pointer flex-col items-center justify-center p-6 text-muted-foreground hover:border-teal-500 hover:text-teal-500">
            <Plus className="mb-2 h-6 w-6" />
            <p className="text-sm">Add Medication</p>
          </Card>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Medication</DialogTitle>
            <DialogDescription>Enter the details of your medication and set reminders.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="medication-name">Medication Name</Label>
              <Input id="medication-name" placeholder="Enter medication name" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="dosage">Dosage</Label>
              <Input id="dosage" placeholder="e.g., 10mg" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="frequency">Frequency</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select frequency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="daily">Daily</SelectItem>
                  <SelectItem value="twice-daily">Twice Daily</SelectItem>
                  <SelectItem value="as-needed">As Needed</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="time">Time</Label>
              <Input id="time" type="time" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="notes">Notes</Label>
              <Input id="notes" placeholder="Additional instructions" />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Save Medication</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
