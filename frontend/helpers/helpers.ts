export const getHumidityColor = (value: number) => {
  if (value <= 40) return 'bg-green-500';
  if (value <= 60) return 'bg-amber-500';
  return 'bg-red-500';
};

export const getAirQualityColor = (value: number) => {
  if (value >= 85) return 'bg-green-500';
  if (value >= 70) return 'bg-amber-500';
  return 'bg-red-500';
};

export const getAllergenColor = (value: number) => {
  if (value <= 30) return 'bg-green-500';
  if (value <= 60) return 'bg-amber-500';
  return 'bg-red-500';
};

export const getTemperatureColor = (value: number) => {
  if (value >= 15 && value <= 25) return 'bg-green-500';
  if ((value >= 10 && value < 15) || (value > 25 && value <= 30))
    return 'bg-amber-500';
  return 'bg-red-500';
};

// Function to get color for a location based on the current factor and month
export const getLocationColor = (monthData, factor: string) => {
  // const monthData = healthData[location].data[currentMonth];
  switch (factor) {
    case 'humidity':
      return getHumidityColor(monthData.humidity);
    case 'air-quality':
      return getAirQualityColor(monthData.airQuality);
    case 'allergens':
      return getAllergenColor(monthData.allergens);
    case 'temperature':
      return getTemperatureColor(monthData.temperature);
    default:
      return 'bg-gray-500';
  }
};
