import { Link } from 'react-router-dom'

function NotFoundPage() {
  return (
    <section className="content-section">
      <div className="empty-state">
        <p className="eyebrow">404</p>
        <h2>Ruta no encontrada</h2>
        <p>La URL no coincide con ninguna vista registrada en Biocenia.</p>
        <Link to="/" className="primary-link">
          Volver al inicio
        </Link>
      </div>
    </section>
  )
}

export default NotFoundPage