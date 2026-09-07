import { Heart, Leaf } from 'lucide-react'
import EditorialVideo from '../../components/EditorialVideo'
import InfoCard from '../../components/InfoCard'
import PageHero from '../../components/PageHero'
import heroImage from '../../assets/logo.webp'
import {
  useBioceniaCopy,
  useBioceniaFavorites,
  useBioceniaHabitat,
  useBioceniaLanguage,
  useBioceniaReservation,
} from '../../context/useBiocenia.jsx'
import { getEditorialVideos, getHabitatsOverview } from '../../data/siteContent.jsx'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion.jsx'

export default function Home() {
  const copy = useBioceniaCopy()
  const { favorites } = useBioceniaFavorites()
  const { getHabitatLabel, selectedHabitat } = useBioceniaHabitat()
  const { language } = useBioceniaLanguage()
  const { reservation } = useBioceniaReservation()
  const habitatCards = getHabitatsOverview(language)
  const { marine } = getEditorialVideos()
  const prefersReducedMotion = usePrefersReducedMotion()
  const activeHabitatLabel = selectedHabitat === 'all'
    ? copy.home.snapshot.generalTour
    : getHabitatLabel(selectedHabitat)

  const visitSnapshot = [
    {
      label: copy.home.snapshot.activeHabitat,
      value: activeHabitatLabel,
    },
    {
      label: copy.home.snapshot.savedSpecies,
      value: `${favorites.length}`,
    },
    {
      label: copy.home.snapshot.reservation,
      value: reservation ? reservation.name : copy.home.snapshot.pending,
    },
  ]

  return (
    <div className="page-stack">
      <PageHero
        eyebrow={copy.home.hero.eyebrow}
        title={copy.home.hero.title}
        description={copy.home.hero.description}
        sectionClassName="home-hero-section"
        contentClassName="home-hero-copy"
        titleClassName="home-hero-title"
        style={{ '--hero-bg-image': `url(${heroImage})` }}
        actions={[
          { label: copy.home.hero.primaryAction, to: '/species', variant: 'primary' },
          { label: copy.home.hero.secondaryAction, to: '/visit', variant: 'secondary' },
        ]}
        aside={
          <div className="hero-panel hero-panel-compact home-hero-panel">
            <p className="hero-panel-label">{copy.home.hero.summaryTitle}</p>
            <div className="hero-summary-list">
              {visitSnapshot.map((item) => (
                <div key={item.label} className="hero-summary-item">
                  <span>{item.label}</span>
                  <strong>{item.value}</strong>
                </div>
              ))}
            </div>
            <div className="hero-orbit-row" aria-label={copy.home.hero.summaryTitle}>
              <div className="hero-orbit-chip">
                <Leaf aria-hidden="true" />
                <span>{activeHabitatLabel}</span>
              </div>
              <div className="hero-orbit-chip">
                <Heart aria-hidden="true" />
                <span>{favorites.length}</span>
              </div>
            </div>
          </div>
        }
      />

      <section className="content-section editorial-video-section">
        <EditorialVideo
          sectionClassName="editorial-video-grid"
          copyClassName="editorial-video-copy"
          mediaClassName="editorial-video-shell"
          eyebrow={copy.home.editorialVideo.eyebrow}
          title={copy.home.editorialVideo.title}
          description={copy.home.editorialVideo.description}
          sourceLabel={copy.home.editorialVideo.sourceLabel}
          sourceUrl={marine.sourceUrl}
          videoUrl={marine.videoUrl}
          prefersReducedMotion={prefersReducedMotion}
        />
      </section>

      <section className="content-section home-habitats-section">
        <div className="section-heading">
          <p className="eyebrow">{copy.home.habitats.eyebrow}</p>
          <h2>{copy.home.habitats.title}</h2>
        </div>
        <div className="card-grid home-habitats-grid">
          {habitatCards.map((habitat) => (
            <InfoCard
              key={habitat.title}
              title={habitat.title}
              image={habitat.image}
              imageAlt={habitat.imageAlt}
              description={habitat.description}
              meta={habitat.meta}
            />
          ))}
        </div>
      </section>
    </div>
  )
}