import { useEffect, useState } from 'react';
import { getStats } from '../lib/api';

const POLL_MS = Number(import.meta.env.VITE_POLL_MS ?? 30000); // default 30s

export default function App() {
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    let alive = true;

    const load = async () => {
      try {
        const json = await getStats('demo');
        if (alive) { setData(json); setError(''); }
      } catch (e: any) {
        if (alive) setError(e?.message || 'Failed to fetch');
      }
    };

    load();
    const id = window.setInterval(load, POLL_MS);

    return () => { alive = false; window.clearInterval(id); };
  }, []);

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 p-6">
      <div className="text-xl font-bold mb-4">แผงควบคุมระบบ BN9</div>

      {error && (
        <div className="text-red-400 mb-4">Error: {error}</div>
      )}

      <pre className="bg-zinc-900 rounded-xl p-4 overflow-auto">
        {JSON.stringify(data, null, 2)}
      </pre>

      <div className="text-right text-xs mt-4 opacity-70">
        BN9 System ©2025 | SAMROENG .SAEHOR
      </div>
    </div>
  );
}

