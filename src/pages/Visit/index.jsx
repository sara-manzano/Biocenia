import { CalendarDays, Heart, Leaf, Sparkles } from 'lucide-react'
import { useId, useMemo, useState } from 'react'
import InfoCard from '../../components/InfoCard'
import {
  useBioceniaCopy,
  useBioceniaFavorites,
  useBioceniaHabitat,
  useBioceniaLanguage,
  useBioceniaReservation,
} from '../../context/useBiocenia.jsx'
import { getHabitatsOverview, getVisitHighlights } from '../../data/siteContent.jsx'

const EMPTY_FORM = {
  name: '',
  email: '',
  visitors: '2',
  date: '',
  notes: '',
}

function getLocalDateValue(date = new Date()) {
  const timezoneOffset = date.getTimezoneOffset() * 60 * 1000
  return new Date(date.getTime() - timezoneOffset).toISOString().split('T')[0]
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

function getVisitVisuals(habitats, activeHabitatId) {
  if (!habitats.length) {
    return []
  }

  const featuredHabitat = activeHabitatId && activeHabitatId !== 'all'
    ? habitats.find((habitat) => habitat.id === activeHabitatId) ?? habitats[0]
    : habitats[0]

  const secondaryHabitat = habitats.find((habitat) => habitat.id !== featuredHabitat.id) ?? featuredHabitat

  return [featuredHabitat, secondaryHabitat]
}

function ReservationForm({ copy, minVisitDate, onSave, reservation }) {
  const [formStatus, setFormStatus] = useState('idle')
  const [formMessage, setFormMessage] = useState('')
  const [formValues, setFormValues] = useState(() => getInitialFormValues(reservation))
  const feedbackId = useId()

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

    const savedReservation = onSave(nextReservation)

    setFormStatus('success')
    setFormMessage(`${copy.visit.form.successMessage} ${savedReservation.reference}.`)
  }

  return (
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
          aria-invalid={formStatus === 'error'}
          aria-describedby={formStatus !== 'idle' ? feedbackId : undefined}
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
          aria-invalid={formStatus === 'error'}
          aria-describedby={formStatus !== 'idle' ? feedbackId : undefined}
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
            aria-invalid={formStatus === 'error'}
            aria-describedby={formStatus !== 'idle' ? feedbackId : undefined}
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
            aria-invalid={formStatus === 'error'}
            aria-describedby={formStatus !== 'idle' ? feedbackId : undefined}
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
          aria-invalid={formStatus === 'error'}
          aria-describedby={formStatus !== 'idle' ? feedbackId : undefined}
        />
      </label>

      <button type="submit" className="primary-link">
        {copy.visit.form.submit}
      </button>

      {formStatus !== 'idle' ? (
        <div
          id={feedbackId}
          role={formStatus === 'success' ? 'status' : 'alert'}
          aria-live="polite"
          className={formStatus === 'success' ? 'form-feedback is-success' : 'form-feedback is-error'}
        >
          {formMessage}
        </div>
      ) : null}
    </form>
  )
}

function SummaryItem({ label, value }) {
  return (
    <div className="summary-item">
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  )
}

export default function VisitPage() {
  const copy = useBioceniaCopy()
  const { favorites } = useBioceniaFavorites()
  const { getHabitatLabel, selectedHabitat } = useBioceniaHabitat()
  const { language } = useBioceniaLanguage()
  const { reservation, saveReservation } = useBioceniaReservation()
  const highlights = getVisitHighlights(language)
  const habitats = getHabitatsOverview(language)
  const minVisitDate = useMemo(() => getLocalDateValue(), [])
  const reservationHabitatLabel = getHabitatLabel(reservation?.habitatId ?? selectedHabitat)
  const visitVisuals = useMemo(
    () => getVisitVisuals(habitats, reservation?.habitatId ?? selectedHabitat),
    [habitats, reservation?.habitatId, selectedHabitat],
  )
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
  const reservationSummaryItems = [
    { label: copy.visit.aside.activeRoute, value: reservationHabitatLabel },
    { label: copy.visit.aside.savedSpecies, value: favorites.length },
    { label: copy.visit.aside.reservationName, value: reservation ? reservation.name : copy.visit.aside.none },
    ...(reservation
      ? [
          { label: copy.visit.aside.reference, value: reservation.reference },
          { label: copy.visit.aside.date, value: reservation.date },
          { label: copy.visit.aside.visitors, value: reservation.visitors },
        ]
      : []),
  ]

  function handleSaveReservation(nextReservation) {
    const savedReservation = {
      ...nextReservation,
      habitatId: selectedHabitat,
      reference: buildReservationReference(nextReservation.name),
      createdAt: new Date().toISOString(),
    }

    saveReservation(savedReservation)
    return savedReservation
  }

  const reservationFormKey = reservation?.reference ?? reservation?.createdAt ?? 'new-reservation'

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

          <ReservationForm
            key={reservationFormKey}
            copy={copy}
            minVisitDate={minVisitDate}
            onSave={handleSaveReservation}
            reservation={reservation}
          />
        </div>

        <aside className="reservation-panel reservation-panel-summary">
          <h3>{copy.visit.aside.title}</h3>
          <div className="summary-list">
            {reservationSummaryItems.map((item) => (
              <SummaryItem key={item.label} label={item.label} value={item.value} />
            ))}
          </div>
          {reservationTimestamp ? <p className="inline-note">{copy.visit.aside.updatedAt(reservationTimestamp)}</p> : null}
          <p className="inline-note">{copy.visit.aside.note}</p>
        </aside>
      </section>

      {visitVisuals.length ? (
        <section className="content-section visit-visual-section" aria-label={copy.visit.aside.title}>
          <div className="visit-visual-grid">
            {visitVisuals.map((visual, index) => (
              <article
                key={`${visual.id}-${index}`}
                className={`visit-visual-card${index === 0 ? ' is-featured' : ''}`}
              >
                <img
                  className="visit-visual-image"
                  src={visual.image}
                  alt={visual.imageAlt}
                  loading="lazy"
                />
                <div className="visit-visual-copy">
                  <p className="eyebrow">{index === 0 ? reservationHabitatLabel : visual.title}</p>
                  <h3>{visual.title}</h3>
                  <p>{visual.description}</p>
                  <span>{visual.meta}</span>
                </div>
              </article>
            ))}
          </div>
        </section>
      ) : null}

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