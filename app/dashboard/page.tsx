import AddProjectForm from './AddProjectForm';
import { renameProject, deleteProject } from '../actions/projects';

const BASE_URL = process.env.NEXT_PUBLIC_URL || 'http://localhost:3000';

export default async function DashboardPage() {
  const res = await fetch(`${BASE_URL}/api/projects`, { cache: 'no-store' });
  const projects = await res.json();

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Dashboard</h1>
      <AddProjectForm />
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {projects.map((p: any) => (
          <li key={p.id} style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 8 }}>

            {/* Couleur */}
            <span style={{
              width: 12, height: 12, borderRadius: '50%',
              background: p.color, display: 'inline-block'
            }} />

            {/* Lien */}
            <a href={`/projects/${p.id}`} style={{ flex: 1 }}>{p.name}</a>

            {/* ✏️ Renommer */}
            <form action={renameProject} style={{ display: 'flex', gap: 4, alignItems: 'center' }}>
              <input type="hidden" name="id" value={p.id} />
              <input
                type="text"
                name="newName"
                defaultValue={p.name}
                style={{
                  fontSize: '0.85rem', padding: '2px 6px',
                  border: '1px solid #ccc', borderRadius: 4
                }}
              />
              <button type="submit" style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                ✏️
              </button>
            </form>

            {/* 🗑️ Supprimer */}
            <form action={deleteProject} style={{ display: 'inline' }}>
              <input type="hidden" name="id" value={p.id} />
              <button type="submit" style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                🗑️
              </button>
            </form>

          </li>
        ))}
      </ul>
    </div>
  );
}