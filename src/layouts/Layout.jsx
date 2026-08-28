import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar'

function Layout() {
  return (
    <div className="site-shell">
      <Navbar />

      <main className="site-main">
        <Outlet />
      </main>

      <footer className="site-footer">
        <section className="site-footer-intro" aria-label="Resumen del proyecto">
          <p className="eyebrow">Biocenia</p>
          <h3>Explora la reserva, conoce especies y planifica tu visita</h3>
          <p>
            Biocenia es un proyecto de divulgación científica y educación ambiental que busca acercar la biodiversidad a la ciudadanía.
          </p>
        </section>

        <section className="site-footer-copy" aria-label="Información de contacto">
          <p>Abierto todos los días de 9:00 a 20:30. Contacto: visitas@biocenia.eco</p>
        </section>
      </footer>
    </div>
  )
}

export default Layout