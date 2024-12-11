import type { CapacitorConfig } from '@capacitor/cli'

const config: CapacitorConfig = {
  appId: 'com.ibcsite.app',
  appName: 'ibc-site',
  webDir: 'dist/ibc-site/browser',
  server: {
    cleartext: true
  }
}

export default config
