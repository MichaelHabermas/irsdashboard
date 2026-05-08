import type { SVGProps } from 'react';

export function Logo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 32 32" fill="none" width={16} height={16} {...props}>
      <path
        d="M5 8h22M7 12h18M9 16h14"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <path d="M6 22h20" stroke="currentColor" strokeWidth="1.2" />
      <path
        d="M9 24v2M15 24v2M23 24v2"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
    </svg>
  );
}
