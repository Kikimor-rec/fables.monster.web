import { notFound } from 'next/navigation';

// This catch-all route handles any unmatched paths under [lang]
// and triggers the not-found.tsx page
export default function CatchAllPage() {
  notFound();
}
