import Navbar from '../../components/Navbar'
import './Home.css'

const habitats = [
  {
    title: 'Bosque Templado',
    description: 'Ecosistemas con alta biodiversidad y especies endémicas.',
  },
  {
    title: 'Bosque Africano',
    description: 'Ecosistemas con grandes herbívoros y depredadores característicos de África.',
  },
  {
    title: 'Sabana',
    description: 'Ecosistemas donde conviven grandes herbívoros y depredadores.',
  },

  {
    title: 'Australia',
    description: 'Ecosistemas con especies únicas y adaptaciones especiales a su entorno.',
  },

  {
    title: 'Jungla',
    description: 'Ecosistemas densos y húmedos con alta biodiversidad y especies endémicas.',
  },

  {
    title: 'Polo Sur',
    description: 'Ecosistemas fríos y extremos, hogar de especies adaptadas a condiciones severas.',
  },

  {
    title: 'Arrecife coralino',
    description: 'Comunidades marinas frágiles que dependen de aguas limpias y estables.',
  },

  {
    title: 'Reptiliario y anfibios',
    description: 'Espacios dedicados a reptiles y anfibios, mostrando su diversidad y adaptaciones.',
  },

]

const species = [
  'Jaguar',
  'Tortuga carey',
  'Rana de cristal',
  'Guacamaya roja',
]

export default function Home() {
  return (
    <div className="home-page">
      <Navbar />
      <main>
        <section className="hero-section">
          <p className="eyebrow">Reserva virtual</p>
          <h1>Biocenia muestra especies, hábitats y acciones de conservación</h1>
          <p className="hero-copy">
            TODO
          </p>
          <div className="hero-actions">
            <a className="primary-link" href="#especies">
              Ver especies
            </a>
            <a className="secondary-link" href="#conservacion">
              Plan de conservación
            </a>
          </div>
        </section>

        <section id="especies" className="content-section">
          <div className="section-heading">
            <p className="eyebrow">Especies destacadas</p>
            <h2>Fauna prioritaria de seguimiento</h2>
          </div>
          <div className="pill-list">
            {species.map((name) => (
              <span key={name} className="pill">
                {name}
              </span>
            ))}
          </div>
        </section>

        <section id="habitats" className="content-section">
          <div className="section-heading">
            <p className="eyebrow">Habitats</p>
            <h2>Diversidad de hábitats</h2>
          </div>
          <div className="card-grid">
            {habitats.map((habitat) => (
              <article key={habitat.title} className="info-card">
                <h3>{habitat.title}</h3>
                <p>{habitat.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="conservacion" className="content-section conservation-callout">
          <div className="section-heading">
            <p className="eyebrow">Conservacion</p>
            <h2>Acciones visibles mientras completas el resto del sitio</h2>
          </div>
          <p>
            TODO...
          </p>
        </section>

        <section id="entradas" className="content-section footer-section">
          <div className="section-heading">
            <p className="eyebrow">Entradas</p>
            <h2>Reserva tu visita Biocenia</h2>
          </div>
          <p>TODO...</p>
        </section>

        <section id="visitanos" className="content-section footer-section">
          <div className="footer-top">
            <div className="footer-intro">
              <p className="eyebrow">Visitanos</p>
              <h2>Planifica tu recorrido</h2>
              <p>
                Explora especies, habitats y acciones de conservación en un entorno inmersivo y educativo.
              </p>
            </div>

            <div className="footer-grid">
              <div className="footer-card">
                <h3>Horarios</h3>
                <p>Lunes a domingo</p>
                <p>9:00 a 20:00</p>
                <p>Último acceso a las 17:00</p>
              </div>

              <div className="footer-card">
                <h3>Contacto</h3>
                <p>visitas@biocenia.eco</p>
                <p>+34 915 010 203</p>
                <p>Atención para reservas y grupos escolares</p>
              </div>

              <div className="footer-card">
                <h3>Ubicación</h3>
                <p>Avenida Bosque 18</p>
                <p>Distrito Verde</p>
                <p>Acceso por transporte público y estacionamiento general</p>
              </div>
            </div>
          </div>

          <div className="footer-bottom">
            <p>Biocenia combina conservación, divulgación científica y experiencias inmersivas.</p>
            <div className="footer-links">
              <a href="#especies">Especies</a>
              <a href="#habitats">Habitats</a>
              <a href="#conservacion">Conservación</a>
              <a href="#entradas">Entradas</a>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}