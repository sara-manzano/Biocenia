import { useRef, useState } from 'react'
import InfoCard from '../../components/InfoCard'
import { useBiocenia } from '../../context/useBiocenia.js'
import { visitHighlights } from '../../data/siteContent.js'

export default function VisitPage() {
  const nameRef = useRef(null)
  const emailRef = useRef(null)
  const visitorsRef = useRef(null)
  const dateRef = useRef(null)
  const notesRef = useRef(null)
  const [formStatus, setFormStatus] = useState('idle')
  const [formMessage, setFormMessage] = useState('')
  const { favorites, reservation, saveReservation, selectedHabitat } = useBiocenia()

  function handleSubmit(event) {
    event.preventDefault()

    const nextReservation = {
      name: nameRef.current?.value.trim() ?? '',
      email: emailRef.current?.value.trim() ?? '',
      visitors: visitorsRef.current?.value ?? '1',
      date: dateRef.current?.value ?? '',
      notes: notesRef.current?.value.trim() ?? '',
    }

    if (!nextReservation.name || !nextReservation.email || !nextReservation.date) {
      setFormStatus('error')
      setFormMessage('Completa nombre, correo y fecha para guardar la reserva.')
      return
    }

    saveReservation(nextReservation)
    setFormStatus('success')
    setFormMessage('Reserva guardada. La información queda disponible en toda la aplicación.')
    event.currentTarget.reset()
  }

  return (
    <div className="page-stack">
      <section className="content-section">
        <div className="page-caption">
          <p className="eyebrow">Visita</p>
          <h2>Cierra una visita con criterio, no con un formulario de compromiso</h2>
          <p>
            La idea es simple: dejar una fecha, un grupo y una intención clara para que el recorrido no nazca vacío.
          </p>
        </div>
      </section>

      <section className="content-section reservation-layout">
        <div className="reservation-panel">
          <form className="reservation-form" onSubmit={handleSubmit}>
            <label className="field-label" htmlFor="visitor-name">
              Nombre responsable
              <input id="visitor-name" ref={nameRef} className="field" type="text" placeholder="Ana Ruiz" />
            </label>

            <label className="field-label" htmlFor="visitor-email">
              Correo de contacto
              <input
                id="visitor-email"
                ref={emailRef}
                className="field"
                type="email"
                placeholder="ana@correo.com"
              />
            </label>

            <div className="filters-row">
              <label className="field-label" htmlFor="visitor-count">
                Número de visitantes
                <input id="visitor-count" ref={visitorsRef} className="field" type="number" min="1" max="25" defaultValue="2" />
              </label>

              <label className="field-label" htmlFor="visit-date">
                Fecha sugerida
                <input id="visit-date" ref={dateRef} className="field" type="date" />
              </label>
            </div>

            <label className="field-label" htmlFor="visit-notes">
              Intención de la visita
              <textarea
                id="visit-notes"
                ref={notesRef}
                className="field-textarea"
                placeholder="Recorrido corto con foco en especies costeras, descanso a mitad de camino y accesibilidad"
              />
            </label>

            <button type="submit" className="primary-link">
              Guardar reserva
            </button>

            {formStatus !== 'idle' ? (
              <div className={formStatus === 'success' ? 'form-feedback is-success' : 'form-feedback is-error'}>
                {formMessage}
              </div>
            ) : null}
          </form>
        </div>

        <aside className="reservation-panel">
          <h3>Antes de confirmar</h3>
          <div className="summary-list">
            <div className="summary-item">
              <span>Ruta activa</span>
              <strong>{selectedHabitat}</strong>
            </div>
            <div className="summary-item">
              <span>Especies apartadas</span>
              <strong>{favorites.length}</strong>
            </div>
            <div className="summary-item">
              <span>Nombre de reserva</span>
              <strong>{reservation ? reservation.name : 'Ninguna'}</strong>
            </div>
          </div>
          <p className="inline-note">
            Si ya marcaste especies en el catálogo, este panel evita que la reserva quede desconectada de lo que realmente quieres ver.
          </p>
        </aside>
      </section>

      <section className="content-section">
        <div className="card-grid">
          {visitHighlights.map((item) => (
            <InfoCard
              key={item.title}
              title={item.title}
              description={item.description}
              meta={item.meta}
            />
          ))}
        </div>
      </section>
    </div>
  )
}