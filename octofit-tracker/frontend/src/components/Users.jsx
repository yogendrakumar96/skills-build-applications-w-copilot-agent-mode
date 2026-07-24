import { useEffect, useState } from 'react';
import { getApiBaseUrl, getApiUrl } from '../utils/api';

export default function Users() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadUsers() {
      try {
        const response = await fetch(getApiUrl('users'));
        if (!response.ok) {
          throw new Error('Unable to load users');
        }

        const payload = await response.json();
        const data = Array.isArray(payload) ? payload : payload.results ?? [];
        setUsers(data);
      } catch (err) {
        setError(err.message || 'Unable to load users');
      }
    }

    loadUsers();
  }, []);

  return (
    <section className="container py-4">
      <h2 className="mb-3">Users</h2>
      {error ? <div className="alert alert-danger">{error}</div> : null}
      <div className="row g-3">
        {users.map((user) => (
          <div className="col-md-6" key={user._id || user.id || user.email}>
            <div className="card h-100">
              <div className="card-body">
                <h5 className="card-title">{user.name}</h5>
                <p className="mb-1"><strong>Email:</strong> {user.email}</p>
                <p className="mb-0"><strong>Goal:</strong> {user.fitnessGoal || '—'}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
