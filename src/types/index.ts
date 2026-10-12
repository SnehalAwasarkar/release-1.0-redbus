export interface City {
  id: number
  name: string
  state: string
}

export interface BoardingPoint {
  id: number
  name: string
  address: string
  landmark: string
  cityId: City['id']
}
