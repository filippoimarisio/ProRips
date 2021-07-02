
export interface MapLocation {
  latitude: number,
  longitude: number,
}

export interface DiscLocation extends MapLocation{
  id: number,
  distanceFromBasket: number,
  distanceFromTee: number
}