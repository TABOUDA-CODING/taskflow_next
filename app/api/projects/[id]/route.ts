// app/api/projects/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server';

const JSON_SERVER = 'http://localhost:4000/projects';

// GET — Un seul projet
export async function GET(_req: NextRequest, { params }: { params: { id: string } }) {
  const res = await fetch(`${JSON_SERVER}/${params.id}`, { cache: 'no-store' });
  const project = await res.json();
  return NextResponse.json(project);
}

// PUT — Renommer
export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  const body = await request.json();
  const res = await fetch(`${JSON_SERVER}/${params.id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  const updated = await res.json();
  return NextResponse.json(updated);
}

// DELETE — Supprimer
export async function DELETE(_req: NextRequest, { params }: { params: { id: string } }) {
  await fetch(`${JSON_SERVER}/${params.id}`, { method: 'DELETE' });
  return NextResponse.json({ success: true });
}