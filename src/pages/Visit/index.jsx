import { CalendarDays, Heart, Leaf, Sparkles } from 'lucide-react'
import { useMemo, useState } from 'react'
import InfoCard from '../../components/InfoCard'
import { useBiocenia } from '../../context/useBiocenia.js'
import { getVisitHighlights } from '../../data/siteContent.js'

const EMPTY_FORM = {
  name: '',
  email: '',
  visitors: '2',
  date: '',
  notes: '',
}

function getInitialFormValues(reservation) {
  if (!reservation) {
    return EMPTY_FORM
  }

  return {
    name: reservation.name ?? '',
    email: reservation.email ?? '',
    visitors: reservation.visitors ?? '2',
    date: reservation.date ?? '',
    notes: reservation.notes ?? '',
  }
}

function buildReservationReference(name) {
  const normalizedName = name
    .trim()
    .toUpperCase()
    .replace(/[^A-Z0-9]+/g, '')
    .slice(0, 3)

  const suffix = Math.random().toString(36).slice(2, 6).toUpperCase()
  return `BIO-${normalizedName || 'VIS'}-${suffix}`
}

export default function VisitPage() {
  const { copy, favorites, getHabitatLabel, language, reservation, saveReservation, selectedHabitat } = useBiocenia()
  const [formStatus, setFormStatus] = useState('idle')
  const [formMessage, setFormMessage] = useState('')
  const [formValues, setFormValues] = useState(() => getInitialFormValues(reservation))
  const highlights = getVisitHighlights(language)
  const minVisitDate = useMemo(() => new Date().toISOString().split('T')[0], [])
  const reservationHabitatLabel = getHabitatLabel(reservation?.habitatId ?? selectedHabitat)
  const reservationTimestamp = reservation?.createdAt
    ? new Intl.DateTimeFormat(language, {
        dateStyle: 'medium',
        timeStyle: 'short',
      }).format(new Date(reservation.createdAt))
    : ''
  const visitSnapshot = [
    {
      label: copy.visit.aside.activeRoute,
      value: reservationHabitatLabel,
      icon: Leaf,
    },
    {
      label: copy.visit.aside.savedSpecies,
      value: favorites.length,
      icon: Heart,
    },
    {
      label: copy.visit.aside.date,
      value: reservation?.date || copy.visit.aside.none,
      icon: CalendarDays,
    },
  ]

  function handleChange(event) {
    const { name, value } = event.target

    setFormValues((currentValues) => ({
      ...currentValues,
      [name]: value,
    }))

    if (formStatus !== 'idle') {
      setFormStatus('idle')
      setFormMessage('')
    }
  }

  function validateReservation(nextReservation) {
    if (nextReservation.name.trim().length < 2) {
      return copy.visit.form.validationName
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(nextReservation.email)) {
      return copy.visit.form.validationEmail
    }

    const visitors = Number(nextReservation.visitors)

    if (!Number.isInteger(visitors) || visitors < 1 || visitors > 25) {
      return copy.visit.form.validationVisitors
    }

    if (!nextReservation.date) {
      return copy.visit.form.validationError
    }

    if (nextReservation.date < minVisitDate) {
      return copy.visit.form.validationDate
    }

    return ''
  }

  function handleSubmit(event) {
    event.preventDefault()

    const nextReservation = {
      name: formValues.name.trim(),
      email: formValues.email.trim(),
      visitors: formValues.visitors,
      date: formValues.date,
      notes: formValues.notes.trim(),
    }

    const validationMessage = validateReservation(nextReservation)

    if (validationMessage) {
      setFormStatus('error')
      setFormMessage(validationMessage)
      return
    }

    const savedReservation = {
      ...nextReservation,
      habitatId: selectedHabitat,
      reference: buildReservationReference(nextReservation.name),
      createdAt: new Date().toISOString(),
    }

    saveReservation(savedReservation)
    setFormStatus('success')
    setFormMessage(`${copy.visit.form.successMessage} ${savedReservation.reference}.`)
    setFormValues({ ...EMPTY_FORM })
  }

  return (
    <div className="page-stack">
      <section className="content-section visit-hero-shell">
        <div className="visit-hero-card">
          <div className="page-caption visit-page-caption">
            <p className="eyebrow">{copy.visit.eyebrow}</p>
            <h2>{copy.visit.title}</h2>
            <p>{copy.visit.description}</p>

            <div className="visit-hero-badges" aria-label={copy.visit.aside.title}>
              {visitSnapshot.map((item) => (
                <div key={item.label} className="visit-badge-card">
                  <span className="visit-badge-icon">
                    <item.icon aria-hidden="true" />
                  </span>
                  <span>
                    <strong>{item.value}</strong>
                    <small>{item.label}</small>
                  </span>
                </div>
              ))}
            </div>
          </div>

          <aside className="visit-hero-aside" aria-label={copy.visit.aside.title}>
            <div className="visit-hero-aside-top">
              <span className="visit-kicker">
                <Sparkles aria-hidden="true" />
                {copy.visit.aside.title}
              </span>
              <strong>{reservation ? reservation.reference : copy.visit.aside.none}</strong>
            </div>
            <p>{copy.visit.aside.note}</p>
            {reservationTimestamp ? <p className="inline-note">{copy.visit.aside.updatedAt(reservationTimestamp)}</p> : null}
          </aside>
        </div>
      </section>

      <section className="content-section reservation-layout">
        <div className="reservation-panel reservation-panel-form">
          <div className="panel-heading">
            <p className="eyebrow">{copy.visit.form.submit}</p>
            <h3>{copy.visit.title}</h3>
            <p>{copy.visit.description}</p>
          </div>

          <form className="reservation-form" onSubmit={handleSubmit} noValidate>
            <label className="field-label" htmlFor="visitor-name">
              {copy.visit.form.responsibleName}
              <input
                id="visitor-name"
                name="name"
                className="field"
                type="text"
                value={formValues.name}
                onChange={handleChange}
                placeholder={copy.visit.form.namePlaceholder}
                autoComplete="name"
              />
            </label>

            <label className="field-label" htmlFor="visitor-email">
              {copy.visit.form.contactEmail}
              <input
                id="visitor-email"
                name="email"
                className="field"
                type="email"
                value={formValues.email}
                onChange={handleChange}
                placeholder={copy.visit.form.emailPlaceholder}
                autoComplete="email"
              />
            </label>

            <div className="filters-row">
              <label className="field-label" htmlFor="visitor-count">
                {copy.visit.form.visitorCount}
                <input
                  id="visitor-count"
                  name="visitors"
                  className="field"
                  type="number"
                  min="1"
                  max="25"
                  value={formValues.visitors}
                  onChange={handleChange}
                />
              </label>

              <label className="field-label" htmlFor="visit-date">
                {copy.visit.form.suggestedDate}
                <input
                  id="visit-date"
                  name="date"
                  className="field"
                  type="date"
                  min={minVisitDate}
                  value={formValues.date}
                  onChange={handleChange}
                />
              </label>
            </div>

            <label className="field-label" htmlFor="visit-notes">
              {copy.visit.form.visitIntent}
              <textarea
                id="visit-notes"
                name="notes"
                className="field-textarea"
                value={formValues.notes}
                onChange={handleChange}
                placeholder={copy.visit.form.notesPlaceholder}
              />
            </label>

            <button type="submit" className="primary-link">
              {copy.visit.form.submit}
            </button>

            {formStatus !== 'idle' ? (
              <div className={formStatus === 'success' ? 'form-feedback is-success' : 'form-feedback is-error'}>
                {formMessage}
              </div>
            ) : null}
          </form>
        </div>

        <aside className="reservation-panel reservation-panel-summary">
          <h3>{copy.visit.aside.title}</h3>
          <div className="summary-list">
            <div className="summary-item">
              <span>{copy.visit.aside.activeRoute}</span>
              <strong>{reservationHabitatLabel}</strong>
            </div>
            <div className="summary-item">
              <span>{copy.visit.aside.savedSpecies}</span>
              <strong>{favorites.length}</strong>
            </div>
            <div className="summary-item">
              <span>{copy.visit.aside.reservationName}</span>
              <strong>{reservation ? reservation.name : copy.visit.aside.none}</strong>
            </div>
            {reservation ? (
              <>
                <div className="summary-item">
                  <span>{copy.visit.aside.reference}</span>
                  <strong>{reservation.reference}</strong>
                </div>
                <div className="summary-item">
                  <span>{copy.visit.aside.date}</span>
                  <strong>{reservation.date}</strong>
                </div>
                <div className="summary-item">
                  <span>{copy.visit.aside.visitors}</span>
                  <strong>{reservation.visitors}</strong>
                </div>
              </>
            ) : null}
          </div>
          {reservationTimestamp ? <p className="inline-note">{copy.visit.aside.updatedAt(reservationTimestamp)}</p> : null}
          <p className="inline-note">{copy.visit.aside.note}</p>
        </aside>
      </section>

      <section className="content-section visit-highlights-section">
        <div className="section-heading visit-highlights-heading">
          <p className="eyebrow">{copy.visit.eyebrow}</p>
          <h2>{copy.visit.aside.title}</h2>
        </div>
        <div className="card-grid visit-highlights-grid">
          {highlights.map((item) => (
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