import { Plus, Save } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
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
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';

export function HealthProfile() {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold">Your Health Profile</h2>
            <p className="text-sm text-muted-foreground">
              Manage your health conditions and travel restrictions
            </p>
          </div>
          <Button>
            <Save className="mr-2 h-4 w-4" /> Save Profile
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
            <CardDescription>Basic information about you</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="full-name">Full Name</Label>
                <Input
                  id="full-name"
                  placeholder="John Doe"
                  defaultValue="Sarah Johnson"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="age">Age</Label>
                <Input
                  id="age"
                  type="number"
                  placeholder="35"
                  defaultValue="42"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Gender</Label>
              <RadioGroup defaultValue="female" className="flex gap-4">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="male" id="male" />
                  <Label htmlFor="male">Male</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="female" id="female" />
                  <Label htmlFor="female">Female</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="other" id="other" />
                  <Label htmlFor="other">Other</Label>
                </div>
              </RadioGroup>
            </div>
            <div className="space-y-2">
              <Label htmlFor="emergency-contact">Emergency Contact</Label>
              <Input
                id="emergency-contact"
                placeholder="+1 (555) 123-4567"
                defaultValue="+1 (555) 987-6543"
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Medical Conditions</CardTitle>
            <CardDescription>Select all that apply to you</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox id="respiratory" defaultChecked />
                <Label htmlFor="respiratory">Respiratory Conditions</Label>
              </div>
              <div className="ml-6 text-sm text-muted-foreground">
                Asthma, COPD, Chronic Bronchitis, Emphysema
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox id="cardiovascular" />
                <Label htmlFor="cardiovascular">
                  Cardiovascular Conditions
                </Label>
              </div>
              <div className="ml-6 text-sm text-muted-foreground">
                Heart Disease, Hypertension, Previous Heart Attack
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox id="diabetes" />
                <Label htmlFor="diabetes">Diabetes</Label>
              </div>
              <div className="ml-6 text-sm text-muted-foreground">
                Type 1 or Type 2 Diabetes
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox id="mobility" />
                <Label htmlFor="mobility">Mobility Issues</Label>
              </div>
              <div className="ml-6 text-sm text-muted-foreground">
                Arthritis, Joint Problems, Use of Mobility Aids
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox id="allergies" defaultChecked />
                <Label htmlFor="allergies">Allergies</Label>
              </div>
              <div className="ml-6 text-sm text-muted-foreground">
                Food, Environmental, Medication Allergies
              </div>
            </div>

            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" className="w-full">
                  <Plus className="mr-2 h-4 w-4" /> Add Another Condition
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add Medical Condition</DialogTitle>
                  <DialogDescription>
                    Add details about your medical condition.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="condition-name">Condition Name</Label>
                    <Input
                      id="condition-name"
                      placeholder="e.g., Rheumatoid Arthritis"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="condition-severity">Severity</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select severity" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="mild">Mild</SelectItem>
                        <SelectItem value="moderate">Moderate</SelectItem>
                        <SelectItem value="severe">Severe</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="condition-notes">Notes</Label>
                    <Textarea
                      id="condition-notes"
                      placeholder="Additional details about your condition"
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit">Save Condition</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Environmental Sensitivities</CardTitle>
            <CardDescription>
              Factors that affect your health while traveling
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Humidity Sensitivity</Label>
              <RadioGroup defaultValue="high-humidity" className="space-y-2">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="high-humidity" id="high-humidity" />
                  <Label htmlFor="high-humidity">
                    High humidity makes my condition worse
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="low-humidity" id="low-humidity" />
                  <Label htmlFor="low-humidity">
                    Low humidity makes my condition worse
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="no-humidity" id="no-humidity" />
                  <Label htmlFor="no-humidity">
                    Humidity doesn't affect my condition
                  </Label>
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-2">
              <Label>Temperature Sensitivity</Label>
              <RadioGroup defaultValue="cold" className="space-y-2">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="cold" id="cold" />
                  <Label htmlFor="cold">
                    Cold weather makes my condition worse
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="hot" id="hot" />
                  <Label htmlFor="hot">
                    Hot weather makes my condition worse
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="no-temp" id="no-temp" />
                  <Label htmlFor="no-temp">
                    Temperature doesn't affect my condition
                  </Label>
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-2">
              <Label>Altitude Sensitivity</Label>
              <RadioGroup defaultValue="high-altitude" className="space-y-2">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="high-altitude" id="high-altitude" />
                  <Label htmlFor="high-altitude">
                    High altitude makes my condition worse
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="no-altitude" id="no-altitude" />
                  <Label htmlFor="no-altitude">
                    Altitude doesn't affect my condition
                  </Label>
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-2">
              <Label>Air Quality Sensitivity</Label>
              <RadioGroup defaultValue="pollution" className="space-y-2">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="pollution" id="pollution" />
                  <Label htmlFor="pollution">
                    Air pollution makes my condition worse
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="no-pollution" id="no-pollution" />
                  <Label htmlFor="no-pollution">
                    Air quality doesn't affect my condition
                  </Label>
                </div>
              </RadioGroup>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Medical Requirements</CardTitle>
            <CardDescription>Special needs for your travel</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox id="specialist-access" defaultChecked />
                <Label htmlFor="specialist-access">
                  Need access to specialist care
                </Label>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox id="equipment" />
                <Label htmlFor="equipment">
                  Require special medical equipment
                </Label>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox id="refrigeration" />
                <Label htmlFor="refrigeration">
                  Medication requires refrigeration
                </Label>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox id="accessibility" />
                <Label htmlFor="accessibility">
                  Need wheelchair accessibility
                </Label>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="max-distance">
                Maximum distance from medical facilities (km)
              </Label>
              <Input
                id="max-distance"
                type="number"
                placeholder="50"
                defaultValue="20"
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full">Update Requirements</Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
