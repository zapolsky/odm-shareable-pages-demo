import { connect } from '@owox/plugin-sdk'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { App } from './App'
import { resolveRoute } from './playbooks'
import { Status } from './Status'
import './styles.css'

const root = createRoot(document.getElementById('root')!)

root.render(<Status title='Connecting to OWOX Data Marts…' />)

connect().then(
  ctx => {
    document.documentElement.classList.toggle('dark', ctx.theme === 'dark')

    // An unknown route opens the index; the address follows so it links to what is shown.
    const initialRoute = resolveRoute(ctx.route)
    if (initialRoute !== ctx.route) ctx.ui.setRoute(initialRoute)

    root.render(
      <StrictMode>
        <App ctx={ctx} initialRoute={initialRoute} />
      </StrictMode>,
    )
  },
  (error: unknown) => {
    root.render(
      <Status
        title='Open Team Playbooks from OWOX Data Marts'
        description={error instanceof Error ? error.message : 'The plugin could not connect to OWOX Data Marts.'}
      />,
    )
  },
)
