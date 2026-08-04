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

  const key = process.env.BUTTONDOWN_API_KEY;   // paid plans (preferred)
  const user = process.env.BUTTONDOWN_USERNAME;  // free plans: public embed endpoint

  try {
    // Path A — API key (paid): richest, supports tags.
    if (key) {
      const r = await fetch('https://api.buttondown.email/v1/subscribers', {
        method: 'POST',
        headers: { Authorization: `Token ${key}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ email_address: email, tags: ['pm-skills-web'] }),
      });
      if (r.status === 201 || r.status === 200) return res.status(200).json({ ok: true, status: 'subscribed' });
      const data = await r.json().catch(() => ({}));
      if (r.status === 400 && /exist|already/i.test(JSON.stringify(data))) return res.status(200).json({ ok: true, status: 'already' });
      console.error('Buttondown API error', r.status, data);
      return res.status(502).json({ ok: false, error: 'Could not subscribe right now. Please try again.' });
    }

    // Path B — free plan: post to the public embed-subscribe endpoint (no key).
    if (user) {
      const form = new URLSearchParams({ email, tag: 'pm-skills-web' });
      const r = await fetch(`https://buttondown.com/api/emails/embed-subscribe/${encodeURIComponent(user)}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: form.toString(),
        redirect: 'manual',
      });
      // The embed endpoint returns 200 or a 3xx redirect to a confirmation page on success.
      if (r.status === 200 || (r.status >= 300 && r.status < 400)) return res.status(200).json({ ok: true, status: 'subscribed' });
      const text = await r.text().catch(() => '');
      if (/already/i.test(text)) return res.status(200).json({ ok: true, status: 'already' });
      console.error('Buttondown embed error', r.status, text.slice(0, 200));
      return res.status(502).json({ ok: false, error: 'Could not subscribe right now. Please try again.' });
    }

    console.error('Neither BUTTONDOWN_API_KEY nor BUTTONDOWN_USERNAME is set.');
    return res.status(500).json({ ok: false, error: 'Newsletter is not configured yet. Try again soon.' });
  } catch (e) {
    console.error('subscribe failed', e);
    return res.status(502).json({ ok: false, error: 'Network error. Please try again.' });
  }
}
