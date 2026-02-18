export const prerender = false;

import type { APIRoute } from 'astro';
import { addToWaitlist, getWaitlistEntries } from '../../lib/db';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const POST: APIRoute = async ({ request }) => {
  let body: { email?: string; name?: string };
  try {
    body = await request.json();
  } catch {
    return new Response(JSON.stringify({ error: 'Invalid JSON.' }), { status: 400, headers: { 'Content-Type': 'application/json' } });
  }

  const email = body.email?.trim().toLowerCase();
  const name = body.name?.trim();

  if (!email || !EMAIL_RE.test(email)) {
    return new Response(JSON.stringify({ error: 'Please enter a valid email address.' }), { status: 400, headers: { 'Content-Type': 'application/json' } });
  }
  if (!name || name.length < 1) {
    return new Response(JSON.stringify({ error: 'Please enter your name.' }), { status: 400, headers: { 'Content-Type': 'application/json' } });
  }

  const result = addToWaitlist(email, name);
  if (!result.success) {
    return new Response(JSON.stringify({ error: result.error }), { status: 409, headers: { 'Content-Type': 'application/json' } });
  }

  return new Response(JSON.stringify({ success: true }), { status: 200, headers: { 'Content-Type': 'application/json' } });
};

export const GET: APIRoute = ({ url }) => {
  const token = url.searchParams.get('token');
  const adminToken = import.meta.env.ADMIN_TOKEN;

  if (!adminToken || token !== adminToken) {
    return new Response(JSON.stringify({ error: 'Unauthorized.' }), { status: 401, headers: { 'Content-Type': 'application/json' } });
  }

  const entries = getWaitlistEntries();
  return new Response(JSON.stringify(entries), { status: 200, headers: { 'Content-Type': 'application/json' } });
};
