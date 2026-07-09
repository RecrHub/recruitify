import type { Option } from './types';

export function formatCurrency(value: number) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(value || 0);
}

export function toOption(item: unknown): Option | null {
  if (!item || typeof item !== 'object') return null;
  const source = item as Record<string, unknown>;
  const id = source.id ?? source.value ?? source.code;
  const label = source.name ?? source.label ?? source.title;

  if (id === undefined || label === undefined) return null;
  return { id: String(id), label: String(label) };
}

export function getOptionLabel(options: Option[], id: string) {
  return options.find((option) => option.id === id)?.label || 'Not selected';
}

export function normalizeOptions(data: unknown, fallback: Option[]): Option[] {
  const list = Array.isArray(data)
    ? data
    : Array.isArray((data as { data?: unknown[] })?.data)
      ? (data as { data: unknown[] }).data
      : [];
  const mapped = list.map(toOption).filter(Boolean) as Option[];
  return mapped.length ? mapped : fallback;
}

export async function fetchJson(url: string): Promise<unknown> {
  const res = await fetch(url);
  if (!res.ok) return Promise.reject(new Error(`Fetch failed: ${url}`));
  return res.json();
}

export function slugify(value: string): string {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, '-');
}
