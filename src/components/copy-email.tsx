"use client";

import { useState } from "react";

/** Email address shown as text, with a one-tap copy. mailto alone fails on many phones. */
export function CopyEmail({ email }: { email: string }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      window.location.href = `mailto:${email}`;
    }
  };

  return (
    <span className="mt-1 flex min-w-0 items-center gap-2">
      <a href={`mailto:${email}`} className="min-w-0 truncate text-xs font-semibold text-ink hover:text-link hover:underline" title={email}>
        {email}
      </a>
      <button
        type="button"
        onClick={copy}
        aria-label={copied ? `Copied ${email}` : `Copy ${email}`}
        className="pressable shrink-0 rounded-md bg-muted px-2 py-1 text-[0.65rem] font-extrabold uppercase tracking-wider text-navy transition-colors hover:bg-navy-tint"
      >
        <span aria-live="polite">{copied ? "Copied" : "Copy"}</span>
      </button>
    </span>
  );
}
