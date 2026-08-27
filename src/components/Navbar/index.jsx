import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ChevronRight, Leaf, Menu, X } from 'lucide-react'
import logo from '../../assets/logo.jpeg'
import './Navbar.css'

const NAV_LINKS = [
  { label: 'Especies', href: '#especies' },
  { label: 'Habitats', href: '#habitats' },
  { label: 'Conservacion', href: '#conservacion' },
  { label: 'Visitanos', href: '#visitanos' },
]

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : 'unset'

    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isMobileMenuOpen])

  return (
    <header className={isScrolled ? 'site-header is-scrolled' : 'site-header'}>
      <div className="site-header-inner">
        <div className="site-header-row">
          <Link
            to="/"
            className="brand-link"
            aria-label="Biocenia - Ir a la pagina principal"
          >
            <img className="brand-logo" src={logo} alt="Logo Biocenia" />
            <span className="brand-name">
              BIOCENIA<span>.</span>
            </span>
          </Link>

          <nav className="desktop-nav" aria-label="Navegacion principal">
            {NAV_LINKS.map((link) => (
              <a key={link.href} href={link.href} className="nav-link">
                <Leaf className="nav-icon" aria-hidden="true" />
                {link.label}
              </a>
            ))}
          </nav>

          <div className="desktop-cta">
            <a href="#entradas" className="cta-link">
              Comprar Entradas
              <ChevronRight className="cta-icon" aria-hidden="true" />
            </a>
          </div>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="mobile-toggle"
            aria-expanded={isMobileMenuOpen}
            aria-label={isMobileMenuOpen ? 'Cerrar menu' : 'Abrir menu'}
          >
            {isMobileMenuOpen ? (
              <X className="menu-icon" aria-hidden="true" />
            ) : (
              <Menu className="menu-icon" aria-hidden="true" />
            )}
            <span>{isMobileMenuOpen ? 'Cerrar' : 'Menu'}</span>
          </button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div id="mobile-menu" className="mobile-menu">
          <nav className="mobile-nav">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="mobile-nav-link"
              >
                <Leaf className="nav-icon" aria-hidden="true" />
                {link.label}
              </a>
            ))}
            <a
              href="#entradas"
              onClick={() => setIsMobileMenuOpen(false)}
              className="mobile-cta-link"
            >
              Comprar Entradas
              <ChevronRight className="cta-icon" aria-hidden="true" />
            </a>
          </nav>
        </div>
      )}
    </header>
  )
}