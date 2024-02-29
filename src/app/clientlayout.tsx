'use client'
import { initRelayEnvironment } from '@/RelayEnvironment'
import { RelayEnvironmentProvider } from 'react-relay'

export default function ClientLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const environment = initRelayEnvironment()
  return <RelayEnvironmentProvider environment={environment}>{children}</RelayEnvironmentProvider>
}
