import { useEffect, useState } from 'react';
import { getApiUrl } from '../utils/api';

export default function Teams() {
  const [teams, setTeams] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadTeams() {
      try {
        const response = await fetch(getApiUrl('teams'));
        if (!response.ok) {
          throw new Error('Unable to load teams');
        }

        const payload = await response.json();
        const data = Array.isArray(payload) ? payload : payload.results ?? [];
        setTeams(data);
      } catch (err) {
        setError(err.message || 'Unable to load teams');
      }
    }

    loadTeams();
  }, []);

  return (
    <section className="container py-4">
      <h2 className="mb-3">Teams</h2>
      {error ? <div className="alert alert-danger">{error}</div> : null}
      <div className="row g-3">
        {teams.map((team) => (
          <div className="col-md-6" key={team._id || team.id || team.name}>
            <div className="card h-100">
              <div className="card-body">
                <h5 className="card-title">{team.name}</h5>
                <p className="mb-1"><strong>Sport:</strong> {team.sport}</p>
                <p className="mb-0"><strong>Members:</strong> {team.members}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
