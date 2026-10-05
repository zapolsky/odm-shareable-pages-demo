import type { PluginContext } from '@owox/plugin-sdk'
import { BookOpen, ChevronRight, Link2 } from 'lucide-react'
import { useState, type ReactNode } from 'react'
import { Button } from './components/ui/button'
import { findPlaybook, HOME_ROUTE, PLAYBOOKS, type Playbook } from './playbooks'

interface AppProps {
  ctx: PluginContext
  initialRoute: string
}

export function App({ ctx, initialRoute }: AppProps) {
  const [route, setRoute] = useState(initialRoute)
  // An older host rejects copyLink; the button then goes away rather than failing again.
  const [canShare, setCanShare] = useState(true)

  const open = (next: string) => {
    if (next === route) return
    setRoute(next)
    ctx.ui.setRoute(next)
  }

  const share = () => {
    ctx.ui.copyLink().catch(() => setCanShare(false))
  }

  const playbook = findPlaybook(route)
  const shareButton = canShare ? (
    <Button onClick={share} title='Copy a link to this page'>
      <Link2 aria-hidden size={16} />
      Share
    </Button>
  ) : null

  return (
    <div className='tp-shell'>
      <aside className='tp-sidebar'>
        <button
          type='button'
          className='tp-brand'
          aria-current={route === HOME_ROUTE ? 'page' : undefined}
          onClick={() => open(HOME_ROUTE)}
        >
          <BookOpen aria-hidden size={18} />
          Team Playbooks
        </button>
        <nav aria-label='Playbooks'>
          <ul className='tp-nav'>
            {PLAYBOOKS.map(item => (
              <li key={item.route}>
                <button
                  type='button'
                  className='tp-nav-item'
                  aria-current={item.route === route ? 'page' : undefined}
                  onClick={() => open(item.route)}
                >
                  {item.title}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
      <main className='tp-main'>
        {playbook ? (
          <PlaybookPage playbook={playbook} action={shareButton} />
        ) : (
          <IndexPage onOpen={open} action={shareButton} />
        )}
      </main>
    </div>
  )
}

function PageHeader({ title, lead, action }: { title: string; lead: string; action: ReactNode }) {
  return (
    <header className='tp-header'>
      <div>
        <h1 className='tp-title'>{title}</h1>
        <p className='tp-lead'>{lead}</p>
      </div>
      {action}
    </header>
  )
}

function PlaybookPage({ playbook, action }: { playbook: Playbook; action: ReactNode }) {
  return (
    <article>
      <PageHeader title={playbook.title} lead={playbook.summary} action={action} />
      <section className='tp-card'>
        <ul className='tp-points'>
          {playbook.steps.map(step => (
            <li key={step}>{step}</li>
          ))}
        </ul>
      </section>
    </article>
  )
}

function IndexPage({ onOpen, action }: { onOpen: (route: string) => void; action: ReactNode }) {
  return (
    <article>
      <PageHeader title='Team Playbooks' lead='Short how-to pages your team can link to.' action={action} />
      <ul className='tp-index'>
        {PLAYBOOKS.map(item => (
          <li key={item.route}>
            <button type='button' className='tp-index-item' onClick={() => onOpen(item.route)}>
              <span>
                <span className='tp-index-title'>{item.title}</span>
                <span className='tp-index-summary'>{item.summary}</span>
              </span>
              <ChevronRight aria-hidden size={18} />
            </button>
          </li>
        ))}
      </ul>
    </article>
  )
}
