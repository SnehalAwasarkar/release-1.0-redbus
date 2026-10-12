import { render, screen, fireEvent } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import CityAutocomplete, { type CityAutocompleteProps } from './CityAutocomplete'
import type { City } from '../types'

const cities: City[] = [
  { id: 1, name: 'Pune', state: 'Maharashtra' },
  { id: 2, name: 'Bengaluru', state: 'Karnataka' },
]

function setup(overrides: Partial<CityAutocompleteProps> = {}) {
  const onInputChange = vi.fn()
  const onSelect = vi.fn()
  const props = {
    id: 'from-city',
    cities,
    value: '',
    selectedCityId: null,
    onInputChange,
    onSelect,
    placeholder: 'From',
    ariaLabel: 'From',
    ...overrides,
  }
  const utils = render(<CityAutocomplete {...props} />)
  return { ...utils, onInputChange, onSelect, input: screen.getByRole('combobox') }
}

describe('CityAutocomplete', () => {
  it('filters suggestions by prefix match on city name', () => {
    const { input } = setup({ value: 'pu' })
    fireEvent.focus(input)
    const option = screen.getByRole('option', { name: /Pune/ })
    expect(option).toHaveTextContent('Pune')
    expect(option).toHaveTextContent('Maharashtra')
    expect(screen.queryByRole('option', { name: /Bengaluru/ })).not.toBeInTheDocument()
  })

  it('does not match a suffix that is not a prefix', () => {
    const { input } = setup({ value: 'ne' })
    fireEvent.focus(input)
    expect(screen.queryByRole('option', { name: /Pune/ })).not.toBeInTheDocument()
  })

  it('shows no suggestions with zero characters typed', () => {
    const { input } = setup({ value: '' })
    fireEvent.focus(input)
    expect(screen.queryAllByRole('option')).toHaveLength(0)
  })

  it('exposes combobox ARIA wiring', () => {
    const { input } = setup({ value: 'pu' })
    fireEvent.focus(input)
    expect(input).toHaveAttribute('role', 'combobox')
    const listboxId = input.getAttribute('aria-controls')
    expect(listboxId).toBeTruthy()
    const listbox = document.getElementById(listboxId!)
    expect(listbox).toHaveAttribute('role', 'listbox')
  })

  it('ArrowDown moves aria-activedescendant and Enter selects the active option', () => {
    const { input, onSelect } = setup({ value: 'pu' })
    fireEvent.focus(input)
    fireEvent.keyDown(input, { key: 'ArrowDown' })
    const activeId = input.getAttribute('aria-activedescendant')
    expect(activeId).toBeTruthy()
    fireEvent.keyDown(input, { key: 'Enter' })
    expect(onSelect).toHaveBeenCalledWith(cities[0])
  })

  it('Enter does nothing when no option is active', () => {
    const { input, onSelect } = setup({ value: 'pu' })
    fireEvent.focus(input)
    fireEvent.keyDown(input, { key: 'Enter' })
    expect(onSelect).not.toHaveBeenCalled()
  })

  it('Escape closes the listbox without clearing the typed text', () => {
    const { input } = setup({ value: 'pu' })
    fireEvent.focus(input)
    expect(screen.getByRole('listbox')).toBeInTheDocument()
    fireEvent.keyDown(input, { key: 'Escape' })
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument()
    expect(input).toHaveValue('pu')
  })
})
