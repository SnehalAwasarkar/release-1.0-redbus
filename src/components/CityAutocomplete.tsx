import { useState, type KeyboardEvent } from 'react'
import type { City } from '../types'

export interface CityAutocompleteProps {
  id: string
  cities: City[]
  value: string
  selectedCityId: City['id'] | null
  onInputChange: (text: string) => void
  onSelect: (city: City) => void
  placeholder: string
  ariaLabel: string
  error?: string
}

function CityAutocomplete({
  id,
  cities,
  value,
  onInputChange,
  onSelect,
  placeholder,
  ariaLabel,
  error,
}: CityAutocompleteProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [activeIndex, setActiveIndex] = useState(-1)

  const suggestions =
    value.length >= 1
      ? cities.filter((city) => city.name.toLowerCase().startsWith(value.toLowerCase()))
      : []

  const listboxId = `${id}-listbox`
  const activeOptionId =
    activeIndex >= 0 && activeIndex < suggestions.length ? `${id}-option-${activeIndex}` : undefined

  const handleChange = (text: string) => {
    onInputChange(text)
    setActiveIndex(-1)
    setIsOpen(true)
  }

  const handleFocus = () => {
    setIsOpen(true)
  }

  const handleSelect = (city: City) => {
    onSelect(city)
    setIsOpen(false)
    setActiveIndex(-1)
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      if (!isOpen) setIsOpen(true)
      if (suggestions.length > 0) {
        setActiveIndex((prev) => (prev + 1 < suggestions.length ? prev + 1 : suggestions.length - 1))
      }
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      if (!isOpen) setIsOpen(true)
      if (suggestions.length > 0) {
        setActiveIndex((prev) => (prev - 1 >= 0 ? prev - 1 : 0))
      }
    } else if (e.key === 'Enter') {
      if (isOpen && activeIndex >= 0 && activeIndex < suggestions.length) {
        e.preventDefault()
        handleSelect(suggestions[activeIndex])
      }
    } else if (e.key === 'Escape') {
      setIsOpen(false)
      setActiveIndex(-1)
    }
  }

  return (
    <div className="autocomplete">
      <input
        id={id}
        role="combobox"
        aria-expanded={isOpen}
        aria-controls={listboxId}
        aria-activedescendant={activeOptionId}
        aria-autocomplete="list"
        aria-label={ariaLabel}
        autoComplete="off"
        placeholder={placeholder}
        value={value}
        onChange={(e) => handleChange(e.target.value)}
        onFocus={handleFocus}
        onKeyDown={handleKeyDown}
      />
      {isOpen && (
        <ul id={listboxId} role="listbox" className="autocomplete-listbox">
          {suggestions.map((city, index) => (
            <li
              key={city.id}
              id={`${id}-option-${index}`}
              role="option"
              aria-selected={index === activeIndex}
              className={`autocomplete-option ${index === activeIndex ? 'autocomplete-option-active' : ''}`}
              onMouseDown={(e) => {
                e.preventDefault()
                handleSelect(city)
              }}
            >
              <span className="autocomplete-primary">{city.name}</span>
              <span className="autocomplete-secondary">{city.state}</span>
            </li>
          ))}
        </ul>
      )}
      {error && <span className="field-error">{error}</span>}
    </div>
  )
}

export default CityAutocomplete
