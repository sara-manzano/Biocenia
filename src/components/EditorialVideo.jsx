export default function EditorialVideo({
  sectionClassName,
  copyClassName,
  mediaClassName,
  eyebrow,
  title,
  titleTag = 'h2',
  description,
  sourceLabel,
  sourceUrl,
  videoUrl,
  prefersReducedMotion,
}) {
  const TitleTag = titleTag

  return (
    <div className={sectionClassName}>
      <div className={copyClassName}>
        <p className="eyebrow">{eyebrow}</p>
        <TitleTag>{title}</TitleTag>
        <p>{description}</p>
        <a href={sourceUrl} target="_blank" rel="noreferrer" className="source-link">
          {sourceLabel}
        </a>
      </div>

      <div className={mediaClassName}>
        <video
          className="editorial-video-player"
          src={videoUrl}
          aria-label={title}
          autoPlay={!prefersReducedMotion}
          controls={prefersReducedMotion}
          loop
          muted
          playsInline
          preload="auto"
        />
      </div>
    </div>
  )
}
