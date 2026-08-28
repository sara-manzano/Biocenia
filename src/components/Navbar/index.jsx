import { useEffect, useState } from 'react'
import { CalendarDays, Compass, Heart, Leaf, Menu, X } from 'lucide-react'
import { Link, NavLink } from 'react-router-dom'
import logo from '../../assets/logo.jpeg'
import { useBiocenia } from '../../context/useBiocenia.js'
import './Navbar.css'

const NAV_LINKS = [
	{ label: 'Inicio', to: '/', icon: Compass },
	{ label: 'Especies', to: '/species', icon: Leaf },
	{ label: 'Visita', to: '/visit', icon: CalendarDays },
]

export default function Navbar() {
	const [isScrolled, setIsScrolled] = useState(false)
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
	const { favorites } = useBiocenia()

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
						aria-label="Biocenia - Ir a la página principal"
					>
						<img className="brand-logo" src={logo} alt="Logo Biocenia" />
						<span className="brand-copy">
							<span className="brand-name">
								BIOCENIA<span>.</span>
							</span>
							<span className="brand-tagline">Reserva digital y planificador de visita</span>
						</span>
					</Link>

					<nav className="desktop-nav" aria-label="Navegación principal">
						{NAV_LINKS.map((link) => (
							<NavLink
								key={link.to}
								to={link.to}
								end={link.to === '/'}
								className={({ isActive }) => (isActive ? 'nav-link is-active' : 'nav-link')}
							>
								<link.icon className="nav-icon" aria-hidden="true" />
								{link.label}
							</NavLink>
						))}
					</nav>

					<div className="desktop-tools">
						<div className="desktop-status" aria-label="Estado general">
							<span className="status-chip status-chip-favorites">
								<Heart className="badge-icon" aria-hidden="true" />
								{favorites.length} guardadas
							</span>
						</div>

						<Link to="/visit" className="cta-link">
							Reservar
						</Link>
					</div>

					<button
						type="button"
						onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
						className="mobile-toggle"
						aria-expanded={isMobileMenuOpen}
						aria-label={isMobileMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
					>
						{isMobileMenuOpen ? (
							<X className="menu-icon" aria-hidden="true" />
						) : (
							<Menu className="menu-icon" aria-hidden="true" />
						)}
						<span>{isMobileMenuOpen ? 'Cerrar' : 'Menú'}</span>
					</button>
				</div>
			</div>

			{isMobileMenuOpen && (
				<div id="mobile-menu" className="mobile-menu">
					<nav className="mobile-nav">
						{NAV_LINKS.map((link) => (
							<NavLink
								key={link.to}
								to={link.to}
								end={link.to === '/'}
								onClick={() => setIsMobileMenuOpen(false)}
								className={({ isActive }) =>
									isActive ? 'mobile-nav-link is-active' : 'mobile-nav-link'
								}
							>
								<link.icon className="nav-icon" aria-hidden="true" />
								{link.label}
							</NavLink>
						))}
						<div className="mobile-status">
							<span className="status-chip status-chip-favorites">{favorites.length} guardadas</span>
						</div>
						<Link to="/visit" onClick={() => setIsMobileMenuOpen(false)} className="mobile-cta-link">
							Reservar
						</Link>
					</nav>
				</div>
			)}
		</header>
	)
}
