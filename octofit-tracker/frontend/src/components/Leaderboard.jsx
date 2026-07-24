import { useEffect, useState } from 'react';

export default function Leaderboard() {
  const [entries, setEntries] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadLeaderboard() {
      try {
        const codespaceName = import.meta.env?.VITE_CODESPACE_NAME?.trim();
        const apiUrl = codespaceName
          ? `https://${codespaceName}-8000.app.github.dev/api/leaderboard`
          : 'http://127.0.0.1:8000/api/leaderboard';
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error('Unable to load leaderboard');
        }

        const payload = await response.json();
        const data = Array.isArray(payload) ? payload : payload.results ?? [];
        setEntries(data);
      } catch (err) {
        setError(err.message || 'Unable to load leaderboard');
      }
    }

    loadLeaderboard();
  }, []);

  return (
    <section className="container py-4">
      <h2 className="mb-3">Leaderboard</h2>
      {error ? <div className="alert alert-danger">{error}</div> : null}
      <div className="list-group">
        {entries.map((entry) => (
          <div className="list-group-item d-flex justify-content-between align-items-center" key={entry._id || entry.id || entry.rank}>
            <span>{entry.userId?.name || entry.name || 'Unknown athlete'}</span>
            <span className="badge bg-primary rounded-pill">{entry.score}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
