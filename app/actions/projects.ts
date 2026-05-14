'use server';
import { revalidatePath } from 'next/cache';

const BASE_URL = process.env.NEXT_PUBLIC_URL || 'http://localhost:3000';

// ✅ addProject
export async function addProject(formData: FormData) {
  const name = formData.get('name') as string;
  const color = formData.get('color') as string;

  await fetch(`${BASE_URL}/api/projects`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, color }),
  });

  revalidatePath('/dashboard');
}

// ✅ renameProject
export async function renameProject(formData: FormData) {
  const id = formData.get('id') as string;
  const newName = formData.get('newName') as string;

  const res = await fetch(`${BASE_URL}/api/projects/${id}`);
  const project = await res.json();

  await fetch(`${BASE_URL}/api/projects/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ...project, name: newName }),
  });

  revalidatePath('/dashboard');
}

// ✅ deleteProject
export async function deleteProject(formData: FormData) {
  const id = formData.get('id') as string;

  await fetch(`${BASE_URL}/api/projects/${id}`, {
    method: 'DELETE',
  });

  revalidatePath('/dashboard');
}