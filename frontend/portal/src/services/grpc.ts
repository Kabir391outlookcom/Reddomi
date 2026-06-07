import { browserTokenStore, browserOrganizationStore } from '@doota/ui-core/provider/BrowserStores'
import { createClients } from '@doota/client'

const getCodespacesApiUrl = () => {
  if (typeof window === 'undefined') {
    return undefined
  }

  const host = window.location.host
  const protocol = window.location.protocol

  if (host.endsWith('.app.github.dev')) {
    const match = host.match(/^(.*)-(\d+)\.app\.github\.dev$/)
    if (match) {
      const prefix = match[1]
      return `https://${prefix}-8787.app.github.dev`
    }
  }

  return `${protocol}//127.0.0.1:8787`
}

const apiEndpointUrl = getCodespacesApiUrl() || process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8787'

export const API_ENDPOINT_URL = apiEndpointUrl

export const frontendClients = {
  apiEndpointUrl,
  ...createClients(apiEndpointUrl, browserTokenStore, browserOrganizationStore)
}

export const portalClient = frontendClients.portalClient