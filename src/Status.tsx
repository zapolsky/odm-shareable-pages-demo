export function Status({ title, description }: { title: string; description?: string }) {
  return (
    <div className='tp-status' role='status'>
      <p className='tp-status-title'>{title}</p>
      {description ? <p className='tp-status-text'>{description}</p> : null}
    </div>
  )
}
