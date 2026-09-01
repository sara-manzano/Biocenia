import { Heart, Leaf } from 'lucide-react'
import InfoCard from '../../components/InfoCard'
import PageHero from '../../components/PageHero'
import heroImage from '../../assets/logo.jpeg'
import { useBiocenia } from '../../context/useBiocenia.js'
import { getHabitatsOverview } from '../../data/siteContent.js'

export default function Home() {
  const { copy, favorites, getHabitatLabel, language, reservation, selectedHabitat } = useBiocenia()
  const habitatCards = getHabitatsOverview(language)

  const visitSnapshot = [
    {
      label: copy.home.snapshot.activeHabitat,
      value: selectedHabitat === 'all' ? copy.home.snapshot.generalTour : getHabitatLabel(selectedHabitat),
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
                <span>{selectedHabitat === 'all' ? copy.home.snapshot.generalTour : getHabitatLabel(selectedHabitat)}</span>
              </div>
              <div className="hero-orbit-chip">
                <Heart aria-hidden="true" />
                <span>{favorites.length}</span>
              </div>
            </div>
          </div>
        }
      />

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