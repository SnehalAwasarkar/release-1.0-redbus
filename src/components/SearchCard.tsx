import { useState } from 'react'
import CityAutocomplete from './CityAutocomplete'
import { cities } from '../data'
import type { City } from '../types'

const formatDate = (d: Date) =>
  `${String(d.getDate()).padStart(2, '0')} ${d.toLocaleString('en-US', { month: 'short' })}, ${d.getFullYear()}`

function SearchCard() {
  const [today] = useState(() => new Date())
  const [dayOffset, setDayOffset] = useState(0)
  const [forWomen, setForWomen] = useState(false)

  const [fromText, setFromText] = useState('')
  const [fromCityId, setFromCityId] = useState<City['id'] | null>(null)
  const [toText, setToText] = useState('')
  const [toCityId, setToCityId] = useState<City['id'] | null>(null)

  const [fromError, setFromError] = useState<string | null>(null)
  const [toError, setToError] = useState<string | null>(null)

  const date = new Date(today)
  date.setDate(today.getDate() + dayOffset)

  const handleFromInputChange = (text: string) => {
    setFromText(text)
    setFromCityId(null)
    setFromError(null)
  }

  const handleFromSelect = (city: City) => {
    setFromText(city.name)
    setFromCityId(city.id)
    setFromError(null)
  }

  const handleToInputChange = (text: string) => {
    setToText(text)
    setToCityId(null)
    setToError(null)
  }

  const handleToSelect = (city: City) => {
    setToText(city.name)
    setToCityId(city.id)
    setToError(null)
  }

  const handleSwap = () => {
    const prevFromText = fromText
    const prevFromCityId = fromCityId
    setFromText(toText)
    setFromCityId(toCityId)
    setToText(prevFromText)
    setToCityId(prevFromCityId)
    setFromError(null)
    setToError(null)
  }

  const handleSearchClick = () => {
    let nextFromError: string | null = null
    let nextToError: string | null = null

    if (fromCityId === null) {
      nextFromError = fromText.length > 0 ? 'Please select a city from suggestions' : 'Please enter a city'
    }
    if (toCityId === null) {
      nextToError = toText.length > 0 ? 'Please select a city from suggestions' : 'Please enter a city'
    }

    if (!nextFromError && !nextToError && fromCityId === toCityId) {
      nextFromError = 'From and To cities cannot be the same'
      nextToError = 'From and To cities cannot be the same'
    }

    setFromError(nextFromError)
    setToError(nextToError)
  }

  return (
    <div className="search-card">
      <div className="search-row">
        <div className="search-fields">
          <div className="field">
            <span className="field-icon">🚌</span>
            <CityAutocomplete
              id="from-city"
              cities={cities}
              value={fromText}
              selectedCityId={fromCityId}
              onInputChange={handleFromInputChange}
              onSelect={handleFromSelect}
              placeholder="From"
              ariaLabel="From"
              error={fromError ?? undefined}
            />
          </div>
          <button type="button" className="swap-btn" aria-label="Swap From and To cities" onClick={handleSwap}>
            ⇄
          </button>
          <div className="field">
            <span className="field-icon">🚌</span>
            <CityAutocomplete
              id="to-city"
              cities={cities}
              value={toText}
              selectedCityId={toCityId}
              onInputChange={handleToInputChange}
              onSelect={handleToSelect}
              placeholder="To"
              ariaLabel="To"
              error={toError ?? undefined}
            />
          </div>
          <div className="field date-field">
            <span className="field-icon">📅</span>
            <div className="date-text">
              <small>Date of Journey</small>
              <strong>{formatDate(date)}</strong>
              <em>{dayOffset === 0 ? '(Today)' : '(Tomorrow)'}</em>
            </div>
            <button type="button" className={`chip ${dayOffset === 0 ? 'chip-active' : ''}`} onClick={() => setDayOffset(0)}>
              Today
            </button>
            <button type="button" className={`chip ${dayOffset === 1 ? 'chip-active' : ''}`} onClick={() => setDayOffset(1)}>
              Tomorrow
            </button>
          </div>
        </div>
        <div className="women-box">
          <span className="women-icon">👩</span>
          <div>
            <div>Booking for women</div>
            <a href="#">Know more</a>
          </div>
          <button
            type="button"
            role="switch"
            aria-checked={forWomen}
            aria-label="Booking for women"
            className={`toggle ${forWomen ? 'on' : ''}`}
            onClick={() => setForWomen((v) => !v)}
          />
        </div>
      </div>
      <button type="button" className="search-btn" onClick={handleSearchClick}>⌕ Search buses</button>
    </div>
  )
}

export default SearchCard
