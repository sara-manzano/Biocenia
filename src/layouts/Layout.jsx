import { Leaf, Mail, MapPin } from 'lucide-react'
import { Link, Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar'
import { useBiocenia } from '../context/useBiocenia.js'

function Layout() {
  const { copy, favorites, getHabitatLabel, reservation, selectedHabitat } = useBiocenia()
  const currentYear = new Date().getFullYear()
  const footerHabitat = selectedHabitat === 'all'
    ? copy.home.snapshot.generalTour
    : getHabitatLabel(selectedHabitat)
  const reservationLabel = reservation ? `${reservation.name} · ${reservation.date}` : copy.home.snapshot.pending

  return (
    <div className="site-shell">
      <Navbar />

      <main className="site-main">
        <Outlet />
      </main>

      <footer className="site-footer">
        <div className="site-footer-grid">
          <section className="site-footer-intro" aria-label={copy.footer.projectSummary}>
            <p className="eyebrow">{copy.footer.eyebrow}</p>
            <h3>{copy.footer.title}</h3>
            <p>{copy.footer.description}</p>

            <div className="site-footer-pills" aria-label={copy.home.hero.summaryTitle}>
              <span className="site-footer-pill">{footerHabitat}</span>
              <span className="site-footer-pill">{copy.navbar.savedCount(favorites.length)}</span>
            </div>
          </section>

          <section className="site-footer-panel" aria-label={copy.navbar.navigation}>
            <p className="site-footer-title">{copy.navbar.navigation}</p>
            <nav className="site-footer-links">
              <Link to="/">{copy.navbar.home}</Link>
              <Link to="/species">{copy.navbar.species}</Link>
              <Link to="/visit">{copy.navbar.visit}</Link>
            </nav>
          </section>

          <section className="site-footer-panel" aria-label={copy.home.hero.summaryTitle}>
            <p className="site-footer-title">{copy.home.hero.summaryTitle}</p>
            <div className="site-footer-stats">
              <div className="site-footer-stat">
                <span>{copy.home.snapshot.activeHabitat}</span>
                <strong>{footerHabitat}</strong>
              </div>
              <div className="site-footer-stat">
                <span>{copy.home.snapshot.reservation}</span>
                <strong>{reservationLabel}</strong>
              </div>
            </div>
          </section>

          <section className="site-footer-copy" aria-label={copy.footer.contactLabel}>
            <p className="site-footer-title">{copy.footer.contactLabel}</p>
            <p>{copy.footer.contact}</p>
          </section>
        </div>

        <div className="site-footer-base">
          <p className="site-footer-base-copy">
            <Leaf aria-hidden="true" />
            <span>© {currentYear} Biocenia</span>
          </p>

          <div className="site-footer-base-meta" aria-label={copy.footer.locationLabel}>
            <span>
              <MapPin aria-hidden="true" />
              {copy.footer.locationLabel}
            </span>
            <strong>{copy.footer.location}</strong>
          </div>

          <nav className="site-footer-base-links" aria-label={copy.footer.secondaryLinksLabel}>
            <a href={`mailto:${copy.footer.contactEmail}`}>
              <Mail aria-hidden="true" />
              <span>{copy.footer.contactEmail}</span>
            </a>
            <Link to="/species">{copy.navbar.species}</Link>
            <Link to="/visit">{copy.navbar.visit}</Link>
          </nav>
        </div>
      </footer>
    </div>
  )
}

export default Layout