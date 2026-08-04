// Vercel serverless function: POST /api/subscribe { email }
// Adds the email to your Buttondown newsletter. Set BUTTONDOWN_API_KEY in the
// Vercel project's Environment Variables. Nothing is stored on this server.
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ ok: false, error: 'Method not allowed' });
  }

  // Body may arrive parsed (Vercel) or as a string.
  let body = req.body;
  if (typeof body === 'string') { try { body = JSON.parse(body); } catch { body = {}; } }
  const email = (body && body.email ? String(body.email) : '').trim().toLowerCase();

  // Minimal, honest validation.
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ ok: false, error: 'Please enter a valid email address.' });
  }

  const key = process.env.BUTTONDOWN_API_KEY;
  if (!key) {
    // Fail loudly for the operator, softly for the visitor.
    console.error('BUTTONDOWN_API_KEY is not set.');
    return res.status(500).json({ ok: false, error: 'Newsletter is not configured yet. Try again soon.' });
  }

  try {
    const r = await fetch('https://api.buttondown.email/v1/subscribers', {
      method: 'POST',
      headers: { Authorization: `Token ${key}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ email_address: email, tags: ['pm-skills-web'] }),
    });

    if (r.status === 201 || r.status === 200) {
      return res.status(200).json({ ok: true, status: 'subscribed' });
    }
    // Buttondown returns 400 with a code when the address already exists.
    const data = await r.json().catch(() => ({}));
    const code = data && (data.code || (data.detail || ''));
    if (r.status === 400 && /exist|already/i.test(JSON.stringify(data))) {
      return res.status(200).json({ ok: true, status: 'already' });
    }
    console.error('Buttondown error', r.status, data);
    return res.status(502).json({ ok: false, error: 'Could not subscribe right now. Please try again.' });
  } catch (e) {
    console.error('subscribe failed', e);
    return res.status(502).json({ ok: false, error: 'Network error. Please try again.' });
  }
}
