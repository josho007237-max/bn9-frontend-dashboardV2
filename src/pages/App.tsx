import React, { useEffect, useState } from 'react'
import { apiGet } from '../lib/api'

export function App() {
  const [stats, setStats] = useState<any>(null)
  const [err, setErr] = useState<string>('')
  useEffect(() => {
    apiGet('/api/stats/demo')
      .then(setStats)
      .catch(e => setErr(String(e)))
  }, [])
  return (
    <div className="min-h-screen p-6">
      <header className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">BN9 System Dashboard</h1>
        <div className="text-sm opacity-70">BN9 System ©2025 | SAMROENG .SAEHOR</div>
      </header>
      <main className="mt-6">
        {err && <div className="text-red-400">Error: {err}</div>}
        {stats ? (
          <pre className="bg-zinc-800 p-4 rounded-lg overflow-auto">{JSON.stringify(stats, null, 2)}</pre>
        ) : (
          !err && <div>Loading...</div>
        )}
      </main>
    </div>
  )
}
