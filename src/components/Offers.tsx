const offers = [
  { title: 'Save up to Rs 300 on bus tickets', valid: '05 Oct', code: 'FESTIVE300', tone: 'peach' },
  { title: 'Save up to Rs 250 on bus tickets', valid: '31 Oct', code: 'FIRST', tone: 'pink' },
  { title: 'Save up to Rs 300 on bus tickets', valid: '31 Oct', code: 'BUS300', tone: 'pink' },
  { title: 'Save up to Rs 200 on Primo operators.', valid: '31 Oct', code: 'PRIMODAY', tone: 'yellow' },
]

function Offers() {
  return (
    <section className="container section">
      <div className="section-head">
        <h2>Offers for you</h2>
        <a href="#">View more</a>
      </div>
      <div className="tabs">
        <button type="button" className="tab active">All</button>
        <button type="button" className="tab">Bus</button>
        <button type="button" className="tab">Train</button>
      </div>
      <div className="offer-grid">
        {offers.map((o) => (
          <article key={o.code} className={`offer offer-${o.tone}`}>
            <span className="badge">Bus</span>
            <h3>{o.title}</h3>
            <p>Valid till {o.valid}</p>
            <span className="code">🏷 {o.code}</span>
            <span className="offer-art">🚌</span>
          </article>
        ))}
      </div>
    </section>
  )
}

export default Offers
