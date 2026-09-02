import { useEffect, useState } from 'react'
import { CalendarDays, Compass, Heart, Leaf, Menu, X } from 'lucide-react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import logo from '../../assets/logo.webp'
import { LANGUAGE_OPTIONS } from '../../data/siteContent.jsx'
import { useBiocenia } from '../../context/useBiocenia.jsx'
import './Navbar.css'

export default function Navbar() {
	const [isScrolled, setIsScrolled] = useState(false)
	const [mobileMenuRoute, setMobileMenuRoute] = useState(null)
	const { pathname } = useLocation()
	const { copy, favorites, language, setLanguage } = useBiocenia()
	const isMobileMenuOpen = mobileMenuRoute === pathname
	const navLinks = [
		{ label: copy.navbar.home, to: '/', icon: Compass },
		{ label: copy.navbar.species, to: '/species', icon: Leaf },
		{ label: copy.navbar.visit, to: '/visit', icon: CalendarDays },
	]

	const languagePicker = (
		<select
			id={isMobileMenuOpen ? 'mobile-language-picker' : 'desktop-language-picker'}
			className="language-picker"
			value={language}
			onChange={(event) => setLanguage(event.target.value)}
			aria-label={copy.navbar.languageLabel}
		>
			{LANGUAGE_OPTIONS.map((option) => (
				<option key={option.code} value={option.code}>
					{option.label}
				</option>
			))}
		</select>
	)

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

	useEffect(() => {
		const mediaQuery = window.matchMedia('(min-width: 960px)')

		const handleViewportChange = (event) => {
			if (event.matches) {
				setMobileMenuRoute(null)
			}
		}

		mediaQuery.addEventListener('change', handleViewportChange)
		return () => mediaQuery.removeEventListener('change', handleViewportChange)
	}, [])

	function renderNavLink(link, className, closeOnClick = false) {
		return (
			<NavLink
				key={link.to}
				to={link.to}
				end={link.to === '/'}
				onClick={closeOnClick ? () => setMobileMenuRoute(null) : undefined}
				className={({ isActive }) => (isActive ? `${className} is-active` : className)}
			>
				<link.icon className="nav-icon" aria-hidden="true" />
				{link.label}
			</NavLink>
		)
	}

	function toggleMobileMenu() {
		setMobileMenuRoute((currentRoute) => (currentRoute === pathname ? null : pathname))
	}

	return (
		<header className={isScrolled ? 'site-header is-scrolled' : 'site-header'}>
			<div className="site-header-inner">
				<div className="site-header-row">
					<Link
						to="/"
						className="brand-link"
						onClick={() => setMobileMenuRoute(null)}
						aria-label={copy.navbar.goHome}
					>
						<img className="brand-logo" src={logo} alt={copy.navbar.brandAlt} />
						<span className="brand-copy">
							<span className="brand-name">
								BIOCENIA<span>.</span>
							</span>
							<span className="brand-tagline">{copy.navbar.tagline}</span>
						</span>
					</Link>

					<nav className="desktop-nav" aria-label={copy.navbar.navigation}>
						{navLinks.map((link) => renderNavLink(link, 'nav-link'))}
					</nav>

					<div className="desktop-tools">
						{languagePicker}

						<div className="desktop-status" aria-label={copy.navbar.overallStatus}>
							<span className="status-chip status-chip-favorites">
								<Heart className="badge-icon" aria-hidden="true" />
								{copy.navbar.savedCount(favorites.length)}
							</span>
						</div>

						<Link to="/visit" className="cta-link">
							{copy.navbar.reserve}
						</Link>
					</div>

					<button
						type="button"
						onClick={toggleMobileMenu}
						className="mobile-toggle"
						aria-expanded={isMobileMenuOpen}
						aria-label={isMobileMenuOpen ? copy.navbar.closeMenu : copy.navbar.openMenu}
					>
						{isMobileMenuOpen ? (
							<X className="menu-icon" aria-hidden="true" />
						) : (
							<Menu className="menu-icon" aria-hidden="true" />
						)}
						<span>{isMobileMenuOpen ? copy.navbar.close : copy.navbar.menu}</span>
					</button>
				</div>
			</div>

			{isMobileMenuOpen && (
				<div id="mobile-menu" className="mobile-menu">
					<nav className="mobile-nav" aria-label={copy.navbar.navigation}>
						{navLinks.map((link) => renderNavLink(link, 'mobile-nav-link', true))}
						<div className="mobile-status">
							{languagePicker}
							<span className="status-chip status-chip-favorites">{copy.navbar.savedCount(favorites.length)}</span>
						</div>
						<Link to="/visit" onClick={() => setMobileMenuRoute(null)} className="mobile-cta-link">
							{copy.navbar.reserve}
						</Link>
					</nav>
				</div>
			)}
		</header>
	)
}
