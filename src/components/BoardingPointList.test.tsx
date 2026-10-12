import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import BoardingPointList from './BoardingPointList'
import type { BoardingPoint, City } from '../types'

const cities: City[] = [{ id: 1, name: 'Pune', state: 'Maharashtra' }]
const boardingPoints: BoardingPoint[] = [
  { id: 1, name: 'Shivajinagar', address: 'FC Road', landmark: 'Near Modern Cafe', cityId: 1 },
]

describe('BoardingPointList', () => {
  it('renders each boarding point with its fields', () => {
    render(<BoardingPointList cities={cities} boardingPoints={boardingPoints} />)
    const item = screen.getByRole('listitem')
    expect(item).toHaveTextContent('Shivajinagar')
    expect(item).toHaveTextContent('FC Road')
    expect(item).toHaveTextContent('Near Modern Cafe')
  })

  it('resolves cityId to the city name and state', () => {
    render(<BoardingPointList cities={cities} boardingPoints={boardingPoints} />)
    expect(screen.getByRole('listitem')).toHaveTextContent('(Pune, Maharashtra)')
  })
})
