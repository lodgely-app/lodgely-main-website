'use client';
import { useEffect } from 'react';

export default function ErrorBoundary({ error, reset }: { error: Error & { digest?: string }, reset: () => void }) {
  useEffect(() => { console.error(error); }, [error]);
  return (
    <div style={{ padding: 20 }}>
      <h2>Something went wrong!</h2>
      <pre style={{ color: 'red' }}>{error.message}</pre>
      <button onClick={() => reset()}>Try again</button>
    </div>
  );
}
