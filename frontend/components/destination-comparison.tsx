import { Check, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function DestinationComparison() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Destination Comparison</h2>
          <p className="text-sm text-muted-foreground">Compare health factors between destinations</p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <Card className="col-span-3 md:col-span-1">
          <CardHeader>
            <CardTitle>Select Destinations</CardTitle>
            <CardDescription>Choose up to 3 destinations to compare</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Destination 1</label>
              <Select defaultValue="tuscany">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="tuscany">Tuscany, Italy</SelectItem>
                  <SelectItem value="san-diego">San Diego, USA</SelectItem>
                  <SelectItem value="canary">Canary Islands, Spain</SelectItem>
                  <SelectItem value="arizona">Arizona, USA</SelectItem>
                  <SelectItem value="swiss-alps">Swiss Alps (Lower)</SelectItem>
                  <SelectItem value="greek-islands">Greek Islands</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Destination 2</label>
              <Select defaultValue="arizona">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="tuscany">Tuscany, Italy</SelectItem>
                  <SelectItem value="san-diego">San Diego, USA</SelectItem>
                  <SelectItem value="canary">Canary Islands, Spain</SelectItem>
                  <SelectItem value="arizona">Arizona, USA</SelectItem>
                  <SelectItem value="swiss-alps">Swiss Alps (Lower)</SelectItem>
                  <SelectItem value="greek-islands">Greek Islands</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Destination 3</label>
              <Select defaultValue="greek-islands">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="tuscany">Tuscany, Italy</SelectItem>
                  <SelectItem value="san-diego">San Diego, USA</SelectItem>
                  <SelectItem value="canary">Canary Islands, Spain</SelectItem>
                  <SelectItem value="arizona">Arizona, USA</SelectItem>
                  <SelectItem value="swiss-alps">Swiss Alps (Lower)</SelectItem>
                  <SelectItem value="greek-islands">Greek Islands</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full">Compare</Button>
          </CardFooter>
        </Card>

        <Card className="col-span-3 md:col-span-2">
          <CardHeader>
            <CardTitle>Health Comparison Results</CardTitle>
            <CardDescription>Based on your respiratory condition profile</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="overview">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="climate">Climate</TabsTrigger>
                <TabsTrigger value="medical">Medical</TabsTrigger>
                <TabsTrigger value="activities">Activities</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-4 pt-4">
                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2 text-center">
                    <div className="mx-auto aspect-video w-full overflow-hidden rounded-md">
                      <img
                        src="/placeholder.svg?height=100&width=200"
                        alt="Tuscany"
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <h3 className="font-medium">Tuscany, Italy</h3>
                    <div className="mx-auto w-3/4">
                      <Progress value={95} className="h-2" />
                    </div>
                    <p className="text-sm font-medium text-green-600">95% Compatible</p>
                  </div>
                  <div className="space-y-2 text-center">
                    <div className="mx-auto aspect-video w-full overflow-hidden rounded-md">
                      <img
                        src="/placeholder.svg?height=100&width=200"
                        alt="Arizona"
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <h3 className="font-medium">Arizona, USA</h3>
                    <div className="mx-auto w-3/4">
                      <Progress value={88} className="h-2" />
                    </div>
                    <p className="text-sm font-medium text-green-600">88% Compatible</p>
                  </div>
                  <div className="space-y-2 text-center">
                    <div className="mx-auto aspect-video w-full overflow-hidden rounded-md">
                      <img
                        src="/placeholder.svg?height=100&width=200"
                        alt="Greek Islands"
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <h3 className="font-medium">Greek Islands</h3>
                    <div className="mx-auto w-3/4">
                      <Progress value={82} className="h-2" />
                    </div>
                    <p className="text-sm font-medium text-amber-600">82% Compatible</p>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="font-medium">Key Comparison Factors</h3>

                  <div className="grid grid-cols-4 gap-2 text-sm">
                    <div className="font-medium">Factor</div>
                    <div className="text-center font-medium">Tuscany</div>
                    <div className="text-center font-medium">Arizona</div>
                    <div className="text-center font-medium">Greek Islands</div>

                    <div>Humidity</div>
                    <div className="text-center text-green-600">Low (40-50%)</div>
                    <div className="text-center text-green-600">Very Low (20-30%)</div>
                    <div className="text-center text-amber-600">Moderate (60-70%)</div>

                    <div>Air Quality</div>
                    <div className="text-center text-green-600">Excellent</div>
                    <div className="text-center text-green-600">Good</div>
                    <div className="text-center text-green-600">Good</div>

                    <div>Allergens</div>
                    <div className="text-center text-amber-600">Moderate</div>
                    <div className="text-center text-amber-600">Moderate</div>
                    <div className="text-center text-amber-600">Moderate</div>

                    <div>Medical Facilities</div>
                    <div className="text-center text-green-600">High Quality</div>
                    <div className="text-center text-green-600">Excellent</div>
                    <div className="text-center text-amber-600">Varies by island</div>

                    <div>Temperature Range</div>
                    <div className="text-center text-green-600">Mild (15-30°C)</div>
                    <div className="text-center text-amber-600">Hot (20-40°C)</div>
                    <div className="text-center text-green-600">Mild (18-32°C)</div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="font-medium">Recommendation Summary</h3>

                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div className="space-y-2">
                      <p className="font-medium text-green-600">Best Overall Choice</p>
                      <p>
                        Tuscany offers the best balance of low humidity, excellent air quality, and high-quality medical
                        facilities.
                      </p>
                    </div>
                    <div className="space-y-2">
                      <p className="font-medium text-amber-600">Best for Very Dry Air</p>
                      <p>Arizona has the lowest humidity, but temperatures can be extreme in summer months.</p>
                    </div>
                    <div className="space-y-2">
                      <p className="font-medium text-amber-600">Best for Beach Lovers</p>
                      <p>Greek Islands offer beautiful beaches, but humidity is higher and medical facilities vary.</p>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="climate" className="space-y-4 pt-4">
                <div className="grid grid-cols-4 gap-2 text-sm">
                  <div className="font-medium">Climate Factor</div>
                  <div className="text-center font-medium">Tuscany</div>
                  <div className="text-center font-medium">Arizona</div>
                  <div className="text-center font-medium">Greek Islands</div>

                  <div>Humidity (Avg)</div>
                  <div className="text-center text-green-600">Low (40-50%)</div>
                  <div className="text-center text-green-600">Very Low (20-30%)</div>
                  <div className="text-center text-amber-600">Moderate (60-70%)</div>

                  <div>Summer Temp (°C)</div>
                  <div className="text-center">25-30°C</div>
                  <div className="text-center text-red-600">35-45°C</div>
                  <div className="text-center">28-32°C</div>

                  <div>Winter Temp (°C)</div>
                  <div className="text-center">5-15°C</div>
                  <div className="text-center">10-20°C</div>
                  <div className="text-center">10-18°C</div>

                  <div>Rainfall</div>
                  <div className="text-center">Low-Moderate</div>
                  <div className="text-center">Very Low</div>
                  <div className="text-center">Low</div>

                  <div>Wind</div>
                  <div className="text-center">Mild</div>
                  <div className="text-center">Moderate</div>
                  <div className="text-center">Moderate-Strong</div>

                  <div>Altitude</div>
                  <div className="text-center">100-600m</div>
                  <div className="text-center">300-2000m</div>
                  <div className="text-center">0-600m</div>

                  <div>Best Season</div>
                  <div className="text-center">Spring/Fall</div>
                  <div className="text-center">Winter/Spring</div>
                  <div className="text-center">Spring/Fall</div>
                </div>

                <div className="rounded-md bg-muted p-4">
                  <h4 className="mb-2 font-medium">Climate Impact on Respiratory Health</h4>
                  <p className="text-sm text-muted-foreground">
                    For your respiratory condition, Tuscany offers the most consistent climate benefits year-round, with
                    low humidity and moderate temperatures. Arizona has the lowest humidity but extreme summer heat can
                    be challenging. The Greek Islands have higher humidity but beneficial sea air.
                  </p>
                </div>
              </TabsContent>

              <TabsContent value="medical" className="space-y-4 pt-4">
                <div className="grid grid-cols-4 gap-2 text-sm">
                  <div className="font-medium">Medical Factor</div>
                  <div className="text-center font-medium">Tuscany</div>
                  <div className="text-center font-medium">Arizona</div>
                  <div className="text-center font-medium">Greek Islands</div>

                  <div>Hospital Quality</div>
                  <div className="text-center text-green-600">Excellent</div>
                  <div className="text-center text-green-600">Excellent</div>
                  <div className="text-center text-amber-600">Good (varies)</div>

                  <div>Specialist Availability</div>
                  <div className="text-center">
                    <Check className="mx-auto h-4 w-4 text-green-600" />
                  </div>
                  <div className="text-center">
                    <Check className="mx-auto h-4 w-4 text-green-600" />
                  </div>
                  <div className="text-center">
                    <Check className="mx-auto h-4 w-4 text-green-600" />
                  </div>

                  <div>English-Speaking Staff</div>
                  <div className="text-center">
                    <Check className="mx-auto h-4 w-4 text-green-600" />
                  </div>
                  <div className="text-center">
                    <Check className="mx-auto h-4 w-4 text-green-600" />
                  </div>
                  <div className="text-center">
                    <Check className="mx-auto h-4 w-4 text-green-600" />
                  </div>

                  <div>Insurance Acceptance</div>
                  <div className="text-center">Most International</div>
                  <div className="text-center">US Insurance</div>
                  <div className="text-center">EU Insurance</div>

                  <div>Emergency Response</div>
                  <div className="text-center text-green-600">Fast</div>
                  <div className="text-center text-green-600">Fast</div>
                  <div className="text-center text-amber-600">Varies by island</div>

                  <div>Pharmacy Access</div>
                  <div className="text-center">
                    <Check className="mx-auto h-4 w-4 text-green-600" />
                  </div>
                  <div className="text-center">
                    <Check className="mx-auto h-4 w-4 text-green-600" />
                  </div>
                  <div className="text-center">
                    <Check className="mx-auto h-4 w-4 text-green-600" />
                  </div>

                  <div>Medication Availability</div>
                  <div className="text-center">
                    <Check className="mx-auto h-4 w-4 text-green-600" />
                  </div>
                  <div className="text-center">
                    <Check className="mx-auto h-4 w-4 text-green-600" />
                  </div>
                  <div className="text-center">
                    <Check className="mx-auto h-4 w-4 text-green-600" />
                  </div>
                </div>

                <div className="rounded-md bg-muted p-4">
                  <h4 className="mb-2 font-medium">Medical Facilities Assessment</h4>
                  <p className="text-sm text-muted-foreground">
                    Both Tuscany and Arizona offer excellent medical facilities with respiratory specialists. The Greek
                    Islands have more variable medical care, with excellent facilities on larger islands but limited
                    options on smaller ones. All destinations have good access to pharmacies and common medications.
                  </p>
                </div>
              </TabsContent>

              <TabsContent value="activities" className="space-y-4 pt-4">
                <div className="grid grid-cols-4 gap-2 text-sm">
                  <div className="font-medium">Activity</div>
                  <div className="text-center font-medium">Tuscany</div>
                  <div className="text-center font-medium">Arizona</div>
                  <div className="text-center font-medium">Greek Islands</div>

                  <div>Walking/Hiking</div>
                  <div className="text-center">
                    <Check className="mx-auto h-4 w-4 text-green-600" />
                  </div>
                  <div className="text-center">
                    <Check className="mx-auto h-4 w-4 text-green-600" />
                  </div>
                  <div className="text-center">
                    <Check className="mx-auto h-4 w-4 text-green-600" />
                  </div>

                  <div>Swimming</div>
                  <div className="text-center">
                    <Check className="mx-auto h-4 w-4 text-green-600" />
                  </div>
                  <div className="text-center">
                    <Check className="mx-auto h-4 w-4 text-green-600" />
                  </div>
                  <div className="text-center">
                    <Check className="mx-auto h-4 w-4 text-green-600" />
                  </div>

                  <div>Cultural Sites</div>
                  <div className="text-center">
                    <Check className="mx-auto h-4 w-4 text-green-600" />
                  </div>
                  <div className="text-center">
                    <X className="mx-auto h-4 w-4 text-red-600" />
                  </div>
                  <div className="text-center">
                    <Check className="mx-auto h-4 w-4 text-green-600" />
                  </div>

                  <div>Outdoor Dining</div>
                  <div className="text-center">
                    <Check className="mx-auto h-4 w-4 text-green-600" />
                  </div>
                  <div className="text-center">
                    <Check className="mx-auto h-4 w-4 text-green-600" />
                  </div>
                  <div className="text-center">
                    <Check className="mx-auto h-4 w-4 text-green-600" />
                  </div>

                  <div>Strenuous Activities</div>
                  <div className="text-center text-amber-600">Caution</div>
                  <div className="text-center text-amber-600">Caution</div>
                  <div className="text-center text-amber-600">Caution</div>

                  <div>Evening Activities</div>
                  <div className="text-center">
                    <Check className="mx-auto h-4 w-4 text-green-600" />
                  </div>
                  <div className="text-center">
                    <Check className="mx-auto h-4 w-4 text-green-600" />
                  </div>
                  <div className="text-center">
                    <Check className="mx-auto h-4 w-4 text-green-600" />
                  </div>
                </div>

                <div className="rounded-md bg-muted p-4">
                  <h4 className="mb-2 font-medium">Activity Recommendations</h4>
                  <p className="text-sm text-muted-foreground">
                    All three destinations offer activities suitable for people with respiratory conditions. Tuscany
                    provides a good balance of cultural experiences and outdoor activities in a mild climate. Arizona
                    offers beautiful natural landscapes but outdoor activities should be limited during hot summer
                    months. The Greek Islands combine beach relaxation with cultural exploration.
                  </p>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
