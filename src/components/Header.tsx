function Header() {
  return (
    <header className="header">
      <div className="container header-inner">
        <div className="brand">redBus</div>
        <nav className="nav-main">
          <a className="nav-item active" href="#">
            <span className="nav-icon">🚌</span>Bus tickets
          </a>
          <a className="nav-item" href="#">
            <span className="nav-icon">🚆</span>Train tickets
          </a>
          <a className="nav-item" href="#">
            <span className="nav-icon">🛏️</span>Hotels
          </a>
        </nav>
        <nav className="nav-side">
          <a href="#">☰ Bookings</a>
          <a href="#">ⓘ Help</a>
          <a href="#">◉ Account</a>
        </nav>
      </div>
    </header>
  )
}

export default Header
