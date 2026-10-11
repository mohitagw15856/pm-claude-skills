// Shared by the WhatsApp bot and the phone line.
// Twilio's webhook signature: base64 HMAC-SHA1 over the URL plus every POST
// parameter, sorted by name, as name+value. https://www.twilio.com/docs/usage/security
export async function validTwilioSignature(request, form, authToken) {
  const sig = request.headers.get('x-twilio-signature') || '';
  const data = request.url + [...form.keys()].sort().map((k) => k + form.getAll(k).join('')).join('');
  const key = await crypto.subtle.importKey('raw', new TextEncoder().encode(authToken), { name: 'HMAC', hash: 'SHA-1' }, false, ['sign']);
  const mac = new Uint8Array(await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(data)));
  const expected = btoa(String.fromCharCode(...mac));
  if (sig.length !== expected.length) return false;
  let diff = 0;
  for (let i = 0; i < sig.length; i++) diff |= sig.charCodeAt(i) ^ expected.charCodeAt(i);
  return diff === 0;
}
