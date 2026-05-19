import { put } from '@vercel/blob';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).send('Apenas POST');
  try {
    const filename = `lanche-${Date.now()}.png`;
    const blob = await put(filename, req, {
      access: 'public',
      contentType: 'image/png'
    });
    return res.status(200).json(blob);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}