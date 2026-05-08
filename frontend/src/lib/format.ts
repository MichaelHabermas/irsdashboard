export function fmtUSD(n: number): string {
  return '$' + Math.abs(n).toLocaleString('en-US');
}

export function fmtPct(n: number, decimals = 1): string {
  return (n * 100).toFixed(decimals) + '%';
}
