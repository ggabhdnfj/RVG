import { createClient } from '@blinkdotnew/sdk'

export const blink = createClient({
  projectId: import.meta.env.VITE_BLINK_PROJECT_ID || 'rvg-repo-launcher-zfqh9qb8',
  publishableKey: import.meta.env.VITE_BLINK_PUBLISHABLE_KEY || 'blnk_pk_XfWCa9sP63fLWQ-etDlV1knH1sgEH_Ab',
  authRequired: false,
  auth: { mode: 'managed' },
})
