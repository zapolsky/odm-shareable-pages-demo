# Team Playbooks

A demo of shareable pages in an OWOX Data Marts plugin. Each playbook has its own route, so the
browser address in OWOX Data Marts links straight to it, and the Share button asks OWOX Data Marts
to copy that link.

`vendor/` holds a build of `@owox/plugin-sdk` with `ctx.route`, `ctx.ui.setRoute` and
`ctx.ui.copyLink`; the version on npm does not have them.
