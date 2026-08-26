import { NavLink, Outlet } from 'react-router-dom'

function AppLayout() {
  return (
    <div className="app-shell">
      <header className="app-header">
        <div>
          <p className="eyebrow">Biocenia</p>
          <h1>React Router listo</h1>
        </div>
        <nav className="app-nav" aria-label="Navegacion principal">
          <NavLink to="/" end>
            Inicio
          </NavLink>
          <NavLink to="/about">About</NavLink>
        </nav>
      </header>
      <main className="app-main">
        <Outlet />
      </main>
    </div>
  )
}

export default AppLayout