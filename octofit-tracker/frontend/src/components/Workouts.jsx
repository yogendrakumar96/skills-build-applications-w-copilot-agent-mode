import { useEffect, useState } from 'react';
import { getApiUrl } from '../utils/api';

export default function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadWorkouts() {
      try {
        const response = await fetch(getApiUrl('workouts'));
        if (!response.ok) {
          throw new Error('Unable to load workouts');
        }

        const payload = await response.json();
        const data = Array.isArray(payload) ? payload : payload.results ?? [];
        setWorkouts(data);
      } catch (err) {
        setError(err.message || 'Unable to load workouts');
      }
    }

    loadWorkouts();
  }, []);

  return (
    <section className="container py-4">
      <h2 className="mb-3">Workouts</h2>
      {error ? <div className="alert alert-danger">{error}</div> : null}
      <div className="row g-3">
        {workouts.map((workout) => (
          <div className="col-md-6" key={workout._id || workout.id || workout.title}>
            <div className="card h-100">
              <div className="card-body">
                <h5 className="card-title">{workout.title}</h5>
                <p className="mb-1"><strong>Focus:</strong> {workout.focus}</p>
                <p className="mb-0"><strong>Duration:</strong> {workout.durationMinutes} min</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
