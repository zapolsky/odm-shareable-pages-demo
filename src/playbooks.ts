export interface Playbook {
  route: string
  title: string
  summary: string
  steps: string[]
}

export const HOME_ROUTE = '/'

export const PLAYBOOKS: readonly Playbook[] = [
  {
    route: '/playbooks/onboarding',
    title: 'Onboarding',
    summary: "Your first week with the team's data marts.",
    steps: [
      'Ask a project admin to add you to the project, then open Data Marts to see what the team already maintains.',
      'Read the description and owner of each data mart before you build a new one; most questions already have a mart.',
      'Run one existing report into Google Sheets to see how a destination is set up.',
      'Try ideas in a data mart you own, and talk to the owner before changing a shared one.',
    ],
  },
  {
    route: '/playbooks/weekly-reporting',
    title: 'Weekly reporting',
    summary: 'How the Monday numbers reach everyone.',
    steps: [
      'Reports refresh every Monday at 07:00 from the Sessions and Orders by channel data marts.',
      'Check the run history before 09:00; a failed run shows there with its error.',
      'If a metric moves more than 20% week over week, note the reason next to it before you share.',
      'Share the Looker Studio link, not a screenshot, so everyone sees the same numbers.',
    ],
  },
  {
    route: '/playbooks/data-quality',
    title: 'Data quality',
    summary: 'Checks to run before you trust a number.',
    steps: [
      "Compare today's row count with yesterday's; a sharp drop usually means a source loaded late.",
      'Look for duplicate order IDs after every schema change in the source.',
      'Confirm the date range and time zone before comparing two reports.',
      'When a check fails, pause the reports that depend on the data mart and tell its owner.',
    ],
  },
]

export function findPlaybook(route: string): Playbook | undefined {
  return PLAYBOOKS.find(playbook => playbook.route === route)
}

/** The page to show for a route the host opened; unknown routes fall back to the index. */
export function resolveRoute(route: string): string {
  const path = route.split(/[?#]/, 1)[0].replace(/\/+$/, '') || HOME_ROUTE
  return findPlaybook(path) ? path : HOME_ROUTE
}
