import type { BoardingPoint, City } from '../types'

interface Props {
  cities: City[]
  boardingPoints: BoardingPoint[]
}

function BoardingPointList({ cities, boardingPoints }: Props) {
  return (
    <ul className="bp-grid">
      {boardingPoints.map((bp) => {
        const city = cities.find((c) => c.id === bp.cityId)
        return (
          <li key={bp.id} className="bp-card">
            <strong>{bp.name}</strong> — {bp.address}, {bp.landmark}
            {city && ` (${city.name}, ${city.state})`}
          </li>
        )
      })}
    </ul>
  )
}

export default BoardingPointList
