import { apiUrl } from './api';

export type AssistantLanguage = 'en' | 'kn';

export type AssistantReply = {
  answer: string;
  source?: string;
  sourceUrl?: string;
};

export async function askAssistant(message: string, language: AssistantLanguage, schemeId?: string): Promise<AssistantReply> {
  const response = await fetch(apiUrl('/api/ai/chat'), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message, language, ...(schemeId ? { schemeId } : {}) }),
  });
  const payload = await response.json();
  if (!response.ok || !payload.success) throw new Error(payload.error || 'The assistant could not answer right now.');
  return payload.data as AssistantReply;
}

export function answerWithSource(reply: AssistantReply): string {
  return reply.sourceUrl ? `${reply.answer}\n\nOfficial source: ${reply.sourceUrl}` : reply.answer;
}
