import { Link } from 'react-router-dom'
import { useBiocenia } from '../context/useBiocenia.jsx'

function NotFoundPage() {
  const { copy } = useBiocenia()

  return (
    <section className="content-section">
      <div className="empty-state">
        <p className="eyebrow">404</p>
        <h2>{copy.notFound.title}</h2>
        <p>{copy.notFound.description}</p>
        <Link to="/" className="primary-link">
          {copy.notFound.action}
        </Link>
      </div>
    </section>
  )
}

export default NotFoundPage