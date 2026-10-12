import { useState } from 'react'

const formatDate = (d: Date) =>
  `${String(d.getDate()).padStart(2, '0')} ${d.toLocaleString('en-US', { month: 'short' })}, ${d.getFullYear()}`

function SearchCard() {
  const [today] = useState(() => new Date())
  const [dayOffset, setDayOffset] = useState(0)
  const [forWomen, setForWomen] = useState(false)

  const date = new Date(today)
  date.setDate(today.getDate() + dayOffset)

  return (
    <div className="search-card">
      <div className="search-row">
        <div className="search-fields">
          <label className="field">
            <span className="field-icon">🚌</span>
            <input placeholder="From" aria-label="From" />
          </label>
          <label className="field">
            <span className="field-icon">🚌</span>
            <input placeholder="To" aria-label="To" />
          </label>
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
      <button type="button" className="search-btn">⌕ Search buses</button>
    </div>
  )
}

export default SearchCard
