export function PrivacyBanner() {
  return (
    <div
      role="status"
      className="inline-flex items-center gap-2 rounded-md border border-navy-line bg-navy-soft px-2.5 py-1 text-[11px] font-medium tracking-wide text-navy-deep"
    >
      <span className="h-1.5 w-1.5 rounded-full bg-navy" />
      100% synthetic data — no real taxpayer PII
    </div>
  );
}
