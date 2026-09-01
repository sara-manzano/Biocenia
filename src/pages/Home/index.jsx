import InfoCard from '../../components/InfoCard'
import PageHero from '../../components/PageHero'
import heroImage from '../../assets/logo.jpeg'
import { useBiocenia } from '../../context/useBiocenia.js'
import { habitatsOverview, impactMetrics } from '../../data/siteContent.js'

export default function Home() {
  const { favorites, reservation, selectedHabitat } = useBiocenia()

  const visitSnapshot = [
    {
      label: 'Hábitat activo',
      value: selectedHabitat === 'Todos' ? 'Recorrido general' : selectedHabitat,
    },
    {
      label: 'Especies guardadas',
      value: `${favorites.length}`,
    },
    {
      label: 'Reserva',
      value: reservation ? reservation.name : 'Pendiente',
    },
  ]

  const planningCards = [
    {
      title: 'Ruta preparada',
      description:
        selectedHabitat === 'Todos' ? 'Todavía no fijaste un hábitat dominante.' : selectedHabitat,
      meta: 'Puedes ajustar el filtro antes de reservar.',
    },
    {
      title: 'Reserva en curso',
      description: reservation ? `${reservation.name} para ${reservation.visitors} personas.` : 'Sin fecha confirmada.',
      meta: reservation ? `Fecha propuesta: ${reservation.date}.` : 'Completa la visita cuando tengas el grupo definido.',
    },
  ]

  return (
    <div className="page-stack">
      <PageHero
        eyebrow="Biocenia"
        title="Explora nuestros hábitats, conoce especies y planifica tu visita"
        description="Biocenia concentra hábitats, especies y reserva. La idea es simple: dejar una fecha, un grupo y una intención clara para que el recorrido sea más provechoso."
        sectionClassName="home-hero-section"
        contentClassName="home-hero-copy"
        titleClassName="home-hero-title"
        style={{ '--hero-bg-image': `url(${heroImage})` }}
        actions={[
          { label: 'Explorar especies', to: '/species', variant: 'primary' },
          { label: 'Reservar visita', to: '/visit', variant: 'secondary' },
        ]}
        aside={
          <div className="hero-panel hero-panel-compact">
            <p className="hero-panel-label">Resumen</p>
            <div className="hero-summary-list">
              {visitSnapshot.map((item) => (
                <div key={item.label} className="hero-summary-item">
                  <span>{item.label}</span>
                  <strong>{item.value}</strong>
                </div>
              ))}
            </div>
          </div>
        }
      />

      <section className="content-section home-overview-section">
        <div className="section-heading">
          <p className="eyebrow">Reserva</p>
          <h2>Decidir por dónde empezar</h2>
        </div>
        <div className="home-overview-grid">
          <div className="metric-grid">
            {impactMetrics.map((metric) => (
              <InfoCard
                key={metric.title}
                title={metric.title}
                description={metric.value}
                meta={metric.detail}
                tone="accent"
              />
            ))}
          </div>

          <div className="detail-grid">
            {planningCards.map((card) => (
              <InfoCard
                key={card.title}
                title={card.title}
                description={card.description}
                meta={card.meta}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="content-section">
        <div className="section-heading">
          <p className="eyebrow">Habitats</p>
          <h2>Zonas para orientar el recorrido</h2>
        </div>
        <div className="card-grid">
          {habitatsOverview.map((habitat) => (
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