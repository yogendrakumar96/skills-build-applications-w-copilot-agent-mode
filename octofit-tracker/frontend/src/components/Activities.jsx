import { useEffect, useState } from 'react';

export default function Activities() {
  const [activities, setActivities] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadActivities() {
      try {
        const codespaceName = import.meta.env?.VITE_CODESPACE_NAME?.trim();
        const apiUrl = codespaceName
          ? `https://${codespaceName}-8000.app.github.dev/api/activities`
          : 'http://127.0.0.1:8000/api/activities';
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error('Unable to load activities');
        }

        const payload = await response.json();
        const data = Array.isArray(payload) ? payload : payload.results ?? [];
        setActivities(data);
      } catch (err) {
        setError(err.message || 'Unable to load activities');
      }
    }

    loadActivities();
  }, []);

  return (
    <section className="container py-4">
      <h2 className="mb-3">Activities</h2>
      {error ? <div className="alert alert-danger">{error}</div> : null}
      <div className="row g-3">
        {activities.map((activity) => (
          <div className="col-md-6" key={activity._id || activity.id}>
            <div className="card h-100">
              <div className="card-body">
                <h5 className="card-title">{activity.type}</h5>
                <p className="mb-1"><strong>Duration:</strong> {activity.durationMinutes} min</p>
                <p className="mb-0"><strong>Calories:</strong> {activity.calories}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
