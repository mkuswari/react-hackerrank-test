export interface Weather {
  id: number;
  city: string;
  temperature: number;
  description: string;
}

export const weatherData: Weather[] = [
  { id: 1, city: 'New York', temperature: 18, description: 'Sunny' },
  { id: 2, city: 'London', temperature: 12, description: 'Cloudy' },
  { id: 3, city: 'Paris', temperature: 16, description: 'Rainy' },
  { id: 4, city: 'Tokyo', temperature: 22, description: 'Clear' },
  { id: 5, city: 'Sydney', temperature: 24, description: 'Sunny' },
  { id: 6, city: 'Moscow', temperature: 5, description: 'Snowy' },
]; 