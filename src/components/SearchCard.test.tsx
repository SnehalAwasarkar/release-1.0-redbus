import { render, screen, fireEvent } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import SearchCard from './SearchCard'

function selectCity(labelText: string, query: string, cityName: string) {
  const input = screen.getByRole('combobox', { name: labelText })
  fireEvent.change(input, { target: { value: query } })
  fireEvent.focus(input)
  const option = screen.getByRole('option', { name: new RegExp(cityName) })
  fireEvent.mouseDown(option)
}

describe('SearchCard', () => {
  it('typing "pu" and selecting "Pune" stores the city selection (cityId 1) in the From field', () => {
    render(<SearchCard />)
    selectCity('From', 'pu', 'Pune')
    const fromInput = screen.getByRole('combobox', { name: 'From' })
    expect(fromInput).toHaveValue('Pune')

    // Selecting the same city (id 1) in To and clicking Search triggers the
    // "same city" validation, which only fires when both ids match — proving
    // the From field stored Pune's cityId (1), not its text.
    selectCity('To', 'pu', 'Pune')
    fireEvent.click(screen.getByRole('button', { name: /search buses/i }))

    const errors = screen.getAllByText('From and To cities cannot be the same')
    expect(errors).toHaveLength(2)
  })

  it('swaps the selected cities (and displayed text) between From and To', () => {
    render(<SearchCard />)
    selectCity('From', 'pu', 'Pune')
    selectCity('To', 'be', 'Bengaluru')

    const fromInput = screen.getByRole('combobox', { name: 'From' })
    const toInput = screen.getByRole('combobox', { name: 'To' })
    expect(fromInput).toHaveValue('Pune')
    expect(toInput).toHaveValue('Bengaluru')

    fireEvent.click(screen.getByRole('button', { name: /swap from and to cities/i }))

    expect(fromInput).toHaveValue('Bengaluru')
    expect(toInput).toHaveValue('Pune')

    // Swapped selections remain valid distinct cities, so searching should not error.
    fireEvent.click(screen.getByRole('button', { name: /search buses/i }))
    expect(screen.queryByText(/please enter a city/i)).not.toBeInTheDocument()
    expect(screen.queryByText(/please select a city from suggestions/i)).not.toBeInTheDocument()
    expect(screen.queryByText(/cannot be the same/i)).not.toBeInTheDocument()
  })

  it('shows a required-field error next to each empty field when Search is clicked', () => {
    render(<SearchCard />)
    fireEvent.click(screen.getByRole('button', { name: /search buses/i }))

    const errors = screen.getAllByText('Please enter a city')
    expect(errors).toHaveLength(2)
  })

  it('shows "select a city from suggestions" when text was typed but never selected', () => {
    render(<SearchCard />)
    const fromInput = screen.getByRole('combobox', { name: 'From' })
    fireEvent.change(fromInput, { target: { value: 'pu' } })

    fireEvent.click(screen.getByRole('button', { name: /search buses/i }))

    expect(screen.getByText('Please select a city from suggestions')).toBeInTheDocument()
    expect(screen.getByText('Please enter a city')).toBeInTheDocument()
  })

  it('shows an error next to both fields when the same city is selected in From and To', () => {
    render(<SearchCard />)
    selectCity('From', 'pu', 'Pune')
    selectCity('To', 'pu', 'Pune')

    fireEvent.click(screen.getByRole('button', { name: /search buses/i }))

    const errors = screen.getAllByText('From and To cities cannot be the same')
    expect(errors).toHaveLength(2)
  })

  it('shows no validation errors when two distinct valid cities are selected', () => {
    render(<SearchCard />)
    selectCity('From', 'pu', 'Pune')
    selectCity('To', 'be', 'Bengaluru')

    fireEvent.click(screen.getByRole('button', { name: /search buses/i }))

    expect(screen.queryByText(/please enter a city/i)).not.toBeInTheDocument()
    expect(screen.queryByText(/please select a city from suggestions/i)).not.toBeInTheDocument()
    expect(screen.queryByText(/cannot be the same/i)).not.toBeInTheDocument()
  })
})
