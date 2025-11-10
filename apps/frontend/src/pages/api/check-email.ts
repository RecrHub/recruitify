import type { NextApiRequest, NextApiResponse } from 'next';

// Simple mocked API for dev: checks a small hard-coded list of existing emails.
// In production this should proxy to your real backend user/email check.
export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { email } = req.query;
  const emailStr = Array.isArray(email) ? email[0] : email;

  const existingEmails = ['used@example.com', 'hello@recruitjob.test', 'test@domain.com'];
  const exists = typeof emailStr === 'string' && existingEmails.includes(emailStr.toLowerCase());

  res.status(200).json({ exists });
}

