import { useLocation } from 'react-router';

export function PlaceholderPage() {
  const location = useLocation();
  const segment = location.pathname.split('/').filter(Boolean)[0] ?? 'page';
  const title = segment.charAt(0).toUpperCase() + segment.slice(1);

  return (
    <div>
      <h1 className="text-[22px] font-semibold tracking-tight text-foreground">{title}</h1>
      <p className="mt-1 text-[12.5px] text-muted-foreground">
        This page will be built in a later slice.
      </p>
    </div>
  );
}
