import { Phone, Plus, User } from "lucide-react"

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

export function EmergencyContacts() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Local Emergency Services</CardTitle>
          <Phone className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent className="grid gap-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="rounded-full bg-red-100 p-1">
                <Phone className="h-4 w-4 text-red-600" />
              </div>
              <div>
                <p className="text-sm font-medium">Emergency</p>
                <p className="text-xs text-muted-foreground">Paris, France</p>
              </div>
            </div>
            <p className="text-sm font-medium">112</p>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="rounded-full bg-red-100 p-1">
                <Phone className="h-4 w-4 text-red-600" />
              </div>
              <div>
                <p className="text-sm font-medium">Police</p>
                <p className="text-xs text-muted-foreground">Paris, France</p>
              </div>
            </div>
            <p className="text-sm font-medium">17</p>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="rounded-full bg-red-100 p-1">
                <Phone className="h-4 w-4 text-red-600" />
              </div>
              <div>
                <p className="text-sm font-medium">Ambulance</p>
                <p className="text-xs text-muted-foreground">Paris, France</p>
              </div>
            </div>
            <p className="text-sm font-medium">15</p>
          </div>
        </CardContent>
        <CardFooter>
          <Button variant="outline" size="sm" className="w-full">
            Call
          </Button>
        </CardFooter>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Personal Contacts</CardTitle>
          <User className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent className="grid gap-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="rounded-full bg-teal-100 p-1">
                <User className="h-4 w-4 text-teal-600" />
              </div>
              <div>
                <p className="text-sm font-medium">Dr. Sarah Johnson</p>
                <p className="text-xs text-muted-foreground">Primary Physician</p>
              </div>
            </div>
            <Button variant="ghost" size="sm">
              <Phone className="h-4 w-4" />
            </Button>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="rounded-full bg-teal-100 p-1">
                <User className="h-4 w-4 text-teal-600" />
              </div>
              <div>
                <p className="text-sm font-medium">Michael Smith</p>
                <p className="text-xs text-muted-foreground">Emergency Contact</p>
              </div>
            </div>
            <Button variant="ghost" size="sm">
              <Phone className="h-4 w-4" />
            </Button>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="rounded-full bg-teal-100 p-1">
                <User className="h-4 w-4 text-teal-600" />
              </div>
              <div>
                <p className="text-sm font-medium">Emma Davis</p>
                <p className="text-xs text-muted-foreground">Travel Companion</p>
              </div>
            </div>
            <Button variant="ghost" size="sm">
              <Phone className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
        <CardFooter>
          <Button variant="outline" size="sm" className="w-full">
            Manage Contacts
          </Button>
        </CardFooter>
      </Card>
      <Dialog>
        <DialogTrigger asChild>
          <Card className="flex h-full cursor-pointer flex-col items-center justify-center p-6 text-muted-foreground hover:border-teal-500 hover:text-teal-500">
            <Plus className="mb-2 h-6 w-6" />
            <p className="text-sm">Add Contact</p>
          </Card>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Emergency Contact</DialogTitle>
            <DialogDescription>Add important contacts for your travels.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="contact-name">Name</Label>
              <Input id="contact-name" placeholder="Enter contact name" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="relationship">Relationship</Label>
              <Input id="relationship" placeholder="e.g., Doctor, Family, Friend" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input id="phone" placeholder="+1 (555) 123-4567" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="contact-type">Contact Type</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="personal">Personal</SelectItem>
                  <SelectItem value="medical">Medical</SelectItem>
                  <SelectItem value="emergency">Emergency Service</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="notes">Notes</Label>
              <Input id="notes" placeholder="Additional information" />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Save Contact</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
